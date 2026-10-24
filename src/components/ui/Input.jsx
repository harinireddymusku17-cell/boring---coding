import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-skin-text-muted">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-skin-text-muted">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-skin-surface border ${error ? 'border-skin-danger focus:ring-skin-danger' : 'border-skin-border focus:border-skin-primary'} rounded-theme py-2.5 ${Icon ? 'pl-10' : 'pl-3.5'} pr-3.5 text-sm text-skin-text placeholder:text-skin-text-dim focus:outline-none focus:ring-1 transition-all ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-skin-danger font-medium">{error}</p>}
    </div>
  );
};
