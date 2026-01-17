import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { RegisterForm } from '@/components/RegisterForm';

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Start tracking your fitness journey
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
