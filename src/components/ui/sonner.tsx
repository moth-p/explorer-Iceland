import { CircleCheckIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

/**
 * The shadcn Sonner wrapper, with two changes to the generated file.
 *
 * It no longer reads next-themes: this site has exactly one theme, and pulling
 * a theme provider in to answer a question with a constant answer is not worth
 * a dependency.
 *
 * Only the two icons the app actually uses are declared, in the colours the
 * SweetAlert2 dialogs they replace used (#F77171 warning, #2CD4BF success).
 * SweetAlert2 needed a didRender hook to resize its icon; this is declarative.
 *
 * Positioned top-center rather than a corner, because it replaces a centred
 * modal and this keeps the message in the same line of sight.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="light"
    position="top-center"
    duration={4000}
    // Clears the 64px fixed nav, which top-center would otherwise sit on top of.
    offset={{ top: '80px' }}
    className="toaster group"
    icons={{
      success: <CircleCheckIcon className="size-5" style={{ color: '#2CD4BF' }} />,
      warning: <TriangleAlertIcon className="size-5" style={{ color: '#F77171' }} />,
    }}
    toastOptions={{
      classNames: {
        toast: 'font-sans shadow-lg',
        title: 'text-[15px] text-gray-800',
      },
    }}
    style={
      {
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
        '--border-radius': 'var(--radius)',
        '--width': '400px',
      } as React.CSSProperties
    }
    {...props}
  />
);

export { Toaster };
