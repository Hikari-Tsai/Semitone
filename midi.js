// Semitone — 標準 MIDI 檔（SMF format 1）產生器
//
// MIDI 的音符號碼是 12 平均律，所以微分音用「彎音（pitch bend）」修正。
// 彎音是整個通道共用的，一個和弦裡每個音的修正量不同，因此每個聲部各用一個通道
// （聲部 1 → 通道 1、聲部 2 → 通道 2…，跳過第 10 通道的鼓組）。
// 每個通道開頭用 RPN 0（CC 101/100/6/38）把彎音範圍設為 ±2 個半音，
// 之後每個音符前送出對應的彎音值：8192 = 不修正，±4096 = ±100 音分。

const PPQ = 480;
const BEND_RANGE = 2; // 半音

function vlq(n) {
  const out = [n & 0x7f];
  while ((n >>= 7)) out.unshift((n & 0x7f) | 0x80);
  return out;
}
const u32 = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
const u16 = (n) => [(n >>> 8) & 255, n & 255];
const ascii = (s) => [...s].map((c) => c.charCodeAt(0));

function trackChunk(events) {
  // events: [{tick, order, bytes}]，依時間與指定順序排序後轉成 delta time
  events.sort((a, b) => a.tick - b.tick || a.order - b.order);
  const body = [];
  let last = 0;
  for (const e of events) {
    body.push(...vlq(e.tick - last), ...e.bytes);
    last = e.tick;
  }
  body.push(0, 0xff, 0x2f, 0); // End of Track
  return [...ascii("MTrk"), ...u32(body.length), ...body];
}

// 聲部索引 → MIDI 通道（0 起算），跳過 9（鼓組）
const channelOf = (voice) => (voice < 9 ? voice : voice + 1);

// cents：目標音相對 12 平均律音的偏差。回傳 0–16383 的彎音值
function bendValue(cents) {
  const v = 8192 + Math.round((cents / (BEND_RANGE * 100)) * 8192);
  return Math.max(0, Math.min(16383, v));
}

// opt = { bpm, num, den, barsPerChord, arpeggio, title,
//         chords: [ [ {midi, cents} , … ] , … ] }   每個和弦由低到高
function buildMidi(opt) {
  const ticksPerBar = Math.round(PPQ * 4 * opt.num / opt.den);
  const chordTicks = Math.round(ticksPerBar * opt.barsPerChord);

  // 軌 0：速度與拍號
  const meta = [
    { tick: 0, order: 0, bytes: [0xff, 0x03, ...vlq(opt.title.length), ...ascii(opt.title)] },
    { tick: 0, order: 1, bytes: [0xff, 0x51, 3, ...u32(Math.round(60000000 / opt.bpm)).slice(1)] },
    { tick: 0, order: 2, bytes: [0xff, 0x58, 4, opt.num, Math.log2(opt.den), 24, 8] },
  ];

  // 軌 1：音符。每個聲部一個通道
  const ev = [];
  const voices = Math.max(...opt.chords.map((c) => c.length));
  for (let v = 0; v < voices; v++) {
    const ch = channelOf(v);
    const cc = (num, val, order) => ev.push({ tick: 0, order, bytes: [0xb0 | ch, num, val] });
    cc(101, 0, 0); cc(100, 0, 1); cc(6, BEND_RANGE, 2); cc(38, 0, 3); // RPN 0：彎音範圍
    cc(101, 127, 4); cc(100, 127, 5); // 關閉 RPN，避免之後的 CC 6 誤改設定
  }
  // hits：一個和弦內的各次發聲 [{t, len}]（單位：四分音符）。省略時整個和弦一個長音
  const hits = opt.hits && opt.hits.length ? opt.hits : [{ t: 0, len: chordTicks / PPQ }];
  const arp = opt.arpeggio && hits.length === 1;
  opt.chords.forEach((notes, i) => {
    const start = i * chordTicks;
    notes.forEach((n, v) => {
      const ch = channelOf(v);
      const b = bendValue(n.cents);
      // 彎音在每個和弦開頭送一次即可（同一和弦內這個聲部的音高不變）
      ev.push({ tick: start, order: 10, bytes: [0xe0 | ch, b & 0x7f, (b >> 7) & 0x7f] });
      for (const h of hits) {
        const on = start + Math.round(h.t * PPQ) + (arp ? v * Math.round(PPQ / 8) : 0);
        const end = Math.min(start + chordTicks, start + Math.round((h.t + h.len) * PPQ));
        const off = Math.max(on + 1, end - 10); // 留一點空隙，讓下一個彎音不會拖到尾音
        ev.push({ tick: on, order: 11, bytes: [0x90 | ch, n.midi, n.isBass ? 84 : 72] });
        ev.push({ tick: off, order: 5, bytes: [0x80 | ch, n.midi, 0] });
      }
    });
  });

  // 鼓組：GM 規定第 10 通道（索引 9）是打擊樂，不需要彎音
  for (const d of opt.drums || []) {
    ev.push({ tick: d.tick, order: 11, bytes: [0x99, d.note, d.vel] });
    ev.push({ tick: d.tick + 60, order: 5, bytes: [0x89, d.note, 0] });
  }

  const header = [...ascii("MThd"), ...u32(6), ...u16(1), ...u16(2), ...u16(PPQ)];
  return new Uint8Array([...header, ...trackChunk(meta), ...trackChunk(ev)]);
}

if (typeof module !== "undefined") module.exports = { buildMidi, bendValue, PPQ };
