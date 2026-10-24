import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Trophy,
  BookOpen,
  ArrowRight,
  Play,
  CheckCircle2,
  Calendar,
  Zap,
  TrendingUp,
  Target,
  Award,
  ChevronRight,
  Code,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { initialCourses, initialLeaderboard } from '../data/seedData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

const WEEKLY_ACTIVITY = [
  { day: 'Mon', xp: 210, lessons: 2 },
  { day: 'Tue', xp: 340, lessons: 3 },
  { day: 'Wed', xp: 180, lessons: 1 },
  { day: 'Thu', xp: 450, lessons: 4 },
  { day: 'Fri', xp: 390, lessons: 3 },
  { day: 'Sat', xp: 520, lessons: 5 },
  { day: 'Sun', xp: 280, lessons: 2 },
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const {
    currentXP,
    currentLevel,
    xpToNextLevel,
    levelProgressPercent,
    missions,
    claimMission,
  } = useGamification();

  // Active courses
  const enrolledCourses = initialCourses.slice(0, 2);
  const recommendedCourses = initialCourses.slice(2, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-skin-card border border-skin-border rounded-theme p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-theme-sm relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex'}
              alt={user?.name || 'Alex'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-skin-surface border-2 border-skin-primary p-1 shadow-theme-sm"
            />
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-skin-primary text-skin-primary-text rounded-full text-[10px] font-black uppercase">
              Lvl {currentLevel}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black font-display text-skin-text">
                Welcome back, {user?.name || 'Alex'}!
              </h1>
              <span className="text-xl">🚀</span>
            </div>
            <p className="text-xs sm:text-sm text-skin-text-muted">
              You're on a <strong className="text-orange-500">{user?.streak || 5}-day learning streak</strong>! Ready to conquer today's coding quest?
            </p>
          </div>
        </div>

        {/* Quick Level Progression Bar */}
        <div className="w-full md:w-72 bg-skin-surface border border-skin-border rounded-theme p-4">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-bold text-skin-text flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Level {currentLevel}
            </span>
            <span className="text-skin-text-muted font-medium">{xpToNextLevel} XP to Level {currentLevel + 1}</span>
          </div>
          <ProgressBar progress={levelProgressPercent} max={100} showLabel={false} height="h-2" />
          <div className="mt-2 flex justify-between text-[11px] text-skin-text-dim">
            <span>Total: {currentXP.toLocaleString()} XP</span>
            <span>{levelProgressPercent}% completed</span>
          </div>
        </div>
      </div>

      {/* Gamification Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-skin-text-muted font-semibold uppercase">Total XP</p>
            <p className="text-2xl font-black text-skin-text">{currentXP.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
            <Flame className="w-6 h-6 fill-orange-500 animate-pulse" />
          </div>
          <div>
            <p className="text-xs text-skin-text-muted font-semibold uppercase">Daily Streak</p>
            <p className="text-2xl font-black text-skin-text">{user?.streak || 5} Days</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-skin-primary/15 border border-skin-primary/30 flex items-center justify-center text-skin-primary shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-skin-text-muted font-semibold uppercase">Completed Lessons</p>
            <p className="text-2xl font-black text-skin-text">
              {user?.completedLessons?.length || 2}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-skin-text-muted font-semibold uppercase">Global Rank</p>
            <p className="text-2xl font-black text-skin-text">#4</p>
          </div>
        </Card>
      </div>

      {/* Main Grid: Continue Learning & Daily Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: In-Progress Courses & Learning Chart */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-skin-text flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-skin-primary" />
                Continue Learning
              </h2>
              <Link to="/courses" className="text-xs font-semibold text-skin-primary hover:underline flex items-center gap-1">
                View all courses <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledCourses.map(course => (
                <Card key={course.courseId} hoverEffect className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="primary" size="sm">{course.language.toUpperCase()}</Badge>
                      <span className="text-xs text-skin-text-muted font-semibold">{course.difficulty}</span>
                    </div>
                    <h3 className="font-bold text-base text-skin-text mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-skin-text-muted mb-4 line-clamp-2">{course.description}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-skin-border">
                    <ProgressBar progress={course.courseId === 'py-101' ? 45 : 25} max={100} height="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-skin-text-muted font-medium">Next: Variables & Types</span>
                      <Link to={`/courses/${course.courseId}`}>
                        <Button size="sm" variant="primary" icon={Play}>Resume</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Weekly Learning Analytics (Recharts) */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display text-skin-text flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-skin-primary" />
                  Weekly Learning Velocity
                </h3>
                <p className="text-xs text-skin-text-muted">Experience points and completed coding exercises</p>
              </div>
              <Badge variant="xp">This Week: 2,370 XP</Badge>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_ACTIVITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
                  <XAxis dataKey="day" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-bg-card)',
                      borderColor: 'var(--color-border)',
                      borderRadius: 'var(--radius-theme)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="xp"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#xpGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Daily Challenge, Daily Missions & Leaderboard Preview */}
        <div className="space-y-6">
          {/* Daily Challenge Card */}
          <Card glow className="bg-gradient-to-br from-skin-card via-skin-card to-skin-primary/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-skin-primary flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Daily Coding Challenge
              </span>
              <Badge variant="xp">+75 XP</Badge>
            </div>
            <h3 className="font-bold text-sm text-skin-text">Two Sum & Hash Table Lookups</h3>
            <p className="text-xs text-skin-text-muted leading-relaxed">
              Find two indices in an array that sum to target using an $O(N)$ hash map approach.
            </p>
            <div className="pt-2">
              <Link to="/playground">
                <Button size="sm" variant="primary" icon={Code} className="w-full">
                  Solve in Playground
                </Button>
              </Link>
            </div>
          </Card>

          {/* Daily Missions */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-skin-border">
              <h3 className="font-bold text-sm font-display text-skin-text flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Daily Missions
              </h3>
              <span className="text-[11px] text-skin-text-muted">Resets in 12h</span>
            </div>

            <div className="space-y-3">
              {missions.map(mission => (
                <div key={mission.missionId} className="p-3 bg-skin-surface border border-skin-border rounded-theme space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-skin-text">{mission.title}</span>
                    <Badge variant="xp" size="sm">+{mission.xpReward} XP</Badge>
                  </div>
                  <p className="text-[11px] text-skin-text-muted">{mission.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-skin-text-dim">
                      {mission.completed ? '1 / 1 Complete' : '0 / 1 In Progress'}
                    </span>
                    {mission.claimed ? (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                      </span>
                    ) : mission.completed ? (
                      <Button
                        size="sm"
                        variant="xp"
                        onClick={() => claimMission(mission.missionId)}
                        className="py-1 px-2.5 text-xs"
                      >
                        Claim XP
                      </Button>
                    ) : (
                      <span className="text-[10px] text-skin-text-muted italic">In progress...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Mini Leaderboard Preview */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-skin-border">
              <h3 className="font-bold text-sm font-display text-skin-text flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                Top Students
              </h3>
              <Link to="/leaderboard" className="text-xs text-skin-primary hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {initialLeaderboard.slice(0, 4).map(student => (
                <div
                  key={student.rank}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                    student.rank === 4 ? 'bg-skin-primary/10 border border-skin-primary/30 font-bold' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 text-center font-bold ${
                      student.rank === 1 ? 'text-amber-400' : student.rank === 2 ? 'text-slate-300' : student.rank === 3 ? 'text-amber-600' : 'text-skin-text-muted'
                    }`}>
                      #{student.rank}
                    </span>
                    <img src={student.avatar} alt={student.name} className="w-6 h-6 rounded-full bg-skin-card" />
                    <span className="text-skin-text truncate max-w-[100px]">{student.name}</span>
                  </div>
                  <span className="font-bold text-skin-primary">{student.xp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
