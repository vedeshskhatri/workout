import { PlanType } from '@/types';
import { getISOWeek, startOfISOWeek, addDays } from 'date-fns';

/**
 * Determines which workout plan (A or B) should be active for a given date
 * Week 1 → A, Week 2 → B, Week 3 → A, etc.
 */
export function getCurrentPlan(date: Date = new Date()): PlanType {
  const weekNumber = getISOWeek(date);
  return weekNumber % 2 === 1 ? 'A' : 'B';
}

/**
 * Gets the start date of the current ISO week
 */
export function getCurrentWeekStart(date: Date = new Date()): Date {
  return startOfISOWeek(date);
}

/**
 * Gets the next week's plan
 */
export function getNextWeekPlan(currentPlan: PlanType): PlanType {
  return currentPlan === 'A' ? 'B' : 'A';
}

/**
 * Calculates the date for the next week's Monday
 */
export function getNextWeekStart(date: Date = new Date()): Date {
  const currentWeekStart = startOfISOWeek(date);
  return addDays(currentWeekStart, 7);
}
