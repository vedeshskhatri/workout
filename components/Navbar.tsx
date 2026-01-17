'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Workout Tracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/workout/new"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/workout/new') 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Log Workout
            </Link>
            <Link
              href="/history"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/history') 
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              History
            </Link>
            <Link
              href="/progress"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/progress') 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Progress
            </Link>
            <Link
              href="/plans"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/plans') 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Plans
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className={`py-2 ${isActive('/') ? 'text-primary font-semibold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/workout/new"
                className={`py-2 ${isActive('/workout/new') ? 'text-primary font-semibold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Log Workout
              </Link>
              <Link
                href="/history"
                className={`py-2 ${isActive('/history') ? 'text-primary font-semibold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                History
              </Link>
              <Link
                href="/progress"
                className={`py-2 ${isActive('/progress') ? 'text-primary font-semibold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Progress
              </Link>
              <Link
                href="/plans"
                className={`py-2 ${isActive('/plans') ? 'text-primary font-semibold' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Plans
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
