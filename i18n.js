// Semitone — 介面文字（繁體中文／English／日本語）
// t("key", {變數}) 取出目前語言的字串；找不到時退回中文，再退回 key 本身。
// 理論專有名詞（Ahta、cra、crana、Chy…）三種語言都保留原文。
// 英文術語沿用原作者英文字幕的用語（host/guest、functograph、base note、kin…）。

const I18N = {
  zh: {
    "title": "Semitone — 和弦進行產生器",
    "sub": "依シャサフ式音樂理論自動產生和弦進行，用合成器以純正律或 41 平均律播放，並說明每個音在 12 平均律的傳統樂器上該怎麼做。",
    "aria.settings": "設定", "aria.sigNum": "拍號分子", "aria.sigDen": "拍號分母", "aria.help": "說明", "aria.lattice": "格子圖",
    "aria.audition": "試聽和弦 {n}", "aria.lang": "語言",

    "l.mode": "和弦的次元（定義和音）", "l.len": "和弦數", "l.tonic": "主音（Ah）", "l.tuning": "播放用的調律",
    "l.instrument": "你的樂器（決定做法說明）", "l.timbre": "音色", "l.rhythm": "節奏型（播放與 MIDI 都套用）",
    "l.drums": "鼓組（合成，會跟著 BPM 與拍號）", "l.drumVol": "鼓音量", "l.bpm": "BPM（每分鐘幾個四分音符）",
    "l.sig": "拍號", "l.bars": "每個和弦的長度", "l.opts": "進行中的元素與播放選項", "dur": "（{s} 秒）",

    "mode.3": "3 次元 — AhChyLy（西洋音樂的大三和弦）", "mode.4": "4 次元 — AhChyMy（7 泛音）",
    "mode.5f": "5 次元 — AhChyFuzi（11 泛音，作者建議的配置）", "mode.5z": "5 次元 — AhChyZy（11 泛音，較難處理）",
    "tuning.ji": "純正律（理論上的目標）", "tuning.edo41": "41 平均律（沙音樂的量子化）", "tuning.edo12": "12 平均律（鋼琴的近似）",
    "inst.free": "無品弦樂、人聲、長號（音高可自由移動）", "inst.wind": "木管、銅管", "inst.guitar": "吉他、貝斯（有品）", "inst.fixed": "鋼琴、鍵盤、定音樂器",
    "tg.dance": "舞曲 Polysynth", "tg.pad": "Pad 與鍵盤", "tg.check": "檢查音準用",
    "tb.supersaw": "Supersaw（Trance／EDM）", "tb.pluck": "Pluck（House／Future Bass）", "tb.stab": "Chord Stab（House／Rave）",
    "tb.pwm": "PWM Poly（Synthwave）", "tb.hoover": "Hoover（Rave／Hardcore）", "tb.acid": "Acid 方波（Techno）",
    "tb.strings": "弦樂 Pad", "tb.pad": "柔和三角波", "tb.epiano": "電鋼琴（FM）", "tb.bell": "FM 鐘聲", "tb.organ": "風琴（最容易聽出純正與否）",
    "rh.sustain": "長音", "rh.beat": "每拍一下", "rh.eighth": "八分音符", "rh.offbeat": "反拍（House stab）", "rh.tresillo": "3-3-2（Tresillo）",
    "dr.none": "不要鼓", "dr.house": "House（四四拍大鼓＋反拍開鈸）", "dr.techno": "Techno（十六分鈸）", "dr.trance": "Trance（大鼓＋反拍開鈸）",
    "dr.breaks": "Breakbeat", "dr.garage": "UK Garage／2-Step", "dr.halftime": "Half-time（Trap／Dubstep）",
    "bars.half": "半小節", "bars.1": "1 小節", "bars.2": "2 小節",
    "o.cra": "cra（ᴗ）", "o.crana": "crana（ɣ）", "o.pat": "挟み打ち", "o.far": "走到 ≪ ≫", "o.arp": "琶音", "o.loop": "循環播放", "o.metro": "節拍器", "o.count": "預備拍一小節",

    "b.gen": "生成", "b.reset": "恢復預設值", "b.play": "▶ 播放", "b.stop": "■ 停止", "b.export": "⬇ 匯出 MIDI", "b.expand": "全部展開", "b.collapse": "全部收合",
    "tl.title": "和弦進行簡圖", "note": "點簡圖上的和弦可以試聽，右上角會出現 ↻，按它就換成這個位置的其他和弦（先輪代理，再輪其他合理的和弦）；點字卡標題展開細節，點 ▶ 只試聽。看不懂的地方把滑鼠移到圈圈 ? 上。",

    "card.chord": "和弦 {n}", "card.approx": "12 平均律 ≈ {name}", "card.bass": "底音", "card.closest": "12 平均律最接近：", "card.refOnly": "（僅供參考）",
    "card.swap": "換成這個位置的其他和弦", "card.subs": "同機能的代理：", "card.others": "其他合理的和弦：",
    "star": "賞我星星",
    "l.source": "生成方式", "src.mix": "混合（隨機演算法＋常見進行）", "src.random": "隨機演算法", "src.library": "常見進行庫",
    "l.custom": "自行輸入和弦（3、4 次元）", "custom.ph": "例：C Am F G7　或　IV V iii vi　或　O >v < >+<", "b.apply": "套用",
    "custom.empty": "請先輸入和弦。", "custom.ok": "已套用 {n} 個和弦。", "custom.translated": "4 次元模式下，這些和弦會保留原本的功能，轉寫成 4 次元的音。",
    "custom.unknown": "看不懂：{list}。", "custom.unsupported": "目前無法表達、已略過：{list}。", "used": "使用的常見進行：{list}",
    "role.na": "{name}ta 的 na 版本：保留機能根與司音，把客音翻到另一側（3 次元時是同主音的小和弦）。原作者建議盡量少用。",
    "role.p3": "離主音三步，屬方向上很遠的位置。", "role.p-3": "離主音三步，下屬方向上很遠的位置，帶有借用和弦的色彩。",
    "help.source": "決定按「生成」時進行從哪裡來。\n• 隨機演算法：依理論規則一步一步隨機走，每次都不同，會用到下方勾選的元素。\n• 常見進行庫：從流行音樂常見的進行（王道進行、卡農、小室進行、ii–V–I 等約 20 種）裡挑選並串接，簡圖下方會顯示用了哪幾個。\n• 混合：兩者各半。\n常見進行在 4、5 次元會保留功能、自動轉寫成該次元的音。",
    "help.custom": "自己打一段和弦進行，按「套用」或 Enter。三種寫法都可以，也能混用，用空白分隔：\n• 和弦名：C Am F G7（以目前選的主音為準）\n• 級數：I vi IV V7、bVII\n• 機能式：O、>、<、>>、<<；後面加 v 是 ᴗ、加 y 是 ɣ、加 x 是 na；>+< 是挟み打ち\n目前支援大三和弦、小三和弦與屬七（V7）。其他七和弦、掛留、增減和弦，以及離主音太遠的和弦會被略過並列出來。\n在 4 次元模式下，輸入的和弦會保留功能、轉寫成 4 次元的音，這正是理論裡「轉寫」的做法。",
    "th.note": "音（由低到高）", "th.12": "12 平均律", "th.dev": "偏差", "th.how": "在你的樂器上",
    "st.stable": "安定", "st.semi": "半安定", "st.unstable": "不安定",
    "v.exact": "12 平均律可以完全表達這個和弦。", "v.close": "12 平均律很接近；微調後會更純、拍音更少。",
    "v.approx": "12 平均律只能近似，這個次元的色彩要靠微調才出得來。", "v.none": "含有落在兩個半音正中間的音，12 平均律無法表達，必須用可微調的樂器。",

    "role.pat": "屬（Chyta）與下屬（Futa）同時響，從兩側夾住主和弦，強烈地想解決到 [O]。",
    "role.p0": "家。從泛音列的起點開始，最安穩。", "role.p1": "從泛音列的中途開始，「意料中的不完整」，有懸浮感，想落回 Ah。",
    "role.p-1": "含有主音泛音列以外的音，帶來轉折與展開。", "role.p2": "離主音兩步，更強的懸浮與期待。", "role.p-2": "離主音兩步，往下方展開的色彩。",
    "role.cra": "{name}ta 的陰版本：保留機能根與客音，其餘翻轉。功能類別不變，色彩轉暗。",
    "role.crana0": "crana 解決：不回到 Ahta，而是落在只保留客音翻出來的陽和弦上，明亮而出乎意料。",
    "role.crana": "{name}ta 的 crana 版本：只保留客音再翻回陽和弦，在同一功能類別內瞬間換色。",
    "move.label": "與前一個和弦：", "move.still": "底音不動", "move.to": "底音 → {h}（{f}，{k} 親等）", "move.common": "共通音：{list}",
    "move.near": "沒有共通音，但底音在 2 親等以內", "move.far": "沒有共通音，是較大的跳躍", "move.join": "；", "move.end": "。", "sep": "、",

    "how.ok": "照平常的音準即可。", "how.amt": "{r} 音分（{frac}）",
    "how.f.q": "約半個半音，即四分音", "how.f.third": "約 1/3 個半音", "how.f.seventh": "約 1/7～1/6 個半音", "how.f.tiny": "非常小",
    "how.sharp": "高", "how.flat": "低", "how.sideSharp": "高", "how.sideFlat": "低", "how.lipUp": "推高", "how.lipDown": "壓低",
    "how.free.q": "按在 {n} 與 {nb} 的正中間。先彈底音，再用耳朵把拍音調到最少。",
    "how.free.move": "{n} 的位置往{dir}的方向移 {amt}。對著底音聽，調到不再有拍音。",
    "how.wind.q": "需要四分音指法：以 {n} 為基礎用半孔或替代指法往{dir}調 {amt}，並查你樂器的四分音指法表。",
    "how.wind.mid": "吹 {n}，用嘴型加替代指法把音{verb} {amt}。", "how.wind.small": "吹 {n}，用嘴型或氣壓把音{verb} {amt}。",
    "how.guitar.up": "按 {n}，輕推弦把音升高 {amt}。",
    "how.guitar.down": "推弦只能升高：按低一格的 {nb} 再推高 {rest} 音分；或事先把這條弦調低 {r} 音分彈 {n}。",
    "how.fixed.q": "鍵盤上沒有這個音，它落在 {n} 與 {nb} 的中間。只能擇一替代（色彩會改變），或省略此音、交給可以微調的樂器。",
    "how.fixed.mid": "無法微調，只能彈 {n}，會比目標{side} {r} 音分，這個次元的色彩會明顯變淡。",
    "how.fixed.small": "無法微調，直接彈 {n}，與目標只差 {r} 音分。",

    "legend.title": "這些記號是什麼意思",
    "legend.html": `<li><b>次元</b>：2 次元 = 3 泛音（完全五度）、3 次元 = 5 泛音（大三度）、4 次元 = 7 泛音、5 次元 = 11 泛音。骨架永遠用 2 次元，另一個次元負責色彩。</li>
<li><b>機能式</b>：<code>[O]</code> Ahta = 主、<code>[&gt;]</code> Chyta = 屬（往五度上方一步）、<code>[&lt;]</code> Futa = 下屬（往下一步）、<code>[≫]</code> <code>[≪]</code> 是兩步。</li>
<li><b>ᴗ（cra）</b>：保留機能根與客音，把和弦翻轉成「陰」的版本（3 次元時就是關係小和弦）。<b>ɣ（crana）</b>：只保留客音再翻回「陽」，得到明亮而意外的和弦。</li>
<li><b>挟み打ち <code>[&gt;+&lt;]</code></b>：屬和弦上加下屬的中心音，從兩側夾住主和弦（3 次元時就是屬七）。</li>
<li><b>ハーモニム</b>：每個音相對主音的座標唱名。Chy = 2 次元上昇、Fu = 2 次元下降、Ly/Su = 3 次元、My/Pu = 4 次元、Zy/Tschu = 5 次元，連寫表示相乘（Chyli = 15/8）。</li>
<li><b>安定度</b>：和弦含主音且主音在最低 = 安定；含主音但不在最低 = 半安定；不含主音 = 不安定。</li>
<li><b>小格子圖</b>：橫向是 2 次元（右 = 上昇），縱向是客次元（上 = 上昇）。空心框是主音的位置，實心格是這個和弦用到的音，三角標記底音。</li>`,
    "footer.html": `理論：LΛMPLIGHT 的シャサフ式音楽理論（<a href="https://lamplight0.sakura.ne.jp/a/" target="_blank" rel="noopener">官網</a>）。本頁是依其公開資料所做的非官方實作，解讀若有出入以原作者為準。聲音：<a href="https://github.com/Tonejs/Tone.js" target="_blank" rel="noopener">Tone.js</a>（MIT）。<br>作者：<a href="https://github.com/Hikari-Tsai" target="_blank" rel="noopener">Hikari Tsai</a>　·　<a href="https://github.com/Hikari-Tsai/Semitone" target="_blank" rel="noopener">原始碼</a>（MIT 授權）`,

    "help.mode": "決定和弦用哪一種「色彩音」。\n• 3 次元：一般的大三和弦（Do-Mi-Sol），最熟悉。\n• 4 次元：把 Mi 換成第 7 泛音，帶藍調、懸浮的感覺。\n• 5 次元：換成第 11 泛音，落在鋼琴兩個鍵的正中間，最「異世界」。\n骨架永遠是完全五度（2 次元），只有色彩音會變。",
    "help.len": "這段進行總共有幾個和弦。",
    "help.tonic": "整段進行的「家」是哪個音。所有和弦都以它為基準計算，換主音等於整段移調。",
    "help.tuning": "播放時每個音的精確音高怎麼算。\n• 純正律：頻率是簡單整數比，和弦最乾淨，是理論上的目標。\n• 41 平均律：把八度分成 41 等分去逼近純正律，是這套理論作者慣用的調律。\n• 12 平均律：一般鋼琴的調律，用來對照差別。\n下方字卡的說明一律以純正律（或 41 平均律）為目標。",
    "help.instrument": "選你要演奏的樂器。字卡裡「在你的樂器上」那一欄會依此說明每個音該怎麼做，例如弦樂是移動手指、吉他是推弦、鋼琴則無法微調。",
    "help.timbre": "合成器的音色。想聽清楚調律差別請選「風琴」；舞曲音色本身帶有失諧的厚度，會蓋掉細微的音準差異。",
    "help.rhythm": "每個和弦在它的時間內怎麼彈。\n• 長音：按住整個和弦。\n• 每拍一下／八分音符：規律地重複彈。\n• 反拍：彈在拍子與拍子的中間，House 常見。\n• 3-3-2：三個音的切分節奏（Tresillo）。",
    "help.drums": "墊在底下的鼓機節奏。聲音是合成的，所以會自動跟著你設定的 BPM 與拍號。",
    "help.drumVol": "鼓機的音量，不影響和弦。",
    "help.bpm": "速度：每分鐘有幾個四分音符。數字越大越快。120 大約是 House 的速度。",
    "help.sigNum": "拍號。左邊是每小節幾拍，右邊是以哪種音符當一拍（4 = 四分音符，8 = 八分音符）。例如 3/4 是華爾滋的三拍子。",
    "help.bars": "每個和弦持續多久。括號裡是依目前 BPM 與拍號換算出來的秒數。",
    "help.optsLabel": "前四項決定「隨機演算法」可以用哪些和弦種類（改了要按「生成」才生效）；後四項是播放方式，隨時可切換。",
    "help.oCra": "允許把和弦翻成「陰」的版本。在 3 次元就是關係小和弦，例如 C 變成 Am。功能不變，色彩轉暗。",
    "help.oCrana": "允許「只留一個音、其餘全換」的明亮和弦，例如 C 的位置出現 A 大和弦。聽起來像瞬間換了顏色。",
    "help.oPat": "允許在結尾前用「屬和弦＋下屬的音」夾住主和弦，3 次元時就是屬七和弦（G7），會強烈地想回到主和弦。原文叫挟み打ち。",
    "help.oFar": "允許走到離主和弦兩步遠的位置（簡圖上的 ≪ 與 ≫），進行會更有起伏，也更不穩定。",
    "help.oArp": "和弦的音由低到高依序彈出，而不是同時按下。只在節奏型為「長音」時有效。",
    "help.oLoop": "播完自動從頭再來，直到按停止。",
    "help.oMetro": "每一拍響一聲，小節第一拍音較高。",
    "help.oCount": "按播放後先數一小節的拍子，再開始第一個和弦，方便你拿著樂器跟上。",
    "help.gen": "依上面的設定隨機產生一段新的和弦進行。每次按都不一樣。",
    "help.export": "下載成 MIDI 檔，可匯入編曲軟體（DAW）。\nMIDI 的音符只能是 12 平均律，所以每個音前面會加上「彎音」（pitch bend）把音高修正到你選的調律。彎音是整個通道共用的，因此每個聲部各佔一個通道（1–5），鼓在第 10 通道。\n匯入後請讓各通道用同一個音色，並確認音源的彎音範圍是 ±2 個半音。",
    "help.toggleAll": "一次展開或收合下面所有和弦的字卡。",
    "help.reset": "把上面所有設定改回一開始的預設值，並重新生成一段進行。\n平常你的設定和目前的進行會自動記在這個瀏覽器裡，重新整理或下次再開都還在；按這個按鈕就會清掉它們。語言設定不受影響。",
    "help.timeline": "整段進行的地圖。橫向是時間；縱向是和弦離「家」多遠：中間虛線是主和弦 [O]，往上是屬方向 [>]，往下是下屬方向 [<]。框內是機能記號，下方是最接近的一般和弦名。點任一個可試聽，並出現 ↻ 讓你換成這個位置的其他和弦。",
    "help.stability": "這個和弦聽起來多安穩。含主音且主音在最低＝安定；含主音但不在最低＝半安定；不含主音＝不安定，會想往別處走。",
    "help.colNote": "每個音相對主音的名字（這套理論的唱名）。下面小字依序是：座標寫法、頻率比、在 41 平均律裡是第幾步。",
    "help.subs": "這些和弦在這個位置可以互相替代，因為它們屬於同一個「機能類」：離主和弦的距離相同，只是色彩不同（原形、陰的版本 ᴗ、瞬間換色的 ɣ）。屬的位置還可以換成挟み打ち [>+<]（3 次元時是屬七）。\n點任一個就會換上並試聽；標題列的 ↻ 會依序輪替（先代理，再輪到其他合理的和弦）。換了之後整段的聲部配置會重新計算。",
    "help.others": "這些和弦的功能和原本不同，但和前後的和弦接得起來，所以放在這裡也合理。判斷方式來自原作者的作曲訣竅：和相鄰的和弦有共通音，或底音與相鄰和弦的底音很近（2 親等以內）。接得最順的排在前面。\n換成這一組的和弦會改變這一段的走向，簡圖上的折線也會跟著變。",
    "help.colDev": "目標音比左邊那個鋼琴音高（+）或低（−）多少。單位是音分，100 音分＝一個半音。綠色幾乎不用調，橘色要微調，紅色差很多。",
  },

  en: {
    "title": "Semitone — Chord Progression Generator",
    "sub": "Generates chord progressions from Shasavistic music theory, plays them on a synthesizer in just intonation or 41edo, and explains how to play every note on a conventional 12-tone instrument.",
    "aria.settings": "Settings", "aria.sigNum": "Time signature numerator", "aria.sigDen": "Time signature denominator", "aria.help": "Help", "aria.lattice": "Lattice diagram",
    "aria.audition": "Play chord {n}", "aria.lang": "Language",

    "l.mode": "Chord dimension (definition chord)", "l.len": "Number of chords", "l.tonic": "Tonic (Ah)", "l.tuning": "Playback tuning",
    "l.instrument": "Your instrument (sets the how-to text)", "l.timbre": "Sound", "l.rhythm": "Rhythm pattern (playback and MIDI)",
    "l.drums": "Drums (synthesized, follow BPM and meter)", "l.drumVol": "Drum volume", "l.bpm": "BPM (quarter notes per minute)",
    "l.sig": "Time signature", "l.bars": "Length of each chord", "l.opts": "Progression elements and playback options", "dur": " ({s} s)",

    "mode.3": "3D — AhChyLy (the Western major triad)", "mode.4": "4D — AhChyMy (7th harmonic)",
    "mode.5f": "5D — AhChyFuzi (11th harmonic, the author's preferred layout)", "mode.5z": "5D — AhChyZy (11th harmonic, harder to handle)",
    "tuning.ji": "Just intonation (the theoretical target)", "tuning.edo41": "41edo (the quantization used in Shasavic music)", "tuning.edo12": "12edo (the piano's approximation)",
    "inst.free": "Fretless strings, voice, trombone (free pitch)", "inst.wind": "Woodwinds, brass", "inst.guitar": "Guitar, bass (fretted)", "inst.fixed": "Piano, keyboards, fixed-pitch instruments",
    "tg.dance": "Dance polysynths", "tg.pad": "Pads and keys", "tg.check": "For checking intonation",
    "tb.supersaw": "Supersaw (Trance / EDM)", "tb.pluck": "Pluck (House / Future Bass)", "tb.stab": "Chord Stab (House / Rave)",
    "tb.pwm": "PWM Poly (Synthwave)", "tb.hoover": "Hoover (Rave / Hardcore)", "tb.acid": "Acid square (Techno)",
    "tb.strings": "String pad", "tb.pad": "Soft triangle", "tb.epiano": "Electric piano (FM)", "tb.bell": "FM bell", "tb.organ": "Organ (easiest for hearing pure intervals)",
    "rh.sustain": "Sustained", "rh.beat": "Every beat", "rh.eighth": "Eighth notes", "rh.offbeat": "Offbeats (house stab)", "rh.tresillo": "3-3-2 (tresillo)",
    "dr.none": "No drums", "dr.house": "House (four-on-the-floor, offbeat open hat)", "dr.techno": "Techno (16th hats)", "dr.trance": "Trance (kick and offbeat open hat)",
    "dr.breaks": "Breakbeat", "dr.garage": "UK Garage / 2-Step", "dr.halftime": "Half-time (Trap / Dubstep)",
    "bars.half": "Half a bar", "bars.1": "1 bar", "bars.2": "2 bars",
    "o.cra": "cra (ᴗ)", "o.crana": "crana (ɣ)", "o.pat": "Sandwiching", "o.far": "Go out to ≪ ≫", "o.arp": "Arpeggiate", "o.loop": "Loop", "o.metro": "Metronome", "o.count": "One-bar count-in",

    "b.gen": "Generate", "b.reset": "Reset to defaults", "b.play": "▶ Play", "b.stop": "■ Stop", "b.export": "⬇ Export MIDI", "b.expand": "Expand all", "b.collapse": "Collapse all",
    "tl.title": "Progression map", "note": "Click a chord on the map to hear it; a ↻ appears at its corner that swaps in another chord that fits that position (substitutes first, then others). Click a card header for details, or ▶ to just listen. Hover over any circled ? for an explanation.",

    "card.chord": "Chord {n}", "card.approx": "12edo ≈ {name}", "card.bass": "base note", "card.closest": "Closest in 12edo: ", "card.refOnly": " (rough guide only)",
    "card.swap": "Swap for another chord that fits this position", "card.subs": "Same-function substitutes:", "card.others": "Other chords that fit:",
    "star": "Star on GitHub",
    "l.source": "Generation method", "src.mix": "Mixed (random algorithm + common progressions)", "src.random": "Random algorithm", "src.library": "Common progression library",
    "l.custom": "Enter your own chords (3D and 4D)", "custom.ph": "e.g.  C Am F G7   or   IV V iii vi   or   O >v < >+<", "b.apply": "Apply",
    "custom.empty": "Type some chords first.", "custom.ok": "Applied {n} chords.", "custom.translated": "In 4D mode these chords keep their function and are translated into 4D pitches.",
    "custom.unknown": "Not understood: {list}.", "custom.unsupported": "Cannot be expressed yet, skipped: {list}.", "used": "Common progressions used: {list}",
    "role.na": "The na version of {name}ta: the functional note and host note stay, and the guest note flips to the other side (in 3D, the parallel minor). The author recommends using it sparingly.",
    "role.p3": "Three steps from the tonic, far out on the dominant side.", "role.p-3": "Three steps from the tonic, far out on the subdominant side, with the colour of a borrowed chord.",
    "help.source": "Decides where the progression comes from when you press “Generate”.\n• Random algorithm: walks step by step following the theory's rules, different every time, using the elements ticked below.\n• Common progression library: picks and chains well-known pop progressions (royal road, Canon, Komuro, ii–V–I and about 20 in all); the ones used are named under the map.\n• Mixed: half and half.\nIn 4D and 5D the common progressions keep their functions and are translated into that dimension's pitches.",
    "help.custom": "Type your own progression and press “Apply” or Enter. Three notations work and can be mixed, separated by spaces:\n• Chord names: C Am F G7 (relative to the selected tonic)\n• Roman numerals: I vi IV V7, bVII\n• Functographs: O, >, <, >>, <<; add v for ᴗ, y for ɣ, x for na; >+< is sandwiching\nMajor triads, minor triads and the dominant seventh (V7) are supported. Other sevenths, sus, augmented and diminished chords, and chords too far from the tonic are skipped and listed.\nIn 4D mode the chords keep their function and are translated into 4D pitches, which is exactly the theory's “translation” technique.",
    "th.note": "Note (low to high)", "th.12": "12edo", "th.dev": "Offset", "th.how": "On your instrument",
    "st.stable": "stable", "st.semi": "semi-stable", "st.unstable": "unstable",
    "v.exact": "12edo can play this chord exactly.", "v.close": "12edo is very close; fine-tuning makes it purer, with less beating.",
    "v.approx": "12edo only approximates this; the colour of this dimension needs fine-tuning to come through.", "v.none": "Contains a note halfway between two semitones. 12edo cannot play it; you need an instrument that can bend pitch.",

    "role.pat": "The dominant (Chyta) and subdominant (Futa) sound together, sandwiching the tonic chord from both sides and pulling strongly toward [O].",
    "role.p0": "Home. It starts at the beginning of the overtone series, so it is the most settled.", "role.p1": "Starts midway through the overtone series: expected but incomplete. It floats and wants to land on Ah.",
    "role.p-1": "Includes tones outside the tonic's overtone series, creating a turn and an unfolding.", "role.p2": "Two steps from the tonic: stronger floating and expectation.", "role.p-2": "Two steps from the tonic: a colour that unfolds downward.",
    "role.cra": "The dark version of {name}ta: the functional note and guest note stay, the rest flips. Same functional type, darker colour.",
    "role.crana0": "Crana resolution: instead of returning to Ahta, it lands on the bright chord obtained by keeping only the guest note. Bright and unexpected.",
    "role.crana": "The crana version of {name}ta: only the guest note stays and the chord flips back to a bright one, an instant colour change within the same functional type.",
    "move.label": "From the previous chord: ", "move.still": "base note stays", "move.to": "base note → {h} ({f}, {k}-kin)", "move.common": "common tones: {list}",
    "move.near": "no common tones, but the base note is within 2-kin", "move.far": "no common tones, a larger leap", "move.join": "; ", "move.end": ".", "sep": ", ",

    "how.ok": "Play it at normal pitch.", "how.amt": "{r} cents ({frac})",
    "how.f.q": "about half a semitone, a quarter tone", "how.f.third": "about 1/3 of a semitone", "how.f.seventh": "about 1/7 to 1/6 of a semitone", "how.f.tiny": "very small",
    "how.sharp": "sharp", "how.flat": "flat", "how.sideSharp": "sharp", "how.sideFlat": "flat", "how.lipUp": "up", "how.lipDown": "down",
    "how.free.q": "Stop the note exactly halfway between {n} and {nb}. Sound the base note first, then tune by ear until the beating is minimal.",
    "how.free.move": "Play {n} {dir} by {amt}. Listen against the base note and adjust until the beating stops.",
    "how.wind.q": "Needs a quarter-tone fingering: start from {n} and use half-holing or an alternate fingering to go {dir} by {amt}. Check a quarter-tone fingering chart for your instrument.",
    "how.wind.mid": "Play {n} and bend it {verb} by {amt} with your embouchure plus an alternate fingering.", "how.wind.small": "Play {n} and bend it {verb} by {amt} with your embouchure or air pressure.",
    "how.guitar.up": "Fret {n} and bend the string slightly, raising it by {amt}.",
    "how.guitar.down": "Bends only raise pitch: fret {nb} one fret lower and bend up {rest} cents, or tune this string {r} cents flat beforehand and play {n}.",
    "how.fixed.q": "The keyboard has no such note; it lies between {n} and {nb}. Substitute one of them (the colour changes), or leave the note out and give it to an instrument that can bend.",
    "how.fixed.mid": "Cannot be adjusted. Playing {n} lands {r} cents {side} of the target, so the colour of this dimension is clearly weakened.",
    "how.fixed.small": "Cannot be adjusted. Just play {n}; it is only {r} cents from the target.",

    "legend.title": "What the symbols mean",
    "legend.html": `<li><b>Dimensions</b>: 2D = 3rd harmonic (perfect fifth), 3D = 5th harmonic (major third), 4D = 7th harmonic, 5D = 11th harmonic. The skeleton always uses 2D; the other dimension supplies the colour.</li>
<li><b>Functographs</b>: <code>[O]</code> Ahta = tonic, <code>[&gt;]</code> Chyta = dominant (one step up a fifth), <code>[&lt;]</code> Futa = subdominant (one step down); <code>[≫]</code> and <code>[≪]</code> are two steps.</li>
<li><b>ᴗ (cra)</b>: keep the functional note and the guest note and flip the chord into its dark version (in 3D, the relative minor). <b>ɣ (crana)</b>: keep only the guest note and flip back to a bright chord, bright and unexpected.</li>
<li><b>Sandwiching <code>[&gt;+&lt;]</code></b>: the dominant chord plus the subdominant's central note, squeezing the tonic chord from both sides (in 3D, a dominant seventh).</li>
<li><b>Harmononyms</b>: each note's coordinate name relative to the tonic. Chy = 2D ascent, Fu = 2D descent, Ly/Su = 3D, My/Pu = 4D, Zy/Tschu = 5D; joined names multiply (Chyli = 15/8).</li>
<li><b>Stability</b>: tonic present and lowest = stable; present but not lowest = semi-stable; absent = unstable.</li>
<li><b>Small lattice</b>: horizontal is 2D (right = ascent), vertical is the guest dimension (up = ascent). The hollow box is the tonic, filled cells are the notes of this chord, and the triangle marks the base note.</li>`,
    "footer.html": `Theory: Shasavistic music theory by LΛMPLIGHT (<a href="https://lamplight0.sakura.ne.jp/a/" target="_blank" rel="noopener">official site</a>). This page is an unofficial implementation based on the published material; where readings differ, the author's is authoritative. Sound: <a href="https://github.com/Tonejs/Tone.js" target="_blank" rel="noopener">Tone.js</a> (MIT).<br>Made by <a href="https://github.com/Hikari-Tsai" target="_blank" rel="noopener">Hikari Tsai</a> · <a href="https://github.com/Hikari-Tsai/Semitone" target="_blank" rel="noopener">Source code</a> (MIT License)`,

    "help.mode": "Chooses the “colour note” of the chords.\n• 3D: the ordinary major triad (C-E-G), the most familiar.\n• 4D: replaces E with the 7th harmonic, bluesy and floating.\n• 5D: uses the 11th harmonic, which falls exactly between two piano keys; the most otherworldly.\nThe skeleton is always the perfect fifth (2D); only the colour note changes.",
    "help.len": "How many chords the progression has in total.",
    "help.tonic": "Which note is “home”. Every chord is calculated from it, so changing the tonic transposes the whole progression.",
    "help.tuning": "How the exact pitch of each note is calculated for playback.\n• Just intonation: frequencies are simple whole-number ratios; chords are at their cleanest. This is the theoretical target.\n• 41edo: divides the octave into 41 equal steps to approximate just intonation; the tuning the theory's author normally uses.\n• 12edo: ordinary piano tuning, for comparison.\nThe cards below always describe just intonation (or 41edo) as the target.",
    "help.instrument": "Pick the instrument you will play. The “On your instrument” column on each card then explains what to do for every note: move a finger on strings, bend on guitar, and on piano it cannot be adjusted.",
    "help.timbre": "The synthesizer sound. Choose “Organ” to hear tuning differences clearly; the dance sounds get their thickness from detuning, which masks small pitch differences.",
    "help.rhythm": "How each chord is played within its time slot.\n• Sustained: hold the whole chord.\n• Every beat / eighth notes: repeat it evenly.\n• Offbeats: play between the beats, common in house.\n• 3-3-2: a three-hit syncopated figure (tresillo).",
    "help.drums": "A drum machine pattern underneath. The sounds are synthesized, so they automatically follow your BPM and time signature.",
    "help.drumVol": "Volume of the drum machine only; the chords are unaffected.",
    "help.bpm": "Tempo: quarter notes per minute. Higher is faster. 120 is roughly house tempo.",
    "help.sigNum": "Time signature. The left number is beats per bar; the right is which note value counts as one beat (4 = quarter note, 8 = eighth note). 3/4, for example, is waltz time.",
    "help.bars": "How long each chord lasts. The figure in brackets is the length in seconds at the current BPM and time signature.",
    "help.optsLabel": "The first four decide which chord types the random algorithm may use (press “Generate” for changes to take effect). The last four are playback options and can be switched at any time.",
    "help.oCra": "Allows chords to flip into their dark version. In 3D this is the relative minor, e.g. C becomes Am. Same function, darker colour.",
    "help.oCrana": "Allows bright chords made by keeping one note and replacing the rest, e.g. an A major chord appearing where C would be. It sounds like an instant change of colour.",
    "help.oPat": "Allows a chord before the ending that sandwiches the tonic chord between the dominant and a note of the subdominant. In 3D this is the dominant seventh (G7), which strongly wants to return home. The original term is hasami-uchi.",
    "help.oFar": "Allows positions two steps from the tonic chord (≪ and ≫ on the map). The progression gets more contour and less stability.",
    "help.oArp": "Plays the chord notes one after another from low to high instead of together. Only applies when the rhythm pattern is “Sustained”.",
    "help.oLoop": "Starts again from the beginning automatically until you press Stop.",
    "help.oMetro": "Clicks on every beat, with a higher click on the first beat of each bar.",
    "help.oCount": "After pressing Play, counts one bar of clicks before the first chord, so you can come in on your instrument.",
    "help.gen": "Randomly generates a new chord progression from the settings above. Different every time.",
    "help.export": "Downloads a MIDI file you can import into a DAW.\nMIDI note numbers can only be 12edo, so a pitch bend is sent before each note to correct it to the tuning you selected. Pitch bend applies to a whole channel, so each voice gets its own channel (1–5); drums are on channel 10.\nAfter importing, give all channels the same sound and make sure the instrument's bend range is ±2 semitones.",
    "help.toggleAll": "Expands or collapses all the chord cards below at once.",
    "help.reset": "Puts every setting above back to its original default and generates a fresh progression.\nNormally your settings and the current progression are remembered in this browser, so they survive a reload or a later visit; this button clears them. The language choice is not affected.",
    "help.timeline": "A map of the whole progression. Horizontal is time; vertical is how far a chord is from home: the dashed middle line is the tonic chord [O], up is the dominant side [>], down is the subdominant side [<]. Each box shows the functograph, with the nearest ordinary chord name underneath. Click any chord to hear it and to reveal a ↻ that swaps in another chord for that position.",
    "help.stability": "How settled the chord sounds. Tonic present and lowest = stable; present but not lowest = semi-stable; absent = unstable, wanting to move on.",
    "help.colNote": "The name of each note relative to the tonic (the theory's solmization). The small print shows, in order: the coordinate formula, the frequency ratio, and the step number in 41edo.",
    "help.subs": "These chords can stand in for one another here because they belong to the same functional type: the same distance from the tonic chord, with a different colour (the plain form, the dark version ᴗ, the instant colour change ɣ). The dominant position can also take the sandwiching chord [>+<] (a dominant seventh in 3D).\nClick one to swap it in and hear it; the ↻ in the header cycles through them (substitutes first, then the other chords that fit). The voicing of the whole progression is recalculated after a swap.",
    "help.others": "These chords have a different function from the original, but they connect to the chords before and after, so they also make sense here. The test comes from the author's composing tips: the chord shares a common tone with its neighbours, or its base note is close to theirs (within 2-kin). The smoothest connections are listed first.\nChoosing from this group changes where this passage goes, and the line on the map changes with it.",
    "help.colDev": "How much higher (+) or lower (−) the target is than the piano note on its left, in cents; 100 cents = one semitone. Green needs almost no adjustment, orange needs fine-tuning, red is far off.",
  },

  ja: {
    "title": "Semitone — コード進行ジェネレーター",
    "sub": "シャサフ式音楽理論に基づいてコード進行を自動生成し、シンセサイザーで純正律または 41 平均律で再生します。各音を 12 平均律の一般的な楽器でどう演奏するかも説明します。",
    "aria.settings": "設定", "aria.sigNum": "拍子の分子", "aria.sigDen": "拍子の分母", "aria.help": "説明", "aria.lattice": "格子図",
    "aria.audition": "和音 {n} を試聴", "aria.lang": "言語",

    "l.mode": "和音の次元（定義和音）", "l.len": "和音の数", "l.tonic": "主音（Ah）", "l.tuning": "再生する調律",
    "l.instrument": "あなたの楽器（演奏方法の説明に反映）", "l.timbre": "音色", "l.rhythm": "リズムパターン（再生と MIDI の両方）",
    "l.drums": "ドラム（合成音。BPM と拍子に追従）", "l.drumVol": "ドラム音量", "l.bpm": "BPM（1 分あたりの四分音符の数）",
    "l.sig": "拍子", "l.bars": "和音ひとつの長さ", "l.opts": "進行の要素と再生オプション", "dur": "（{s} 秒）",

    "mode.3": "3 次元 — AhChyLy（西洋音楽の長三和音）", "mode.4": "4 次元 — AhChyMy（7 倍音）",
    "mode.5f": "5 次元 — AhChyFuzi（11 倍音。作者推奨の配置）", "mode.5z": "5 次元 — AhChyZy（11 倍音。扱いが難しい）",
    "tuning.ji": "純正律（理論上の目標）", "tuning.edo41": "41 平均律（シャサフ音楽の量子化）", "tuning.edo12": "12 平均律（ピアノの近似）",
    "inst.free": "フレットのない弦楽器・声・トロンボーン（音高を自由に動かせる）", "inst.wind": "木管・金管", "inst.guitar": "ギター・ベース（フレットあり）", "inst.fixed": "ピアノ・鍵盤・音高固定の楽器",
    "tg.dance": "ダンス系ポリシンセ", "tg.pad": "パッドと鍵盤", "tg.check": "音程の確認用",
    "tb.supersaw": "Supersaw（Trance／EDM）", "tb.pluck": "Pluck（House／Future Bass）", "tb.stab": "Chord Stab（House／Rave）",
    "tb.pwm": "PWM Poly（Synthwave）", "tb.hoover": "Hoover（Rave／Hardcore）", "tb.acid": "Acid 矩形波（Techno）",
    "tb.strings": "ストリングスパッド", "tb.pad": "やわらかい三角波", "tb.epiano": "エレクトリックピアノ（FM）", "tb.bell": "FM ベル", "tb.organ": "オルガン（純正かどうか最も聞き取りやすい）",
    "rh.sustain": "ロングトーン", "rh.beat": "1 拍ごと", "rh.eighth": "八分音符", "rh.offbeat": "裏拍（House stab）", "rh.tresillo": "3-3-2（トレシージョ）",
    "dr.none": "ドラムなし", "dr.house": "House（四つ打ち＋裏拍オープンハット）", "dr.techno": "Techno（16 分ハット）", "dr.trance": "Trance（キック＋裏拍オープンハット）",
    "dr.breaks": "Breakbeat", "dr.garage": "UK Garage／2-Step", "dr.halftime": "Half-time（Trap／Dubstep）",
    "bars.half": "半小節", "bars.1": "1 小節", "bars.2": "2 小節",
    "o.cra": "cra（ᴗ）", "o.crana": "crana（ɣ）", "o.pat": "挟み打ち", "o.far": "≪ ≫ まで進む", "o.arp": "アルペジオ", "o.loop": "ループ再生", "o.metro": "メトロノーム", "o.count": "1 小節のカウントイン",

    "b.gen": "生成", "b.reset": "初期設定に戻す", "b.play": "▶ 再生", "b.stop": "■ 停止", "b.export": "⬇ MIDI を書き出す", "b.expand": "すべて開く", "b.collapse": "すべて閉じる",
    "tl.title": "コード進行の略図", "note": "略図の和音をクリックすると試聴でき、右上に ↻ が現れます。押すとその位置に合う別の和音に入れ替わります（先に代理和音、続いてそのほかの和音）。カードの見出しをクリックすると詳細が開き、▶ は試聴だけを行います。わからない項目は丸い ? にマウスを重ねてください。",

    "card.chord": "和音 {n}", "card.approx": "12 平均律 ≈ {name}", "card.bass": "底音", "card.closest": "12 平均律で最も近い和音：", "card.refOnly": "（参考程度）",
    "card.swap": "この位置に合う別の和音に入れ替える", "card.subs": "同じ機能の代理和音：", "card.others": "そのほかの合う和音：",
    "star": "スターをください",
    "l.source": "生成方法", "src.mix": "ミックス（ランダム＋定番進行）", "src.random": "ランダムアルゴリズム", "src.library": "定番進行ライブラリ",
    "l.custom": "和音を自分で入力（3・4 次元）", "custom.ph": "例：C Am F G7　または　IV V iii vi　または　O >v < >+<", "b.apply": "適用",
    "custom.empty": "先に和音を入力してください。", "custom.ok": "{n} 個の和音を適用しました。", "custom.translated": "4 次元モードでは、これらの和音は機能を保ったまま 4 次元の音に転写されます。",
    "custom.unknown": "解釈できません：{list}。", "custom.unsupported": "現在は表現できないため省略しました：{list}。", "used": "使用した定番進行：{list}",
    "role.na": "{name}ta の na 形：機能根と司音を保持し、客音を反対側に反転します（3 次元では同主短和音）。作者はなるべく使わないことを勧めています。",
    "role.p3": "主音から 3 歩。属の方向のかなり遠い位置。", "role.p-3": "主音から 3 歩。下属の方向のかなり遠い位置で、借用和音のような色合いがあります。",
    "help.source": "「生成」を押したときに進行をどこから作るかを決めます。\n• ランダムアルゴリズム：理論の規則に従って一歩ずつランダムに進みます。毎回異なり、下でチェックした要素を使います。\n• 定番進行ライブラリ：ポップスでよく知られた進行（王道進行、カノン進行、小室進行、ツーファイブワンなど約 20 種）から選んでつなげます。使った進行名は略図の下に表示されます。\n• ミックス：半々です。\n定番進行は 4・5 次元でも機能を保ったまま、その次元の音に転写されます。",
    "help.custom": "自分でコード進行を入力し、「適用」または Enter を押します。3 種類の書き方が使え、混ぜても構いません。空白で区切ります：\n• コード名：C Am F G7（選択中の主音が基準）\n• ディグリー：I vi IV V7、bVII\n• 機能式：O、>、<、>>、<<。後ろに v で ᴗ、y で ɣ、x で na。>+< は挟み打ち\n対応しているのは長三和音、短三和音、属七（V7）です。そのほかの七の和音、sus、増・減和音、主音から遠すぎる和音は省略され、一覧で表示されます。\n4 次元モードでは、入力した和音は機能を保ったまま 4 次元の音に転写されます。理論でいう「転写」の方法です。",
    "th.note": "音（低い順）", "th.12": "12 平均律", "th.dev": "ずれ", "th.how": "あなたの楽器では",
    "st.stable": "安定", "st.semi": "半安定", "st.unstable": "不安定",
    "v.exact": "12 平均律でこの和音を完全に表現できます。", "v.close": "12 平均律でもかなり近いです。微調整するとより純正になり、うなりが減ります。",
    "v.approx": "12 平均律では近似にとどまります。この次元の色合いは微調整して初めて現れます。", "v.none": "半音と半音のちょうど中間の音を含みます。12 平均律では表現できず、音高を微調整できる楽器が必要です。",

    "role.pat": "属（Chyta）と下属（Futa）が同時に鳴り、主和音を両側から挟んで [O] への解決を強く促します。",
    "role.p0": "ホーム。倍音列の始まりから始まるため、最も落ち着きます。", "role.p1": "倍音列の途中から始まる「期待どおりの不完全さ」。浮遊感があり、Ah に着地したくなります。",
    "role.p-1": "主音の倍音列の外にある音を含み、転換と展開を生みます。", "role.p2": "主音から 2 歩。より強い浮遊感と期待。", "role.p-2": "主音から 2 歩。下方へ広がる色合い。",
    "role.cra": "{name}ta の陰の形：機能根と客音を保持し、残りを反転します。機能類は同じで、色合いが暗くなります。",
    "role.crana0": "crana 解決：Ahta に戻らず、客音だけを保持して反転した陽和音に着地します。明るく意外な響きです。",
    "role.crana": "{name}ta の crana 形：客音だけを保持して陽和音に戻します。同じ機能類の中で一瞬にして色が変わります。",
    "move.label": "前の和音から：", "move.still": "底音は動かない", "move.to": "底音 → {h}（{f}、{k} 親等）", "move.common": "共通音：{list}",
    "move.near": "共通音はないが、底音は 2 親等以内", "move.far": "共通音がなく、大きめの跳躍", "move.join": "。", "move.end": "。", "sep": "、",

    "how.ok": "通常の音程で演奏します。", "how.amt": "{r} セント（{frac}）",
    "how.f.q": "半音の約半分、四分音", "how.f.third": "半音の約 1/3", "how.f.seventh": "半音の約 1/7〜1/6", "how.f.tiny": "ごくわずか",
    "how.sharp": "高い", "how.flat": "低い", "how.sideSharp": "高く", "how.sideFlat": "低く", "how.lipUp": "上げ", "how.lipDown": "下げ",
    "how.free.q": "{n} と {nb} のちょうど中間を押さえます。先に底音を鳴らし、うなりが最小になるよう耳で合わせます。",
    "how.free.move": "{n} の位置から{dir}ほうへ {amt} 動かします。底音と聞き比べ、うなりが消えるまで調整します。",
    "how.wind.q": "四分音の運指が必要です。{n} を基準に、ハーフホールや替え指で{dir}ほうへ {amt} 調整します。楽器の四分音運指表を確認してください。",
    "how.wind.mid": "{n} を吹き、アンブシュアと替え指で {amt} {verb}ます。", "how.wind.small": "{n} を吹き、アンブシュアか息の圧力で {amt} {verb}ます。",
    "how.guitar.up": "{n} を押さえ、軽くチョーキングして {amt} 上げます。",
    "how.guitar.down": "チョーキングは音を上げることしかできません。1 フレット下の {nb} を押さえて {rest} セント上げるか、あらかじめその弦を {r} セント低く調弦して {n} を弾きます。",
    "how.fixed.q": "鍵盤にこの音はありません。{n} と {nb} の中間にあります。どちらかで代用する（色合いは変わります）か、この音を省いて微調整できる楽器に任せます。",
    "how.fixed.mid": "微調整できません。{n} を弾くと目標より {r} セント{side}なり、この次元の色合いがはっきり薄れます。",
    "how.fixed.small": "微調整できません。そのまま {n} を弾きます。目標との差は {r} セントだけです。",

    "legend.title": "記号の意味",
    "legend.html": `<li><b>次元</b>：2 次元 = 3 倍音（完全 5 度）、3 次元 = 5 倍音（長 3 度）、4 次元 = 7 倍音、5 次元 = 11 倍音。骨格は常に 2 次元で、もう一方の次元が色合いを担います。</li>
<li><b>機能式</b>：<code>[O]</code> Ahta = 主、<code>[&gt;]</code> Chyta = 属（5 度上へ 1 歩）、<code>[&lt;]</code> Futa = 下属（下へ 1 歩）、<code>[≫]</code> <code>[≪]</code> は 2 歩。</li>
<li><b>ᴗ（cra）</b>：機能根と客音を保持して和音を「陰」の形に反転します（3 次元では平行短和音）。<b>ɣ（crana）</b>：客音だけを保持して「陽」に戻し、明るく意外な和音を得ます。</li>
<li><b>挟み打ち <code>[&gt;+&lt;]</code></b>：属和音に下属の中心音を加え、主和音を両側から挟みます（3 次元では属七）。</li>
<li><b>ハーモニム</b>：主音から見た各音の座標による音名。Chy = 2 次元上昇、Fu = 2 次元下降、Ly/Su = 3 次元、My/Pu = 4 次元、Zy/Tschu = 5 次元。つなげると掛け算になります（Chyli = 15/8）。</li>
<li><b>安定度</b>：主音を含み、主音が最低音 = 安定。含むが最低音でない = 半安定。含まない = 不安定。</li>
<li><b>小さな格子図</b>：横が 2 次元（右 = 上昇）、縦が客次元（上 = 上昇）。白抜きの枠が主音の位置、塗られたマスがこの和音の音、三角が底音です。</li>`,
    "footer.html": `理論：LΛMPLIGHT 氏のシャサフ式音楽理論（<a href="https://lamplight0.sakura.ne.jp/a/" target="_blank" rel="noopener">公式サイト</a>）。本ページは公開資料に基づく非公式の実装であり、解釈が異なる場合は原作者の説明が優先されます。音源：<a href="https://github.com/Tonejs/Tone.js" target="_blank" rel="noopener">Tone.js</a>（MIT）。<br>作者：<a href="https://github.com/Hikari-Tsai" target="_blank" rel="noopener">Hikari Tsai</a>　·　<a href="https://github.com/Hikari-Tsai/Semitone" target="_blank" rel="noopener">ソースコード</a>（MIT ライセンス）`,

    "help.mode": "和音の「色を決める音」を選びます。\n• 3 次元：普通の長三和音（ド・ミ・ソ）。最もなじみのある響き。\n• 4 次元：ミを第 7 倍音に置き換えます。ブルース的で浮遊感があります。\n• 5 次元：第 11 倍音を使います。ピアノの鍵盤 2 つのちょうど中間にあり、最も「異世界」的です。\n骨格は常に完全 5 度（2 次元）で、色を決める音だけが変わります。",
    "help.len": "進行全体の和音の数です。",
    "help.tonic": "進行全体の「ホーム」となる音です。すべての和音はここを基準に計算されるので、主音を変えると全体が移調されます。",
    "help.tuning": "再生時に各音の正確な音高をどう計算するかです。\n• 純正律：周波数が単純な整数比になり、和音が最も澄みます。理論上の目標です。\n• 41 平均律：オクターブを 41 等分して純正律に近づけたもの。この理論の作者が普段使う調律です。\n• 12 平均律：普通のピアノの調律。比較用です。\n下のカードの説明は、常に純正律（または 41 平均律）を目標にしています。",
    "help.instrument": "演奏する楽器を選びます。カードの「あなたの楽器では」の列に、各音の演奏方法が表示されます。弦楽器なら指を動かす、ギターならチョーキング、ピアノは微調整できない、といった具合です。",
    "help.timbre": "シンセサイザーの音色です。調律の違いをはっきり聞きたいときは「オルガン」を選んでください。ダンス系の音色はデチューンで厚みを出しているため、細かな音程差が隠れます。",
    "help.rhythm": "各和音をその時間内でどう弾くかです。\n• ロングトーン：和音を押さえ続けます。\n• 1 拍ごと／八分音符：規則的に繰り返します。\n• 裏拍：拍と拍の間で弾きます。House でよく使われます。\n• 3-3-2：3 回打つシンコペーションの型（トレシージョ）。",
    "help.drums": "下に敷くドラムマシンのパターンです。音は合成なので、設定した BPM と拍子に自動で追従します。",
    "help.drumVol": "ドラムマシンだけの音量です。和音には影響しません。",
    "help.bpm": "テンポ：1 分あたりの四分音符の数。数字が大きいほど速くなります。120 はおよそ House のテンポです。",
    "help.sigNum": "拍子です。左は 1 小節の拍数、右はどの音符を 1 拍とするか（4 = 四分音符、8 = 八分音符）。たとえば 3/4 はワルツの 3 拍子です。",
    "help.bars": "各和音が続く長さです。かっこ内は現在の BPM と拍子から換算した秒数です。",
    "help.optsLabel": "前の 4 つは、ランダムアルゴリズムが使ってよい和音の種類を決めます（変更後は「生成」を押すと反映されます）。後の 4 つは再生方法で、いつでも切り替えられます。",
    "help.oCra": "和音を「陰」の形に反転することを許可します。3 次元では平行短和音で、たとえば C が Am になります。機能は同じで、色合いが暗くなります。",
    "help.oCrana": "「1 音だけ残して残りを入れ替える」明るい和音を許可します。たとえば C の位置に A メジャーが現れます。一瞬で色が変わったように聞こえます。",
    "help.oPat": "終わりの手前で、属和音と下属の音で主和音を挟む和音を許可します。3 次元では属七（G7）にあたり、主和音へ強く戻りたがります。",
    "help.oFar": "主和音から 2 歩離れた位置（略図の ≪ と ≫）まで進むことを許可します。進行に起伏が増え、不安定さも増します。",
    "help.oArp": "和音の音を同時ではなく、低い音から順に鳴らします。リズムパターンが「ロングトーン」のときだけ有効です。",
    "help.oLoop": "最後まで再生すると自動で最初に戻り、停止を押すまで続きます。",
    "help.oMetro": "1 拍ごとにクリック音が鳴ります。小節の 1 拍目は高い音です。",
    "help.oCount": "再生を押すと、まず 1 小節分のクリックを数えてから最初の和音が始まります。楽器を持って入りやすくなります。",
    "help.gen": "上の設定に従って、新しいコード進行をランダムに生成します。押すたびに変わります。",
    "help.export": "MIDI ファイルをダウンロードします。DAW に読み込めます。\nMIDI のノート番号は 12 平均律しか表せないため、各音の前にピッチベンドを送り、選んだ調律に補正します。ピッチベンドはチャンネル全体に効くので、声部ごとに 1 チャンネル（1〜5）を使い、ドラムは 10 チャンネルです。\n読み込んだら全チャンネルを同じ音色にし、音源のベンドレンジが ±2 半音であることを確認してください。",
    "help.toggleAll": "下の和音カードをまとめて開閉します。",
    "help.reset": "上のすべての設定を最初の初期値に戻し、新しい進行を生成します。\n通常、設定と現在の進行はこのブラウザに自動で保存され、再読み込みしても次回開いても残ります。このボタンを押すとそれらが消去されます。言語の設定は変わりません。",
    "help.timeline": "進行全体の地図です。横が時間、縦が「ホーム」からの距離を表します。中央の破線が主和音 [O]、上が属の方向 [>]、下が下属の方向 [<] です。枠の中は機能式、下は最も近い一般的なコード名です。クリックすると試聴でき、その位置の和音を入れ替える ↻ が現れます。",
    "help.stability": "和音がどれだけ落ち着いて聞こえるかです。主音を含み、主音が最低音＝安定。含むが最低音でない＝半安定。含まない＝不安定で、ほかへ進みたがります。",
    "help.colNote": "主音から見た各音の名前（この理論の音名）です。小さい文字は順に、座標の式、周波数比、41 平均律での何番目の音か、を示します。",
    "help.subs": "これらの和音は同じ「機能類」に属するため、この位置で互いに代用できます。主和音からの距離は同じで、色合いだけが異なります（原形、陰の形 ᴗ、一瞬で色が変わる ɣ）。属の位置では挟み打ち [>+<]（3 次元では属七）にも入れ替えられます。\nクリックすると入れ替わり、試聴できます。見出しの ↻ は順番に切り替えます（先に代理和音、続いてそのほかの合う和音）。入れ替えると進行全体の声部配置が計算し直されます。",
    "help.others": "これらの和音は元の和音と機能が異なりますが、前後の和音とつながるため、ここに置いても自然です。判定は作者の作曲のコツに基づきます：隣の和音と共通音がある、または底音が隣の和音の底音に近い（2 親等以内）。つながりが滑らかなものほど前に並びます。\nこのグループから選ぶと、この部分の進む方向が変わり、略図の折れ線も変わります。",
    "help.colDev": "目標の音が、左のピアノの音より高い（+）か低い（−）かを示します。単位はセントで、100 セント＝半音。緑はほぼ調整不要、橙は微調整が必要、赤は大きく離れています。",
  },
};

