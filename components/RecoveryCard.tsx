'use client';

import { RecoveryEstimate } from '@/types';
import { MUSCLE_GROUP_LABELS } from '@/lib/constants';
import { isReadyToTrain, getHoursUntilReady } from '@/lib/recovery-estimation';
import { format, formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Clock, Flame } from 'lucide-react';

interface RecoveryCardProps {
  estimate: RecoveryEstimate;
}

export function RecoveryCard({ estimate }: RecoveryCardProps) {
  const ready = isReadyToTrain(estimate);
  const hoursUntil = getHoursUntilReady(estimate);
  const daysUntil = Math.ceil(hoursUntil / 24);

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        ready
          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
          : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">
            {MUSCLE_GROUP_LABELS[estimate.muscleGroup] || estimate.muscleGroup}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Last trained: {formatDistanceToNow(estimate.lastTrainedDate, { addSuffix: true })}
          </p>
        </div>
        {ready ? (
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
        ) : (
          <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        )}
      </div>

      {ready ? (
        <div className="mb-3">
          <p className="text-sm font-semibold text-green-700 dark:text-green-300">
            ✅ Ready to train!
          </p>
        </div>
      ) : (
        <div className="mb-3">
          <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">
            🕐 Recovery in progress
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Recommended training: {format(estimate.recommendedNextTraining, 'MMM dd, yyyy')}
            {' '}({daysUntil} {daysUntil === 1 ? 'day' : 'days'})
          </p>
        </div>
      )}

      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <Flame className="w-3 h-3" />
          <span>RPE: {estimate.factors.rpe}/10</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Sets:</span>
          <span>{estimate.factors.totalSets}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Intensity:</span>
          <span className="capitalize">{estimate.factors.intensity}</span>
        </div>
        {estimate.factors.sleepQuality && (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Sleep:</span>
            <span className="capitalize">{estimate.factors.sleepQuality}</span>
          </div>
        )}
      </div>
    </div>
  );
}
