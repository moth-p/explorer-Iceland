import { toast } from 'sonner';

/**
 * 訂購表單會觸發的兩種通知。
 *
 * 這些以前是 SweetAlert2 的 modal，透過一個絕對不能 reject 的
 * fireAlert() helper 延遲載入 -- 因為一個 chunk 載入失敗的 alert，
 * 絕對不能因此跳過驗證守衛裡的 `return`。這個特性現在是結構性的，
 * 而不是靠自律維持：toast() 是同步的、已經打包進來了，也沒有失敗的
 * 路徑，所以沒有什麼需要 await，也沒有什麼需要吞掉。
 *
 * 這兩個都是通知，不是決定，這也是為什麼它們都不需要阻塞。
 * 一個破壞性的確認動作（例如「清空購物車？」）才需要用 AlertDialog。
 */
export function warningAlert(title: string): void {
  toast.warning(title);
}

export function successAlert(title: string): void {
  toast.success(title, { duration: 3000 });
}
