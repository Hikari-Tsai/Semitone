// Semitone — シャサフ式音楽理論的計算核心（不含介面與聲音）
// 音高以「倍分組成」向量表示：[h, l, m, z] = 3、5、7、11 的指數（2、3、4、5 次元）。
// 八度（1 次元）另外用整數 oct 記錄。

const PRIMES = [3, 5, 7, 11];
const VAL41 = [24, 13, 33, 19]; // 41 平均律中各次元的步數（同線主義）

const add = (a, b) => a.map((x, i) => x + b[i]);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const key = (v) => v.join(",");
const isZero = (v) => v.every((x) => x === 0);
const kin = (v) => v.reduce((s, x) => s + Math.abs(x), 0); // 同線親等
const mod = (n, m) => ((n % m) + m) % m;

// 純正律：向量 → 縮進 [1,2) 的比，回傳 {num, den, value}
function ratioClass(v) {
  let num = 1, den = 1;
  v.forEach((e, i) => {
    if (e > 0) num *= PRIMES[i] ** e;
    else if (e < 0) den *= PRIMES[i] ** -e;
  });
  while (num / den >= 2) den *= 2;
  while (num / den < 1) num *= 2;
  const g = gcd(num, den);
  return { num: num / g, den: den / g, value: num / den };
}
function gcd(a, b) { return b ? gcd(b, a % b) : a; }

// 以八度為 1 的對數音高（同線，0 ≤ x < 1）
const jiClassLog = (v) => Math.log2(ratioClass(v).value);
function edo41ClassLog(v) {
  const steps = mod(v.reduce((s, e, i) => s + e * VAL41[i], 0), 41);
  let x = steps / 41;
  const ji = jiClassLog(v); // 邊界附近避免跳八度
  if (x - ji > 0.5) x -= 1;
  if (ji - x > 0.5) x += 1;
  return x;
}
const edo41Step = (v) => mod(v.reduce((s, e, i) => s + e * VAL41[i], 0), 41);

// ── ハーモニム ─────────────────────────────────────────────
const FULL = [
  { 1: "Chy", 2: "Scy", 3: "Xcy", "-1": "Fu", "-2": "Schu", "-3": "Ju", "-4": "Schru", "-5": "Schrvu" },
  { 1: "Ly", 2: "Dry", "-1": "Su", "-2": "Sru" },
  { 1: "My", 2: "Mry", "-1": "Pu", "-2": "Pru" },
  { 1: "Zy", 2: "Zry", "-1": "Tschu", "-2": "Kru" },
];
const TAIL = [
  null,
  { 1: "li", 2: "dri", "-1": "s", "-2": "sr" },
  { 1: "mi", 2: "mri", "-1": "p", "-2": "pr" },
  { 1: "zi", 2: "zri", "-1": "k", "-2": "kr" },
];
function formula(v) {
  if (isZero(v)) return "0";
  return v.map((e, i) => (e ? `${i + 2}${(e > 0 ? "ꜛ" : "ꜜ").repeat(Math.abs(e))}` : "")).join("");
}
function harmononym(v) {
  if (isZero(v)) return "Ah";
  let out = "";
  for (let i = 0; i < 4; i++) {
    if (!v[i]) continue;
    const part = out === "" ? FULL[i][v[i]] : TAIL[i][v[i]];
    if (!part) return `{${formula(v)}}`; // 沒有既定名稱時退回組成式
    out += part;
  }
  return out;
}

// ── 定義和音（司次元固定為 2，客次元可選） ─────────────────────
const H = [1, 0, 0, 0];
const MODES = {
  "3": { label: "3 次元 — AhChyLy（西洋音樂的大三和弦）", G: [0, 1, 0, 0], dim: 3 },
  "4": { label: "4 次元 — AhChyMy（7 泛音）", G: [0, 0, 1, 0], dim: 4 },
  "5f": { label: "5 次元 — AhChyFuzi（11 泛音，作者建議的配置）", G: [-1, 0, 0, 1], dim: 5 },
  "5z": { label: "5 次元 — AhChyZy（11 泛音，較難處理）", G: [0, 0, 0, 1], dim: 5 },
};

// ── 機能 ───────────────────────────────────────────────────
const POS_SYMBOL = { "-2": "≪", "-1": "<", 0: "O", 1: ">", 2: "≫" };
const POS_NAME = { "-2": "Schu", "-1": "Fu", 0: "Ah", 1: "Chy", 2: "Scy" };
const VAR_SYMBOL = { ta: "", cra: "ᴗ", crana: "ɣ" };

