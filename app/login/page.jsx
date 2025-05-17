import LoginForm from '@/components/auth/login-form';

export const metadata = {
  title: 'Login - Unextep',
  description: 'Sign in to your Unextep account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container">
          <a href="/" className="font-bold text-xl">unextep</a>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>
      
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Unextep. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 