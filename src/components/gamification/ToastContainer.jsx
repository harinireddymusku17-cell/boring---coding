import React from 'react';
import { Sparkles, Trophy, CheckCircle, Info } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

export const ToastContainer = () => {
  const { toastNotification } = useGamification();

  if (!toastNotification) return null;

  const getIcon = () => {
    switch (toastNotification.type) {
      case 'xp':
        return <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 bg-skin-card border-2 border-skin-primary text-skin-text px-4 py-3 rounded-theme shadow-theme-lg backdrop-blur-md">
        <div className="p-2 bg-skin-primary/15 rounded-lg shrink-0">{getIcon()}</div>
        <div>
          <p className="text-xs uppercase font-bold tracking-wider text-skin-primary">
            {toastNotification.type === 'xp' ? 'XP Boost' : 'Notification'}
          </p>
          <p className="text-sm font-semibold text-skin-text">{toastNotification.message}</p>
        </div>
      </div>
    </div>
  );
};
