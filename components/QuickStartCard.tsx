'use client';

import Link from 'next/link';
import { PlanType } from '@/types';
import { Dumbbell } from 'lucide-react';

interface QuickStartCardProps {
  currentPlan: PlanType;
}

export function QuickStartCard({ currentPlan }: QuickStartCardProps) {
  const planColor = currentPlan === 'A' ? 'planA' : 'planB';
  const bgGradient = currentPlan === 'A' 
    ? 'from-green-500 to-emerald-600' 
    : 'from-orange-500 to-amber-600';

  return (
    <Link
      href="/workout/new"
      className={`p-6 rounded-lg bg-gradient-to-br ${bgGradient} text-white hover:shadow-lg transition-all cursor-pointer`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Dumbbell className="w-8 h-8" />
        <div>
          <h3 className="text-xl font-bold">Start Today's Workout</h3>
          <p className="text-sm opacity-90">Plan {currentPlan} - Week {currentPlan}</p>
        </div>
      </div>
      <p className="text-sm opacity-90">
        Log your workout and track your progress
      </p>
    </Link>
  );
}
