import React from 'react';

export const ProgressBar = ({
  progress = 0,
  max = 100,
  showLabel = true,
  height = 'h-2.5',
  color = 'bg-skin-primary',
  className = '',
  labelPrefix = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((progress / max) * 100)));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1.5 text-skin-text-muted">
          <span>{labelPrefix || 'Progress'}</span>
          <span className="font-semibold text-skin-text">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-skin-card-hover rounded-full overflow-hidden ${height}`}>
        <div
          className={`${color} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
