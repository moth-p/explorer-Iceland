import { MessagePage } from '@/components/layout/MessagePage';
import { PageMeta } from '@/components/layout/PageMeta';

/**
 * 給未知 URL 渲染的頁面，也會被 ProductDetail 用在任何不屬於這 12 個
 * 行程之一的 /shop/:id 上 -- 這正是 Next 的 `dynamicParams = false`
 * 做的事。
 *
 * 在 GitHub Pages 上，server 對這些 URL 仍然會回應真正的 HTTP
 * 404；部署流程會把 index.html 複製成 404.html，這樣 SPA 才能啟動
 * 並導向這裡。
 */
export function NotFound() {
  return (
    <>
      <PageMeta title="Page not found" />
      <MessagePage code="404" title="We couldn&rsquo;t find that page">
        The page you are looking for may have moved, or the tour link may be out of date.
      </MessagePage>
    </>
  );
}
