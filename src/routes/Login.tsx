import { LoginForm } from '@/components/auth/LoginForm';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageMeta } from '@/components/layout/PageMeta';

export function Login() {
  return (
    <>
      <PageMeta
        title="Log in"
        description="Sign in to your Explorer account to review your booked tours."
      />
      <main className="animate__animated animate__fadeIn">
        <div className="mt-10 flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <LoginForm />
        </div>
      </main>

      <br />
      <br />
      <br />
      <hr />

      <SiteFooter />
    </>
  );
}
