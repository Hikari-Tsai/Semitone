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
// 產生器只用 ±2 以內；±3 與 na 只在使用者自行輸入和弦時才會出現
const POS_SYMBOL = { "-3": "⋘", "-2": "≪", "-1": "<", 0: "O", 1: ">", 2: "≫", 3: "⋙" };
const POS_NAME = { "-3": "Ju", "-2": "Schu", "-1": "Fu", 0: "Ah", 1: "Chy", 2: "Scy", 3: "Xcy" };
const VAR_SYMBOL = { ta: "", cra: "ᴗ", crana: "ɣ", na: "x" };

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
  if (fn.v === "na") {
    // na：保留機能根與司音，把客音翻到另一側（3 次元時是同主音的小和弦）。原作者建議盡量少用
    return { symbol, name, tones: [R, add(R, H), sub(add(R, H), G)], bass: R,
      chordonym: `’${harmononym(R)} – AhChy${harmononym(sub(H, G))}`, klass: POS_SYMBOL[fn.p] };
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

// ── 使用者輸入的和弦 → 機能 ─────────────────────────────────
// 接受三種寫法，可以混用：和弦名（C、Am、G7）、級數（I、vi、V7、bVII）、機能式（O、>v、<y、>+<）。
// 和弦名與級數先換成「離主音幾個半音 + 大／小」，再查表找出對應的機能。
// 查表以 3 次元為準；在 4 次元使用時，同一個機能會自動「轉寫」成 4 次元的和弦。
const DEGREE = { I: 0, II: 2, III: 4, IV: 5, V: 7, VI: 9, VII: 11 };
const LETTER = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

let nameTable = null; // "半音數:maj|min" → 機能（同名時取最簡單的解釋）
function fnForChord(off, minor) {
  if (!nameTable) {
    nameTable = {};
    const G3 = MODES["3"].G, pc = (v) => mod(Math.round(12 * jiClassLog(v)), 12);
    const cands = [];
    for (let p = -3; p <= 3; p++) for (const v of ["ta", "cra", "crana", "na"]) {
      // 排序：離主音越近越優先；na 是原作者建議少用的變形，排在後面
      cands.push({ fn: { p, v }, rank: Math.abs(p) + (v === "na" ? 1.5 : v === "crana" ? 0.5 : 0) });
    }
    cands.sort((x, y) => x.rank - y.rank);
    for (const c of cands) {
      const ch = buildChord(c.fn, G3);
      const k = `${pc(ch.bass)}:${c.fn.v === "cra" || c.fn.v === "na" ? "min" : "maj"}`;
      if (!(k in nameTable)) nameTable[k] = c.fn;
    }
  }
  return nameTable[`${mod(off, 12)}:${minor ? "min" : "maj"}`] || null;
}

function parseFunctograph(tok) {
  const x = tok.replace(/[\[\]]/g, "");
  if (x === ">+<" || x === "O±" || x === "0±") return { p: 0, v: "pat" };
  const m = /^(O|0|o|>{1,3}|<{1,3}|≫|≪|⋙|⋘)(ᴗ|v|u|ɣ|y|;|x)?$/.exec(x);
  if (!m) return null;
  const pos = { O: 0, 0: 0, o: 0, "≫": 2, "≪": -2, "⋙": 3, "⋘": -3 }[m[1]] ?? (m[1][0] === ">" ? m[1].length : -m[1].length);
  const v = !m[2] ? "ta" : "ᴗvu".includes(m[2]) ? "cra" : m[2] === "x" ? "na" : "crana";
  return { p: pos, v };
}
// 回傳 {off, minor, seventh, explicitMaj} 或 null
function parseRoman(tok) {
  const m = /^([b♭#♯]?)(VII|VI|IV|V|III|II|I|vii|vi|iv|v|iii|ii|i)(7)?$/.exec(tok);
  if (!m) return null;
  const acc = m[1] === "b" || m[1] === "♭" ? -1 : m[1] ? 1 : 0;
  return { off: DEGREE[m[2].toUpperCase()] + acc, minor: m[2] === m[2].toLowerCase(), seventh: !!m[3] };
}
function parseChordName(tok, tonicPc) {
  const m = /^([A-G])([#♯b♭]?)(maj|M|min|m|-)?(7)?$/.exec(tok);
  if (!m) return null;
  const acc = m[2] === "b" || m[2] === "♭" ? -1 : m[2] ? 1 : 0;
  return { off: LETTER[m[1]] + acc - tonicPc, minor: ["min", "m", "-"].includes(m[3]), seventh: !!m[4], explicitMaj: m[3] === "maj" || m[3] === "M" };
}
// 回傳 { seq, unknown（看不懂的字）, unsupported（看得懂但目前無法表達的和弦） }
function parseProgression(text, tonicPc) {
  const seq = [], unknown = [], unsupported = [];
  for (const tok of text.split(/[\s,|→、，]+/).filter((x) => x && x !== "-")) {
    const fn = parseFunctograph(tok);
    if (fn) { seq.push(fn); continue; }
    const c = parseRoman(tok) || parseChordName(tok, tonicPc);
    if (!c) { unknown.push(tok); continue; }
    if (c.seventh) {
      // 七和弦目前只支援「屬七」（主音上方完全五度的大和弦加小七度），對應挟み打ち
      if (!c.minor && !c.explicitMaj && mod(c.off, 12) === 7) seq.push({ p: 0, v: "pat" });
      else unsupported.push(tok);
      continue;
    }
    const f = fnForChord(c.off, c.minor);
    if (f) seq.push({ ...f }); else unsupported.push(tok);
  }
  return { seq, unknown, unsupported };
}

// ── 常見進行庫 ─────────────────────────────────────────────
// 這些是流行音樂中廣為人知的進行，以級數寫成，再換成機能。名稱是通稱。
const PROG_LIBRARY = [
  { id: "axis", rn: "I V vi IV", name: { zh: "流行四和弦", en: "Axis progression", ja: "ポップパンク進行" } },
  { id: "komuro", rn: "vi IV V I", name: { zh: "小室進行", en: "Komuro progression", ja: "小室進行" } },
  { id: "epic", rn: "vi IV I V", name: { zh: "vi–IV–I–V", en: "vi–IV–I–V", ja: "vi–IV–I–V" } },
  { id: "royal", rn: "IV V iii vi", name: { zh: "王道進行", en: "Royal road progression", ja: "王道進行" } },
  { id: "fifties", rn: "I vi IV V", name: { zh: "50 年代進行", en: "50s progression", ja: "循環コード（50s 進行）" } },
  { id: "turnaround", rn: "I vi ii V", name: { zh: "I–vi–ii–V 循環", en: "I–vi–ii–V turnaround", ja: "イチロクニーゴー" } },
  { id: "circle", rn: "vi ii V7 I", name: { zh: "五度圈下行", en: "Circle of fifths", ja: "五度圏進行" } },
  { id: "twofive", rn: "ii V7 I I", name: { zh: "ii–V–I", en: "ii–V–I", ja: "ツーファイブワン" } },
  { id: "three", rn: "I IV V I", name: { zh: "三和弦終止", en: "I–IV–V–I", ja: "スリーコード" } },
  { id: "rise", rn: "I iii IV V", name: { zh: "I–iii–IV–V", en: "I–iii–IV–V", ja: "I–iii–IV–V" } },
  { id: "andalusian", rn: "vi V IV III", name: { zh: "安達魯西亞終止", en: "Andalusian cadence", ja: "アンダルシア進行" } },
  { id: "marusa", rn: "IV III vi I", name: { zh: "丸之內進行", en: "Just the Two of Us progression", ja: "丸サ進行" } },
  { id: "mixo", rn: "I bVII IV I", name: { zh: "Mixolydian 搖滾", en: "Mixolydian rock", ja: "ミクソリディアン進行" } },
  { id: "minorplagal", rn: "I IV iv I", name: { zh: "小調變格", en: "Minor plagal", ja: "サブドミナントマイナー" } },
  { id: "emo", rn: "vi V IV V", name: { zh: "vi–V–IV–V", en: "vi–V–IV–V", ja: "vi–V–IV–V" } },
  { id: "ivfirst", rn: "IV I V vi", name: { zh: "IV–I–V–vi", en: "IV–I–V–vi", ja: "IV–I–V–vi" } },
  { id: "canon", rn: "I V vi iii IV I IV V", name: { zh: "卡農進行", en: "Pachelbel's Canon", ja: "カノン進行" } },
  { id: "axis8", rn: "I V vi IV I V IV V", name: { zh: "流行四和弦（八小節）", en: "Axis, 8-bar form", ja: "ポップパンク進行（8 小節）" } },
  { id: "royal251", rn: "IV V iii vi ii V7 I I", name: { zh: "王道進行接 ii–V–I", en: "Royal road into ii–V–I", ja: "王道進行＋ツーファイブワン" } },
].map((it) => ({ ...it, seq: null }));
function librarySeq(item) {
  if (!item.seq) item.seq = parseProgression(item.rn, 0).seq;
  return item.seq.map((f) => ({ ...f }));
}
// 從進行庫湊出 len 個和弦。回傳 { seq, ids }（ids = 依序用到的進行）
function libraryProgression(len) {
  const seq = [], ids = [];
  while (seq.length < len) {
    const room = len - seq.length;
    const fits = PROG_LIBRARY.filter((it) => it.rn.split(" ").length <= room && it.id !== ids[ids.length - 1]);
    const item = (fits.length ? fits : PROG_LIBRARY)[Math.floor(Math.random() * (fits.length || PROG_LIBRARY.length))];
    seq.push(...librarySeq(item).slice(0, room));
    ids.push(item.id);
  }
  return { seq, ids };
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
  module.exports = { parseProgression, libraryProgression, PROG_LIBRARY, MODES, buildChord, generateProgression, voiceProgression, tunedLog, harmononym, formula,
    ratioClass, edo41Step, nearest12, chordName12, howTo, stability, kin, sub, key, isZero };
}
