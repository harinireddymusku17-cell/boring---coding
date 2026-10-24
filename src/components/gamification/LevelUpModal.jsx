import React from 'react';
import { Award, Zap, Sparkles, ChevronRight } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';
import { Button } from '../ui/Button';

export const LevelUpModal = () => {
  const { levelUpData, closeLevelUpModal } = useGamification();

  if (!levelUpData.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={closeLevelUpModal} />

      <div className="relative z-10 w-full max-w-md bg-skin-card border-2 border-skin-primary rounded-theme p-8 text-center shadow-theme-lg animate-in zoom-in-90 duration-300">
        {/* Glow halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-skin-primary/30 rounded-full blur-xl pointer-events-none" />

        <div className="w-20 h-20 mx-auto mb-4 bg-skin-primary/20 border-2 border-skin-primary rounded-2xl flex items-center justify-center shadow-theme-glow animate-bounce">
          <Award className="w-10 h-10 text-skin-primary" />
        </div>

        <span className="inline-block px-3 py-1 bg-skin-primary/20 text-skin-primary rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          Level Up!
        </span>

        <h2 className="text-3xl font-extrabold font-display text-skin-text mb-2">
          Rank Promoted!
        </h2>

        <p className="text-skin-text-muted text-sm mb-6">
          Outstanding work! Your dedication pushed you past Level {levelUpData.oldLevel}. You have advanced to{' '}
          <strong className="text-skin-primary">Level {levelUpData.newLevel}</strong>.
        </p>

        <div className="bg-skin-surface border border-skin-border rounded-theme p-4 mb-6 flex justify-around items-center">
          <div>
            <p className="text-xs text-skin-text-muted">Previous Rank</p>
            <p className="text-lg font-bold text-skin-text-muted">Lvl {levelUpData.oldLevel}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-skin-primary animate-pulse" />
          <div>
            <p className="text-xs text-skin-primary font-semibold">New Rank</p>
            <p className="text-2xl font-black text-skin-primary">Lvl {levelUpData.newLevel}</p>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={closeLevelUpModal}
          icon={Sparkles}
        >
          Claim Glory & Continue
        </Button>
      </div>
    </div>
  );
};
