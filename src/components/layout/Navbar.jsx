import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Code2,
  Flame,
  Sparkles,
  Palette,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  Terminal,
  Bot,
} from 'lucide-react';
import { useTheme, THEMES } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';

export const Navbar = ({ onToggleSidebar }) => {
  const { theme, setTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { currentXP, currentLevel } = useGamification();
  const navigate = useNavigate();

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-skin-surface/90 backdrop-blur-md border-b border-skin-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded-lg transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-skin-primary flex items-center justify-center text-skin-primary-text font-black shadow-theme-sm group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight font-display text-skin-text">
                Boring<span className="text-skin-primary">Coding</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider bg-skin-card-hover text-skin-text-muted">
                Gamified
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/courses"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded-lg transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Courses
          </Link>
          <Link
            to="/playground"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded-lg transition-colors"
          >
            <Terminal className="w-4 h-4" />
            Playground
          </Link>
          <Link
            to="/ai-tutor"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded-lg transition-colors"
          >
            <Bot className="w-4 h-4 text-skin-primary" />
            AI Tutor
          </Link>
        </nav>

        {/* Right: Quick Theme Switcher, XP & User Stats */}
        <div className="flex items-center gap-2.5">
          {/* Quick Theme Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-skin-card border border-skin-border text-skin-text hover:border-skin-primary rounded-lg text-xs font-semibold transition-all"
              title="Switch Themes"
            >
              <Palette className="w-3.5 h-3.5 text-skin-primary" />
              <span className="capitalize hidden sm:inline">{theme.replace('-', ' ')}</span>
              <ChevronDown className="w-3 h-3 text-skin-text-muted" />
            </button>

            {showThemeMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-skin-card border border-skin-border rounded-theme shadow-theme-lg p-2 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setShowThemeMenu(false)}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-skin-text-muted px-2 py-1 mb-1 border-b border-skin-border">
                  Choose Engine Theme (7)
                </div>
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                      theme === t.id
                        ? 'bg-skin-primary text-skin-primary-text font-bold'
                        : 'text-skin-text hover:bg-skin-card-hover'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {t.palette.slice(0, 3).map((c, i) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span>{t.name}</span>
                    </div>
                    <span className="text-[10px] opacity-75">{t.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gamification Pills (Streak & XP) */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Streak */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded-lg text-xs font-bold"
              title="Daily Active Learning Streak"
            >
              <Flame className="w-4 h-4 fill-orange-500 animate-pulse" />
              <span>{user?.streak || 5}d</span>
            </div>

            {/* Total XP */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-bold"
              title="Accumulated Experience Points"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{currentXP.toLocaleString()} XP</span>
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-full border-2 border-skin-primary hover:ring-2 hover:ring-skin-primary/50 transition-all"
            >
              <img
                src={user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex'}
                alt={user?.name || 'Alex'}
                className="w-7 h-7 rounded-full bg-skin-card object-cover"
              />
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-52 bg-skin-card border border-skin-border rounded-theme shadow-theme-lg p-2 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div className="px-3 py-2 border-b border-skin-border mb-1">
                  <p className="text-xs font-bold text-skin-text truncate">{user?.name || 'Student'}</p>
                  <p className="text-[11px] text-skin-text-muted truncate">{user?.email}</p>
                  <div className="mt-1.5 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-skin-primary/15 text-skin-primary">
                    Level {currentLevel} Scholar
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-skin-text hover:bg-skin-card-hover rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 text-skin-text-muted" />
                  My Profile & Heatmap
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-skin-text hover:bg-skin-card-hover rounded-lg transition-colors"
                >
                  <Palette className="w-4 h-4 text-skin-text-muted" />
                  Engine Settings & Themes
                </Link>

                <div className="border-t border-skin-border mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-skin-danger hover:bg-skin-danger/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
