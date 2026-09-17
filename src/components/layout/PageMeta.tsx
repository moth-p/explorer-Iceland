const DEFAULT_TITLE = 'Explorer | Iceland Tour Booking';
const DEFAULT_DESCRIPTION =
  'Small-group outdoor adventures in Iceland: hiking, sightseeing and outdoor sports tours with local guides.';

/**
 * 用來取代 Next 的 `export const metadata`。
 *
 * React 19 會把 <title> 和 <meta> 從渲染的位置提升到 <head> 裡，並在
 * unmount 時移除它們 -- 但它「不會」去重，而 document.title 是文件裡
 * 「第一個」title 元素。所以：每個路由只 render 一個 PageMeta，
 * RootLayout 裡不放，並且讓 index.html 完全不要有 <title>。
 *
 * `title` 只是頁面的區段名稱；以前放在 root layout 的 metadata export
 * 裡的 '%s | Explorer' 樣板，現在放在這裡。
 */
export function PageMeta({ title, description }: { title?: string; description?: string }) {
  return (
    <>
      <title>{title ? `${title} | Explorer` : DEFAULT_TITLE}</title>
      <meta name="description" content={description ?? DEFAULT_DESCRIPTION} />
    </>
  );
}