const LANGS = { zh: "中文", en: "English", ja: "日本語" };
const HTML_LANG = { zh: "zh-Hant", en: "en", ja: "ja" };

function detectLang() {
  try { const saved = localStorage.getItem("semitone.lang"); if (saved in LANGS) return saved; } catch (e) { /* 無法存取時略過 */ }
  const n = (navigator.language || "").toLowerCase();
  return n.startsWith("ja") ? "ja" : n.startsWith("zh") ? "zh" : "en";
}
let LANG = detectLang();

function t(key, vars) {
  let s = I18N[LANG][key] ?? I18N.zh[key] ?? key;
  if (vars) for (const k in vars) s = s.replaceAll(`{${k}}`, vars[k]);
  return s;
}

// 把頁面上標了 data-i18n* 的靜態元素換成目前語言
function applyStaticText() {
  document.documentElement.lang = HTML_LANG[LANG];
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach((e) => { e.textContent = t(e.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((e) => { e.innerHTML = t(e.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-label]").forEach((e) => { e.label = t(e.dataset.i18nLabel); });
  document.querySelectorAll("[data-i18n-ph]").forEach((e) => { e.placeholder = t(e.dataset.i18nPh); });
  document.querySelectorAll("[data-i18n-aria]").forEach((e) => { e.setAttribute("aria-label", t(e.dataset.i18nAria)); });
}
function setLang(lang) {
  if (!(lang in LANGS)) return;
  LANG = lang;
  try { localStorage.setItem("semitone.lang", lang); } catch (e) { /* 無法存取時略過 */ }
}
