import React from 'react';
import {
  Zap,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  Award,
} from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const MissionsPage = () => {
  const { missions, claimMission } = useGamification();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black font-display text-skin-text flex items-center gap-2">
          <Zap className="w-8 h-8 text-amber-400" />
          Daily Missions & Quests
        </h1>
        <p className="text-xs text-skin-text-muted">
          Complete daily bite-sized coding tasks to preserve your learning streak and earn bonus XP.
        </p>
      </div>

      {/* Countdown Card */}
      <Card className="flex items-center justify-between p-4 bg-skin-surface border border-skin-border">
        <div className="flex items-center gap-2 text-xs text-skin-text-muted">
          <Clock className="w-4 h-4 text-skin-primary" />
          <span>Missions refresh automatically in <strong>12 hours, 45 minutes</strong>.</span>
        </div>
        <Badge variant="streak">🔥 Streak Shield Active</Badge>
      </Card>

      {/* Missions List */}
      <div className="space-y-4">
        {missions.map(mission => (
          <Card key={mission.missionId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-skin-text">{mission.title}</h3>
                <Badge variant="xp" size="sm">+{mission.xpReward} XP</Badge>
              </div>
              <p className="text-xs text-skin-text-muted">{mission.description}</p>
              <p className="text-[11px] text-skin-text-dim">
                Status: {mission.completed ? 'Ready to claim' : '0/1 in progress'}
              </p>
            </div>

            <div>
              {mission.claimed ? (
                <span className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-theme text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Claimed
                </span>
              ) : mission.completed ? (
                <Button
                  size="md"
                  variant="primary"
                  icon={Sparkles}
                  glow
                  onClick={() => claimMission(mission.missionId)}
                >
                  Claim +{mission.xpReward} XP
                </Button>
              ) : (
                <Button size="md" variant="secondary" disabled>
                  In Progress
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
