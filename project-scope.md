# 產品範圍 — Explorer Iceland

> 這個產品是什麼、服務誰、邊界在哪裡。
> 技術選型見 [tech-stack.md](./tech-stack.md)。

## 目的

**Explorer** 是一個冰島小團體戶外探索行程的預訂網站。
它陳列三個分類、共 12 條導覽行程，讓訪客挑出發日期與團體人數，
再把選擇收進購物車並即時累計金額。

這是一個 **portfolio／前端專案**。沒有後端：所有東西都跑在瀏覽器裡，
購物車存在 `localStorage`。評價它的標準應該是「一個忠實、響應式、可近用的店面」，
而不是「一套能成交的電商系統」。

**受眾：** 用手機、平板或桌機瀏覽冰島行程的英語系旅客。
網站內容全程英文；專案文件（`*.md`）使用繁體中文，README 為中英雙語。

## 頁面

| Route | 用途 |
|---|---|
| `/` | 首頁。Hero、三段隨捲動揭示的風景區塊（Vestrahorn、Klausturhólar、Vík）、一條循環的「Iceland」marquee、兩個特色區塊（"We Provide"／"You Can Find"），以及一段帶 *Start a Journey* CTA 的影片區。 |
| `/about` | 公司定位、標語與聯絡資訊（email、電話），鋪在滿版 banner 上。 |
| `/shop` | 行程總覽。自動播放的 banner carousel、12 條行程的響應式 grid（2／3／4 欄），以及一條分頁列。 |
| `/shop/[id]` | 行程詳情。相簿、價格、評分、描述，以及訂購表單（日期 + 團體人數 → 加入購物車）。可展開的 *About the Tour*／*Before You Go*／*Rules* 區塊。 |
| `/login` | 購物車檢視與結帳摘要，外加一個登入表單。 |

每一頁共用同一套 chrome：固定 navbar、行動版 hamburger menu、cart drawer、
back-to-top 按鈕，以及 footer。

## 訂購流程

```
/shop  →  /shop/[id]  →  挑日期 + 團體人數  →  Add to cart
                                                      ↓
                                            cart drawer（任一頁）
                                                      ↓
                                                   /login
```

## 商業規則

這些規則由 UI 強制執行，是從原始實作裡抽出來的。
它們就是必須保留的行為。

| 規則 | 值 | 出處 |
|---|---|---|
| 稅率 | 對小計加 **3%** | `src/js/cart.js` `updateTotal()` |
| 最早可訂日期 | **今天 + 14 天** | `product-detail.html` `getStartDay()` |
| 日期顯示格式 | `F j, Y`（例：*January 3, 2026*）；儲存為 `Y-m-d` | Flatpickr `dateFormat` + `toISODate()` |
| 團體人數 | 必填、`> 0`，且**不得超過該行程的 `maxGroupSize`** | add-to-cart 驗證 |
| 單筆金額 | `unitPrice × groupSize` | add-to-cart handler |
| 同一行程同一天只能訂一次 | 已在購物車裡的日期會在 picker 中被停用 | `disabledDates` |
| 幣別 | EUR（€），僅供顯示 | 產品資料 |

驗證失敗與成功都以 SweetAlert2 modal 呈現。

## 12 條行程

| # | 行程 | 分類 | 區域 | € | 人數上限 |
|---|---|---|---|---|---|
| 1 | Laugavegur Trail | Hiking | South | 100 | 12 |
| 2 | Hornstrandir Nature Reserve | Hiking | West | 20 | 8 |
| 3 | Skaftafell Glacier Hikes | Hiking | South | 18 | 12 |
| 4 | Ásbyrgi Canyon Hike | Hiking | North | 18 | 10 |
| 5 | Jökulsárlón Glacier Lagoon Boat Tour | Sightseeing | South | 28 | 10 |
| 6 | Mývatn Geothermal Tour | Sightseeing | North | 18 | 12 |
| 7 | Snæfellsnes Coastal Ecology Walk | Sightseeing | West | 15 | 12 |
| 8 | Golden Circle Tour | Sightseeing | Southwest | 18 | 15 |
| 9 | Dalvík Snowboarding | Outdoor Sports | North | 18 | 10 |
| 10 | Westfjords Kayaking | Outdoor Sports | North | 12 | 12 |
| 11 | Eldhestar Horseback Riding | Outdoor Sports | West | 20 | 10 |
| 12 | Vestmannaeyjar Puffins Viewing | Outdoor Sports | South | 8 | 12 |

**category 是明確存在每筆行程上的欄位。** 它無法從 id 推導：原本每個 id 都以 `hiking-` 開頭，
連 sightseeing 與 outdoor-sports 的行程也是。上表的分組來自 shop 的 flyout menu，
那才是權威來源。

每條行程還帶著：一個簡短的區域標籤、一段長描述、一段 *About the Tour* 敘述、行程天數、
每日活動時數、出發時間、集合地點、需提早多久抵達、一份 *Before You Go* 檢查清單，
以及一組規則。

## 不在範圍內

刻意**不**做，也沒有計畫要做：

- **沒有後端、資料庫或 API。** 行程資料是編譯進網站的具型別常數。
- **沒有真正的身分驗證。** `/login` 表單只驗證輸入就結束；沒有帳號、session 或密碼儲存。
- **沒有付款或結帳完成。** 購物車算完總額就到此為止。
- **沒有伺服器端庫存。** 人數上限與已訂日期只依購物車內容、在各自的瀏覽器裡把關；
  兩個訪客不會衝突，因為沒有任何東西是共享的。
- **沒有國際化。** 只有英文，網站沒有接 locale 切換。
- **沒有搜尋。** 原本的 navbar 有一個從來不會查任何東西的搜尋框；與其留一個沒有作用的控制項，
  不如直接移除。
- **沒有分析、cookie 或追蹤。**

## 已知限制

- **購物車是每個瀏覽器、每台裝置各自獨立的。** 存在本站 origin 下的 `localStorage`；
  清掉網站資料購物車就空了。不會同步。
- **搬遷前的站存下的購物車會在第一次造訪時被丟棄。** 舊格式是一個裸陣列，圖片路徑指向
  `./src/img/…`，現在已經解析不到。與其 render 出破圖，不如在偵測到舊格式時清掉，
  讓訪客從空的購物車開始。這只會發生一次。
- **分頁是裝飾性的。** `/shop` 上的分頁列會 render 頁碼，但 12 條行程本來就一次全部顯示，
  連結也不會導航。這是從原始設計保留下來的。
- **flyout 與 footer 的分類連結沒有接上。** Booking flyout 的子項目與 footer 的分類欄位會
  render，但不會過濾。資料層支援得了（`getProductsByCategory`），routing 還沒。
- **flyout 漏了一條行程。** *Vestmannaeyjar Puffins Viewing* 沒有出現在 Outdoor Sports 欄，
  那一欄只列了四條中的三條。忠實還原原始設計。
- **評分是靜態的。** 詳情頁的五星顯示是裝飾性的 markup。
