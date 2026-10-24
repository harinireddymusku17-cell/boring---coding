import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  glow = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-skin-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-theme';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantClasses = {
    primary: 'bg-skin-primary text-skin-primary-text hover:bg-skin-primary-hover shadow-theme-sm active:scale-95',
    secondary: 'bg-skin-surface border border-skin-border text-skin-text hover:bg-skin-card-hover active:scale-95',
    outline: 'border-2 border-skin-primary text-skin-primary hover:bg-skin-primary hover:text-skin-primary-text active:scale-95',
    ghost: 'text-skin-text hover:bg-skin-card-hover active:scale-95',
    danger: 'bg-skin-danger text-white hover:opacity-90 active:scale-95',
    success: 'bg-skin-success text-white hover:opacity-90 active:scale-95',
    xp: 'bg-skin-xp text-white hover:opacity-90 shadow-theme-sm active:scale-95',
  };

  const glowClass = glow ? 'shadow-theme-glow' : '';

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${glowClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
};
