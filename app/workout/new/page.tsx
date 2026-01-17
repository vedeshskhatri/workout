import { QuickWorkoutForm } from '@/components/QuickWorkoutForm';
import { getCurrentPlan } from '@/lib/workout-plan';

export default async function NewWorkoutPage() {
  const suggestedPlan = getCurrentPlan();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <QuickWorkoutForm suggestedPlan={suggestedPlan} />
    </div>
  );
}
