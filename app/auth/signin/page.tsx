import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { SignInForm } from '@/components/SignInForm';

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sign in to track your workouts
        </p>
      </div>

      <SignInForm />
    </div>
  );
}
