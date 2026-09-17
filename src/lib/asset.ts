/**
 * 幫一個 root-absolute 的 public/ 路徑加上部署用的 base prefix。
 *
 * import.meta.env.BASE_URL 就是 Vite 的 `base` 原封不動的值：在
 * dev 環境是 '/'，在 Pages 的 build 裡是 '/explorer-Iceland/'。
 * 它「永遠」以 '/' 結尾，而儲存的路徑「永遠」以 '/' 開頭。天真地把
 * 兩者串在一起會得到 '//img/x.png' -- 一個 protocol-relative 的
 * URL，瀏覽器會把它解析成 http://img/x.png，導致網站上每張圖片和
 * 影片都載入失敗。這就是為什麼要去掉開頭的斜線；不要把它「簡化」掉。
 *
 *   asset('/img/logo.png')  ->  在 production 是 '/explorer-Iceland/img/logo.png'
 *                           ->  在 dev 是 '/img/logo.png'
 *
 * Vite 會自己把 `base` 套用到它能解析的任何東西 -- module import、
 * 帶 hash 的 asset、CSS 裡的 url() -- 所以這個 helper 只是給 bundler
 * 看不到的路徑用的：單純的 <img>/<video> src 之類的。React Router 的
 * <Link> 會自己套用 router 的 basename，所以絕對不要把 `to` 包在這個
 * helper 裡。
 *
 * 儲存的資料（product 紀錄、cart 項目）要保持在「沒有 prefix」的路徑上，
 * 在 render 時再呼叫 asset()，這樣持久化的值才能在不同部署之間保持可攜。
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
