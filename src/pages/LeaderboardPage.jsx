import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Crown,
  Sparkles,
  Flame,
  ArrowUp,
  Filter,
  Info,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const LeaderboardPage = () => {
  const { user } = useAuth();
  const { currentXP, currentLevel } = useGamification();
  const [timeframe, setTimeframe] = useState('weekly');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const data = await api.getLeaderboard(timeframe);
      setLeaderboard(data);
      setLoading(false);
    };
    fetchLeaderboard();
  }, [timeframe]);

  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-skin-text flex items-center gap-2">
            <Trophy className="w-8 h-8 text-amber-400" />
            Global Student Leaderboard
          </h1>
          <p className="text-xs text-skin-text-muted">
            Compete with students worldwide by solving challenges and completing daily missions.
          </p>
        </div>

        {/* Timeframe Filter Switcher */}
        <div className="flex items-center gap-1 bg-skin-card border border-skin-border p-1 rounded-theme">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 rounded-theme text-xs font-bold transition-all ${
              timeframe === 'weekly'
                ? 'bg-skin-primary text-skin-primary-text'
                : 'text-skin-text-muted hover:text-skin-text'
            }`}
          >
            Weekly Sprint
          </button>
          <button
            onClick={() => setTimeframe('alltime')}
            className={`px-3 py-1.5 rounded-theme text-xs font-bold transition-all ${
              timeframe === 'alltime'
                ? 'bg-skin-primary text-skin-primary-text'
                : 'text-skin-text-muted hover:text-skin-text'
            }`}
          >
            All-Time Legends
          </button>
        </div>
      </div>

      {/* Info notice separating sample data */}
      <div className="flex items-center gap-2 p-3 bg-skin-surface border border-skin-border rounded-theme text-xs text-skin-text-muted">
        <Info className="w-4 h-4 text-skin-primary shrink-0" />
        <span>
          Leaderboard includes historical programming pioneers as demo benchmark students. Registered student profiles update dynamically in real time.
        </span>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Rank 2 (Silver) */}
        {topThree[1] && (
          <Card className="text-center order-2 md:order-1 flex flex-col items-center justify-between p-6 bg-gradient-to-t from-slate-500/10 to-skin-card border-slate-400/30">
            <div className="relative">
              <img
                src={topThree[1].avatar}
                alt={topThree[1].name}
                className="w-16 h-16 rounded-full mx-auto border-2 border-slate-300 p-1 mb-2 bg-skin-surface"
              />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center">
                2
              </span>
            </div>
            <div className="my-3">
              <h3 className="font-bold text-sm text-skin-text">{topThree[1].name}</h3>
              <p className="text-[10px] text-skin-text-muted">{topThree[1].badge}</p>
            </div>
            <div className="w-full pt-3 border-t border-skin-border">
              <span className="text-base font-black text-slate-300 font-display">
                {topThree[1].xp.toLocaleString()} XP
              </span>
            </div>
          </Card>
        )}

        {/* Rank 1 (Gold) */}
        {topThree[0] && (
          <Card glow className="text-center order-1 md:order-2 flex flex-col items-center justify-between p-6 bg-gradient-to-t from-amber-500/20 via-skin-card to-skin-card border-2 border-amber-400 transform md:-translate-y-3">
            <div className="relative">
              <Crown className="w-8 h-8 text-amber-400 mx-auto -mb-1 animate-bounce" />
              <img
                src={topThree[0].avatar}
                alt={topThree[0].name}
                className="w-20 h-20 rounded-full mx-auto border-2 border-amber-400 p-1 mb-2 bg-skin-surface shadow-theme-glow"
              />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center">
                1
              </span>
            </div>
            <div className="my-3">
              <h3 className="font-extrabold text-base text-skin-text">{topThree[0].name}</h3>
              <Badge variant="Legendary" size="sm" className="mt-1">
                {topThree[0].badge}
              </Badge>
            </div>
            <div className="w-full pt-3 border-t border-skin-border">
              <span className="text-xl font-black text-amber-400 font-display">
                {topThree[0].xp.toLocaleString()} XP
              </span>
            </div>
          </Card>
        )}

        {/* Rank 3 (Bronze) */}
        {topThree[2] && (
          <Card className="text-center order-3 md:order-3 flex flex-col items-center justify-between p-6 bg-gradient-to-t from-amber-800/10 to-skin-card border-amber-600/30">
            <div className="relative">
              <img
                src={topThree[2].avatar}
                alt={topThree[2].name}
                className="w-16 h-16 rounded-full mx-auto border-2 border-amber-600 p-1 mb-2 bg-skin-surface"
              />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-600 text-amber-100 font-black text-xs flex items-center justify-center">
                3
              </span>
            </div>
            <div className="my-3">
              <h3 className="font-bold text-sm text-skin-text">{topThree[2].name}</h3>
              <p className="text-[10px] text-skin-text-muted">{topThree[2].badge}</p>
            </div>
            <div className="w-full pt-3 border-t border-skin-border">
              <span className="text-base font-black text-amber-600 font-display">
                {topThree[2].xp.toLocaleString()} XP
              </span>
            </div>
          </Card>
        )}
      </div>

      {/* Current User Standings Card */}
      <Card className="bg-skin-primary/10 border-2 border-skin-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-black text-skin-primary font-display w-8 text-center">#4</span>
          <img
            src={user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex'}
            alt="You"
            className="w-10 h-10 rounded-full bg-skin-card border border-skin-primary"
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm text-skin-text">{user?.name || 'Alex Coder'}</p>
              <Badge variant="primary" size="sm">You</Badge>
            </div>
            <p className="text-[11px] text-skin-text-muted">Level {currentLevel} Scholar • 5 Day Streak</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-base font-black text-skin-primary">{currentXP.toLocaleString()} XP</p>
          <p className="text-[10px] text-emerald-400 flex items-center gap-0.5 justify-end">
            <ArrowUp className="w-3 h-3" /> Top 5% of Students
          </p>
        </div>
      </Card>

      {/* Ranked Table */}
      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-3 bg-skin-surface border-b border-skin-border text-xs font-bold uppercase tracking-wider text-skin-text-muted flex items-center justify-between">
          <span>Student</span>
          <span>Experience Points</span>
        </div>

        <div className="divide-y divide-skin-border">
          {remaining.map(student => (
            <div
              key={student.rank}
              className="px-5 py-3.5 flex items-center justify-between hover:bg-skin-card-hover transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-6 font-bold text-xs text-skin-text-muted text-center">
                  #{student.rank}
                </span>
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-9 h-9 rounded-full bg-skin-surface border border-skin-border"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-skin-text">{student.name}</p>
                    {student.isSample && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-skin-surface text-skin-text-dim border border-skin-border">
                        Sample
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-skin-text-muted">
                    Lvl {student.level} • {student.badge}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-sm text-skin-text font-display">
                  {student.xp.toLocaleString()} XP
                </span>
                <div className="flex items-center gap-1 justify-end text-[11px] text-orange-500 font-semibold">
                  <Flame className="w-3 h-3 fill-orange-500" /> {student.streak}d
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
