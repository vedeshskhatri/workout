'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          experienceLevel: formData.experienceLevel,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/auth/signin?registered=true');
    } catch (error: any) {
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
            minLength={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            required
            minLength={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Experience Level</label>
          <select
            value={formData.experienceLevel}
            onChange={(e) =>
              setFormData({ ...formData, experienceLevel: e.target.value as any })
            }
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="beginner">Beginner (Less than 6 months)</option>
            <option value="intermediate">Intermediate (6 months - 2 years)</option>
            <option value="advanced">Advanced (2+ years)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            This helps us calculate optimal recovery times for you
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-primary hover:underline font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
}