// 由機能（位置 p、變形 v）求和弦。回傳 tones（向量）、bass（底音向量）與說明用資料。
function buildChord(fn, G) {
  const R = [fn.p, 0, 0, 0];
  const defName = "Ah" + "Chy" + harmononym(G);
  if (fn.v === "pat") {
    // 挟み打ち [O±] 的一種：[>+<] = 屬和弦上面加下屬的機能音
    const up = add(R, H), down = sub(R, H);
    return {
      symbol: "[>+<]", name: "Chyta vlamy Futa",
      tones: [up, add(up, H), add(up, G), down], bass: up,
      chordonym: `’${harmononym(up)} – ${defName} + ’${harmononym(down)}`,
      klass: "O±",
    };
  }
  const symbol = `[${POS_SYMBOL[fn.p]}${VAR_SYMBOL[fn.v]}]`;
  const name = POS_NAME[fn.p] + fn.v;
  if (fn.v === "ta") {
    return { symbol, name, tones: [R, add(R, H), add(R, G)], bass: R,
      chordonym: `’${harmononym(R)} – ${defName}`, klass: POS_SYMBOL[fn.p] };
  }
  const X = sub(add(R, G), H); // cra / crana 的新底音
  if (fn.v === "cra") {
    // 保留機能根與客音，其餘反転：得到陰和音 X, X+H, X+H−G
    return { symbol, name, tones: [X, R, add(R, G)], bass: X,
      chordonym: `’${harmononym(R)} – Ah${harmononym(G)}${harmononym(sub(G, H))}`, klass: POS_SYMBOL[fn.p] };
  }
  // crana：只保留客音（成為新和弦的司音），得到陽和音
  return { symbol, name, tones: [X, add(X, H), add(X, G)], bass: X,
    chordonym: `’${harmononym(X)} – ${defName}`, klass: POS_SYMBOL[fn.p] };
}

// 安定度（以主音為基音）：含主音且主音為底音＝stable；含主音但非底音＝semi；不含＝unstable
function stability(ch) {
  const hasTonic = ch.tones.some(isZero);
  if (hasTonic && isZero(ch.bass)) return "stable";
  return hasTonic ? "semi" : "unstable";
}

// ── 進行產生器 ─────────────────────────────────────────────
function pick(items) {
  const total = items.reduce((s, it) => s + it.w, 0);
  let r = Math.random() * total;
  for (const it of items) { r -= it.w; if (r <= 0) return it.fn; }
  return items[items.length - 1].fn;
}
function generateProgression(len, opt) {
  const variants = [{ v: "ta", w: 5 }];
  if (opt.cra) variants.push({ v: "cra", w: 3 });
  if (opt.crana) variants.push({ v: "crana", w: 1.5 });
  const seq = [{ p: 0, v: "ta" }];
  for (let i = 1; i < len - 2; i++) {
    const prev = seq[i - 1];
    const cands = [];
    for (let p = -opt.range; p <= opt.range; p++) {
      for (const va of variants) {
        if (p === prev.p && va.v === prev.v) continue;
        const d = Math.abs(p - prev.p);
        const wd = d === 0 ? 0.6 : d === 1 ? 3 : d === 2 ? 1.2 : 0.3; // 左右一格最常用
        const wfar = Math.abs(p) === 2 ? 0.5 : 1;
        const wtonic = p === 0 && va.v === "ta" ? 0.5 : 1; // 中途少回主和弦，留給結尾
        const back = seq[i - 2];
        const wrepeat = back && back.p === p && back.v === va.v ? 0.25 : 1; // 避免 A–B–A–B 來回
        cands.push({ fn: { p, v: va.v }, w: wd * wfar * wtonic * wrepeat * va.w });
      }
    }
    seq.push(pick(cands));
  }
  if (len >= 3) {
    // 倒數第二個：用能導向 [O] 的和弦（屬、挟み打ち、下屬、[<ɣ]）
    const pen = [{ fn: { p: 1, v: "ta" }, w: 4 }, { fn: { p: -1, v: "ta" }, w: 2 }];
    if (opt.pat) pen.push({ fn: { p: 0, v: "pat" }, w: 3 });
    if (opt.crana) pen.push({ fn: { p: -1, v: "crana" }, w: 1.2 });
    const prev = seq[seq.length - 1];
    seq.push(pick(pen.filter((c) => !(c.fn.p === prev.p && c.fn.v === prev.v))));
  }
  if (len >= 2) {
    // 結尾：解決到 [O]；啟用 crana 時偶爾做 crana 解決 [Oɣ]
    seq.push(opt.crana && Math.random() < 0.15 ? { p: 0, v: "crana" } : { p: 0, v: "ta" });
  }
  return seq;
}

// ── ボイシング：底音平順、上聲部聚攏並就近連接 ──────────────────
// 回傳每個和弦的 notes：[{vec, log}]，log = 相對主音（低八度位置）的 log2 音高（純正律）
function voiceProgression(chords) {
  let prevBass = 0, center = 1.25; // 上聲部中心：主音上方約一個八度又大三度
  return chords.map((ch) => {
    const b = jiClassLog(ch.bass);
    const bassLog = [b - 1, b, b + 1]
      .filter((x) => x > -0.6 && x < 0.75)
      .sort((x, y) => Math.abs(x - prevBass) - Math.abs(y - prevBass))[0];
    prevBass = bassLog;
    const upper = ch.tones.map((vec) => {
      const c = jiClassLog(vec);
      let log = c + Math.round(center - c); // 放到最靠近中心的八度
      if (log - bassLog < 0.2) log += 1; // 不要貼著底音
      return { vec, log };
    }).sort((a, b2) => a.log - b2.log);
    center = 0.5 * center + 0.5 * (upper.reduce((s, n) => s + n.log, 0) / upper.length);
    center = Math.min(1.6, Math.max(1.0, center)); // 避免整體越飄越高或越低
    return [{ vec: ch.bass, log: bassLog, isBass: true }, ...upper];
  });
}

