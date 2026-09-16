import type { SweetAlertOptions } from 'sweetalert2';

/**
 * Shared SweetAlert2 styling. The original repeated this block verbatim at all
 * three call sites in product-detail.html, including the didRender hook that
 * resizes the icon.
 *
 * SweetAlert2 is imported lazily by the callers (`await import('sweetalert2')`)
 * so its ~40 KB stays out of the initial bundle -- it is only needed after a
 * click.
 */
const BASE: SweetAlertOptions = {
  width: '450px',
  buttonsStyling: false,
  customClass: {
    title: 'text-[20px] font-sans my-3',
    confirmButton:
      'font-sans font-medium w-[80px] h-[40px] rounded-lg bg-subPurple text-lightGray hover:bg-mainYellow hover:text-gray-800 active:opacity-50',
  },
};

/** SweetAlert2 renders its icon at a fixed size; the original shrank it by hand. */
function resizeIcon(selector: string) {
  const icon = document.querySelector<HTMLElement>(selector);
  if (icon) {
    icon.style.fontSize = '10px';
    icon.style.width = '50px';
    icon.style.height = '50px';
  }
}

export function warningAlert(title: string): SweetAlertOptions {
  return {
    ...BASE,
    title,
    icon: 'warning',
    iconColor: '#F77171',
    didRender: () => resizeIcon('.swal2-icon.swal2-warning'),
  };
}

export function successAlert(title: string): SweetAlertOptions {
  return {
    ...BASE,
    title,
    icon: 'success',
    iconColor: '#2CD4BF',
    didRender: () => resizeIcon('.swal2-icon.swal2-success'),
  };
}

/** Lazily load SweetAlert2 and fire one alert. */
export async function fireAlert(options: SweetAlertOptions) {
  const { default: Swal } = await import('sweetalert2');
  return Swal.fire(options);
}
