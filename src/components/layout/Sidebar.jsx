import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Terminal,
  Bot,
  Trophy,
  Award,
  Zap,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/playground', label: 'Playground', icon: Terminal },
  { path: '/ai-tutor', label: 'AI Tutor', icon: Bot, highlight: true },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/achievements', label: 'Achievements', icon: Award },
  { path: '/missions', label: 'Daily Missions', icon: Zap },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ isCollapsed, onToggle }) => {
  const { currentLevel, xpInCurrentLevel, xpToNextLevel, levelProgressPercent } = useGamification();

  return (
    <aside
      className={`relative z-30 flex flex-col justify-between bg-skin-surface border-r border-skin-border transition-all duration-300 ease-in-out shrink-0 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Nav Items */}
      <div className="p-3 space-y-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-theme text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-skin-primary text-skin-primary-text shadow-theme-sm font-semibold'
                    : 'text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${item.highlight ? 'text-amber-400' : ''}`} />
              {!isCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-skin-primary-text/20 text-skin-primary-text uppercase font-bold">
                      AI
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom: Level Progress Widget & Collapse Toggle */}
      <div className="p-3 border-t border-skin-border">
        {!isCollapsed && (
          <div className="bg-skin-card border border-skin-border rounded-theme p-3 mb-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-skin-primary flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Level {currentLevel}
              </span>
              <span className="text-skin-text-muted">{xpToNextLevel} XP left</span>
            </div>
            <div className="w-full bg-skin-card-hover rounded-full h-2 overflow-hidden mb-1">
              <div
                className="bg-skin-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-skin-text-dim text-right">
              {xpInCurrentLevel} / 500 XP
            </p>
          </div>
        )}

        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded-theme transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Menu</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
