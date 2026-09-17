import { toast } from 'sonner';

/**
 * The two notifications the booking form raises.
 *
 * These were SweetAlert2 modals, lazily imported behind a fireAlert() helper
 * that could never reject -- because an alert whose chunk failed to load must
 * not be able to skip the `return` in a validation guard. That property is now
 * structural rather than a discipline: toast() is synchronous, bundled, and has
 * no failure path, so there is nothing to await and nothing to swallow.
 *
 * Both are acknowledgements, not decisions, which is why neither needs to block.
 * A destructive confirmation ("Clear cart?") would warrant an AlertDialog.
 */
export function warningAlert(title: string): void {
  toast.warning(title);
}

export function successAlert(title: string): void {
  toast.success(title, { duration: 3000 });
}
