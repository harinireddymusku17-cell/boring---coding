import React from 'react';
import { Sparkles, Zap, Flame, Shield, Award } from 'lucide-react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon = null,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  const variantClasses = {
    default: 'bg-skin-surface border border-skin-border text-skin-text',
    primary: 'bg-skin-primary/15 text-skin-primary border border-skin-primary/30',
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30',
    xp: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30',
    streak: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30',
    // Rarities
    Common: 'bg-slate-500/15 text-slate-400 border border-slate-500/30',
    Rare: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    Epic: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    Legendary: 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/20',
  };

  const getIcon = () => {
    if (icon) return icon;
    if (variant === 'xp') return <Sparkles className="w-3 h-3 text-purple-400" />;
    if (variant === 'streak') return <Flame className="w-3 h-3 text-orange-500" />;
    if (variant === 'Legendary') return <Award className="w-3 h-3 text-amber-400" />;
    return null;
  };

  return (
    <span
      className={`inline-flex items-center rounded-full select-none ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.default} ${className}`}
    >
      {getIcon()}
      {children}
    </span>
  );
};
