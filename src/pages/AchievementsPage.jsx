import React from 'react';
import {
  Award,
  Sparkles,
  Trophy,
  CheckCircle2,
  Lock,
  Flame,
  Globe,
  Palette,
  Crown,
} from 'lucide-react';
import { initialAchievements } from '../data/seedData';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const AchievementsPage = () => {
  const { user } = useAuth();
  const { claimAchievement } = useGamification();

  const unlockedList = user?.unlockedAchievements || ['first_byte', 'streak_flame_3'];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Flame': return Flame;
      case 'Palette': return Palette;
      case 'Globe': return Globe;
      case 'Crown': return Crown;
      case 'Sparkles': return Sparkles;
      default: return Award;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black font-display text-skin-text flex items-center gap-2">
          <Trophy className="w-8 h-8 text-amber-400" />
          Achievement Vault
        </h1>
        <p className="text-xs text-skin-text-muted">
          Earn rare badges and XP boosts by completing challenging programming milestones.
        </p>
      </div>

      {/* Progress banner */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-skin-surface border border-skin-border">
        <div>
          <h3 className="font-bold text-sm text-skin-text">Vault Unlocked Progress</h3>
          <p className="text-xs text-skin-text-muted">
            You've unlocked <strong>{unlockedList.length}</strong> of <strong>{initialAchievements.length}</strong> available trophies.
          </p>
        </div>
        <Badge variant="xp" size="lg">
          +{unlockedList.length * 200} XP Earned From Badges
        </Badge>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialAchievements.map(ach => {
          const isUnlocked = unlockedList.includes(ach.achievementId);
          const Icon = getIcon(ach.icon);

          return (
            <Card
              key={ach.achievementId}
              className={`flex flex-col justify-between transition-all duration-200 ${
                isUnlocked
                  ? 'border-skin-primary shadow-theme-sm'
                  : 'border-skin-border opacity-70 bg-skin-surface/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    isUnlocked
                      ? 'bg-skin-primary/15 border-skin-primary text-skin-primary'
                      : 'bg-skin-card border-skin-border text-skin-text-dim'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <Badge variant={ach.rarity} size="sm">
                    {ach.rarity}
                  </Badge>
                </div>

                <h3 className="font-bold text-base text-skin-text mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-skin-text-muted leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-skin-border flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> +{ach.xpReward} XP
                </span>

                {isUnlocked ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Unlocked
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => claimAchievement(ach.achievementId)}
                  >
                    Unlock / Claim
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
