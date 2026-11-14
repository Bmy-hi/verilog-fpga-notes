# CLAUDE.md — Verilog / FPGA 筆記站

這份文件是這個專案的「員工手冊」。AI（Claude / 其他 coding agent）**每次開工前先完整讀完本檔**，並照下面的規則做；開工後再讀 `log.md` 了解上次做到哪裡。

## 0. 交辦三件事（快速版）

| | 內容 |
|---|---|
| **要什麼成品** | `notes/` 底下一個新的 HTML 筆記頁（照 `_template.html`），並登記到 `notes.json`，首頁會自動出現 |
| **有什麼限制** | 只能動 `notes/`、`notes.json`、`log.md`、`ideas/`；不能改 `assets/`、`index.html` 和本檔（除非我明確要求）；不能刪除或重新編號既有筆記 |
| **怎麼算做完** | 第 8 節檢查清單全部打勾，並在 `log.md` 寫一行紀錄；回報時列出新增/修改了哪些檔案 |

不清楚的地方**先問，不要猜**；要選下一篇寫什麼，就從 `ideas/backlog.md` 最上面挑。

---

## 1. 專案目的

- 把「數位系統設計（Verilog / FPGA）」課程中常用的觀念整理成**一個概念一頁**的靜態筆記網站。
- 讀者：修數位系統設計、第一次寫 Verilog 的大二學生。
- 每一頁要回答三個問題：**這是什麼？程式怎麼寫？合成之後變成什麼硬體？**
- 網站用 GitHub Pages 公開，純靜態（HTML + CSS + 少量 JS），**不使用任何 build 工具或框架**。

## 2. 檔案結構

```
/
├── CLAUDE.md            ← 本檔：AI 的專案規則
├── AGENTS.md            ← 指向本檔（給非 Claude 的 agent）
├── README.md            ← 給人看的簡介
├── log.md               ← 工作紀錄：每次完成任務追加一行
├── ideas/
│   └── backlog.md       ← 待寫筆記清單（下一篇從這裡挑）
├── index.html           ← 首頁：依 notes.json 自動列出所有筆記
├── notes.json           ← 筆記清單（唯一的目錄來源）
├── assets/
│   ├── style.css        ← 全站唯一的樣式表
│   └── site.js          ← 首頁清單 + 筆記頁的上一篇/下一篇導覽
└── notes/
    ├── _template.html   ← 新筆記的範本（複製它，不要從零寫）
    ├── 01-xxx.html
    └── 02-xxx.html …
```

## 3. 命名與放置規則

- 筆記檔放在 `notes/`，檔名格式：`NN-kebab-case-英文.html`
  - `NN` 為兩位數流水號（01, 02, …），代表建議閱讀順序。
  - 例：`04-testbench-basics.html`
- 檔名只用小寫英文、數字、`-`。不要用中文或空白。
- 圖片（若有）放 `assets/img/NN-描述.svg`，優先使用 SVG 或 ASCII 圖，不放大型 PNG。

## 4. 新增一篇筆記的標準流程（必做 5 步）

0. **先給計畫**：動手前，先用 3–5 行列出這篇的標題、分類、程式碼範例要寫什麼，等我說「可以」再做。
1. **複製** `notes/_template.html` → `notes/NN-slug.html`。
2. **填內容**：依第 5 節的固定段落順序填寫，不要刪段落、不要改段落順序。
3. **登記**：在 `notes.json` 陣列**尾端**加入一筆：
   ```json
   { "id": "NN", "slug": "NN-slug", "title": "中文標題", "tag": "分類", "summary": "一句話摘要（30 字內）" }
   ```
   `tag` 只能用：`基礎語法`、`組合邏輯`、`循序邏輯`、`狀態機`、`驗證`、`FPGA 實作`。
4. **檢查**：執行第 8 節的檢查清單。
5. **記錄**：在 `log.md` 尾端追加 `- YYYY-MM-DD 新增 #NN 標題`，並把 `ideas/backlog.md` 中對應的項目打勾。

> 首頁與上一篇/下一篇導覽都由 `notes.json` 自動產生，**不要**手動在 `index.html` 或筆記頁加連結。

## 5. 每篇筆記的固定段落（順序不可變）

| 段落 `<section id>` | 標題 | 內容要求 |
|---|---|---|
| `concept` | 💡 概念 | 3–6 句話講清楚觀念，第一次出現的術語加粗並附英文 |
| `code` | 🧩 程式碼 | 至少 1 段**可合成**的 Verilog-2001 範例，用 `<pre><code class="verilog">` |
| `hardware` | 🔌 合成後的硬體 | 說明合成出來是什麼電路（MUX、DFF、latch…），可用 ASCII 圖 |
| `pitfalls` | ⚠️ 常見錯誤 | 2–4 點，每點附「錯誤寫法 → 正確寫法」 |
| `summary` | ✅ 重點整理 | 3–5 個條列，每條一句話 |

每頁 `<head>` 必須包含：
```html
<meta name="note-id" content="NN">
<link rel="stylesheet" href="../assets/style.css">
<script src="../assets/site.js" defer></script>
```

## 6. 寫作風格

- 語言：**繁體中文**，專有名詞保留英文（例：blocking assignment、latch）。
- 語氣：像學長姐寫給學弟妹的筆記——精準、直接，不寫空泛的開場白。
- Verilog 範例：
  - 使用 Verilog-2001（`module m (input wire a, …);` ANSI 風格 port）。
  - 時脈一律叫 `clk`、非同步低態重置叫 `rst_n`。
  - 循序邏輯用 `always @(posedge clk or negedge rst_n)` + `<=`；組合邏輯用 `always @(*)` + `=`。
  - 縮排 4 個空白。範例需能在 Vivado / Quartus 直接合成。
- HTML 內的 `<`、`>`、`&` 在程式碼區塊中必須跳脫成 `&lt;` `&gt;` `&amp;`。

## 7. 視覺風格（不可擅自更改）

- 所有樣式只寫在 `assets/style.css`，**筆記頁不得出現 `<style>` 或 inline style**。
- 配色：深藍底色標題列 `--brand: #1f3a5f`、強調色 `--accent: #f2a541`、程式碼區塊深色背景。
- 可用的 CSS class（只能用這些，若需要新 class 先加到 style.css 並在此列表登記）：
  - `.callout`（提示框）、`.callout.warn`（警告框）
  - `.bad` / `.good`（錯誤 vs 正確寫法的程式碼框）
  - `.tag`（分類標籤）
  - `.ascii`（ASCII 電路圖）

## 8. 完成前檢查清單

- [ ] 檔名符合 `NN-slug.html`，且 `notes.json` 的 `slug` 一致
- [ ] `<meta name="note-id">` 與 `notes.json` 的 `id` 一致
- [ ] 5 個 section 都在、順序正確
- [ ] 程式碼中的 `<`、`>` 已跳脫
- [ ] `notes.json` 是合法 JSON（沒有多餘逗號）
- [ ] Verilog 範例能通過編譯（例：`iverilog -o /dev/null file.v`）；FSM 等有行為的範例最好附簡單 testbench 跑過
- [ ] 本機用 `python3 -m http.server` 打開首頁，新筆記有出現、上一篇/下一篇正常
- [ ] `log.md` 已追加紀錄

## 9. AI 不可以做的事

- 不可引入 npm、React、Tailwind 或任何 build 流程。
- 不可刪除或重新編號既有筆記（會讓外部連結失效）；要修正就直接改內容。
- 不可修改本檔的規則，除非使用者明確要求；若規則需要調整，先提出建議。
