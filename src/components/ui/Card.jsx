import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  onClick,
  ...props
}) => {
  const hoverClasses = hoverEffect
    ? 'hover:-translate-y-1 hover:shadow-theme-md hover:border-skin-primary transition-all duration-200 cursor-pointer'
    : '';

  const glowClasses = glow ? 'shadow-theme-glow border-skin-primary' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-skin-card border border-skin-border rounded-theme p-5 text-skin-text shadow-theme-sm transition-colors duration-200 ${hoverClasses} ${glowClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
