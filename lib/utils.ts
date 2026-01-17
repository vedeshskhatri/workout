import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWeight(weight: number): string {
  return `${weight} kg`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function calculateVolume(sets: { reps: number; weight: number }[]): number {
  return sets.reduce((total, set) => total + (set.reps * set.weight), 0);
}

export function calculate1RM(weight: number, reps: number): number {
  // Epley formula: 1RM = weight × (1 + reps/30)
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}