// 依調律把音符換成「相對主音的 log2 音高」
function tunedLog(note, tuning) {
  const oct = Math.round(note.log - jiClassLog(note.vec));
  if (tuning === "ji") return note.log;
  if (tuning === "edo41") return edo41ClassLog(note.vec) + oct;
  return Math.round(note.log * 12) / 12; // edo12：取最近的半音
}

// ── 12 平均律對照 ───────────────────────────────────────────
const NOTE_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const midiName = (m) => NOTE_NAMES[mod(m, 12)] + (Math.floor(m / 12) - 1);

// target = 目標調律下的音高（MIDI 小數）。回傳最近的 12 平均律音與偏差（音分）
function nearest12(midiFloat) {
  const m = Math.round(midiFloat);
  return { midi: m, name: midiName(m), dev: (midiFloat - m) * 100 };
}

const CHORD_SHAPES = [
  [[0, 4, 7], ""], [[0, 3, 7], "m"], [[0, 4, 7, 10], "7"], [[0, 3, 7, 10], "m7"],
  [[0, 4, 7, 11], "maj7"], [[0, 3, 7, 11], "mMaj7"], [[0, 4, 7, 9], "6"], [[0, 3, 6], "dim"],
  [[0, 3, 6, 10], "m7♭5"], [[0, 4, 8], "aug"], [[0, 2, 7], "sus2"], [[0, 5, 7], "sus4"],
  [[0, 7, 10], "7(no3)"], [[0, 7, 11], "maj7(no3)"], [[0, 7], "5"], [[0, 4, 10], "7(no5)"],
  [[0, 2, 7, 10], "7sus2"], [[0, 5, 7, 10], "7sus4"], [[0, 4, 7, 10, 2], "9"], [[0, 6, 7], "(♯11,no3)"],
];
// 由 12 平均律的音高類別集合找和弦名；先試底音當根音
function chordName12(pcs, bassPc) {
  const set = [...new Set(pcs)];
  const tryRoot = (root) => {
    const rel = set.map((p) => mod(p - root, 12)).sort((a, b) => a - b).join(",");
    for (const [shape, suffix] of CHORD_SHAPES) {
      if ([...shape].map((x) => mod(x, 12)).sort((a, b) => a - b).join(",") === rel) return NOTE_NAMES[root] + suffix;
    }
    return null;
  };
  const direct = tryRoot(bassPc);
  if (direct) return direct;
  for (const root of set) {
    const n = tryRoot(root);
    if (n) return `${n}/${NOTE_NAMES[bassPc]}`;
  }
  return set.map((p) => NOTE_NAMES[p]).join("–");
}

// 給傳統樂器的做法說明。dev = 目標音比 12 平均律音高（+）或低（−）幾音分
// 文字來自 i18n.js 的 t()，所以會跟著介面語言
function howTo(dev, n12, instrument) {
  const a = Math.abs(dev), r = Math.round(a), up = dev > 0;
  if (a < 5) return t("how.ok");
  const n = n12.name, nb = midiName(n12.midi + (up ? 1 : -1));
  const frac = t(a >= 40 ? "how.f.q" : a >= 25 ? "how.f.third" : a >= 15 ? "how.f.seventh" : "how.f.tiny");
  const amt = t("how.amt", { r, frac });
  const dir = t(up ? "how.sharp" : "how.flat"), verb = t(up ? "how.lipUp" : "how.lipDown");
  switch (instrument) {
    case "free":
      return a >= 40 ? t("how.free.q", { n, nb }) : t("how.free.move", { n, dir, amt });
    case "wind":
      return t(a >= 40 ? "how.wind.q" : a >= 20 ? "how.wind.mid" : "how.wind.small", { n, dir, verb, amt });
    case "guitar": // 推弦只能升高，要壓低的音改按低一格再推上來
      return up ? t("how.guitar.up", { n, amt }) : t("how.guitar.down", { n, nb, r, rest: Math.round(100 - a) });
    default: // fixed：鋼琴、鍵盤、定音打擊。彈 n 的結果會落在目標的另一側
      if (a >= 40) return t("how.fixed.q", { n, nb });
      if (a >= 20) return t("how.fixed.mid", { n, r, side: t(up ? "how.sideFlat" : "how.sideSharp") });
      return t("how.fixed.small", { n, r });
  }
}

if (typeof module !== "undefined") {
  module.exports = { MODES, buildChord, generateProgression, voiceProgression, tunedLog, harmononym, formula,
    ratioClass, edo41Step, nearest12, chordName12, howTo, stability, kin, sub, key, isZero };
}
