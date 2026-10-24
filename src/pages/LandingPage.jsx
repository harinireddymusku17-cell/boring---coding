import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Sparkles,
  Zap,
  Flame,
  Bot,
  Terminal,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Palette,
  ShieldCheck,
  Star,
  Laptop,
} from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const LandingPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 pt-10 sm:pt-16 pb-12">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-skin-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-skin-primary/10 border border-skin-primary/30 text-skin-primary text-xs font-bold tracking-wide uppercase mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Antidote to Boring Tutorials</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-skin-text leading-tight mb-6">
          Coding Doesn't Have to Be <span className="text-skin-primary underline decoration-wavy decoration-skin-primary/50">Boring.</span>
        </h1>

        <p className="text-lg sm:text-xl text-skin-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Level up your programming skills through interactive coding challenges, XP points, daily missions, an AI co-pilot tutor, and seven immersive customizable UI themes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <Button size="lg" variant="primary" icon={Sparkles} glow className="w-full sm:w-auto">
              Get Started for Free
            </Button>
          </Link>
          <Link to="/courses">
            <Button size="lg" variant="secondary" icon={ArrowRight} className="w-full sm:w-auto">
              Explore Courses
            </Button>
          </Link>
        </div>

        {/* Quick Demo Preview Stats Banner */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-skin-border">
          <div>
            <p className="text-2xl font-black text-skin-text font-display">7</p>
            <p className="text-xs text-skin-text-muted uppercase font-bold">Immersive Themes</p>
          </div>
          <div>
            <p className="text-2xl font-black text-skin-primary font-display">4+</p>
            <p className="text-xs text-skin-text-muted uppercase font-bold">Core Languages</p>
          </div>
          <div>
            <p className="text-2xl font-black text-skin-text font-display">100%</p>
            <p className="text-xs text-skin-text-muted uppercase font-bold">Gamified Flow</p>
          </div>
          <div>
            <p className="text-2xl font-black text-amber-400 font-display">24/7</p>
            <p className="text-xs text-skin-text-muted uppercase font-bold">AI Tutor Co-Pilot</p>
          </div>
        </div>
      </section>

      {/* Seven-Theme Engine Interactive Showcase */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skin-card border border-skin-border text-skin-text text-xs font-bold uppercase tracking-wider mb-3">
            <Palette className="w-3.5 h-3.5 text-skin-primary" />
            <span>Product Unique Feature</span>
          </div>
          <h2 className="text-3xl font-extrabold font-display text-skin-text mb-3">
            The Seven-Theme Engine
          </h2>
          <p className="text-sm text-skin-text-muted">
            Click any card below to transform the entire platform instantly. Every theme redefines typography, borders, shadows, and interactive vibes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {THEMES.map(t => {
            const isActive = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-theme border-2 cursor-pointer transition-all duration-200 select-none ${
                  isActive
                    ? 'border-skin-primary shadow-theme-md scale-[1.02] bg-skin-card'
                    : 'border-skin-border hover:border-skin-primary/50 bg-skin-surface'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-skin-text">{t.name}</span>
                  {isActive && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-skin-primary text-skin-primary-text uppercase">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-skin-text-muted mb-4 line-clamp-2">{t.description}</p>
                <div className="flex items-center gap-1.5 pt-2 border-t border-skin-border/50">
                  {t.palette.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-black/30 shadow-xs"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-skin-text-dim ml-auto uppercase">
                    {t.font}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold font-display text-skin-text mb-3">
            Why Students Excel on Boring Coding
          </h2>
          <p className="text-sm text-skin-text-muted">
            Ditch passive slide decks and monotonous video lectures for a truly interactive coding playground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-skin-text">Gamified Progression</h3>
            <p className="text-xs text-skin-text-muted leading-relaxed">
              Earn XP points, maintain daily learning streaks, unlock rare achievement badges, and climb the student leaderboards with every solved exercise.
            </p>
          </Card>

          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-skin-primary/15 border border-skin-primary/30 flex items-center justify-center text-skin-primary">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-skin-text">Pedagogical AI Tutor</h3>
            <p className="text-xs text-skin-text-muted leading-relaxed">
              Stuck on a tricky bug or concept? Ask your built-in AI tutor for contextual hints, code breakdowns, and customized practice questions anytime.
            </p>
          </Card>

          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-skin-text">Interactive Playground</h3>
            <p className="text-xs text-skin-text-muted leading-relaxed">
              Write and execute Python, JavaScript, Java, and C++ directly in your browser with automated test case evaluation and instant stdout console feedback.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto px-4 bg-skin-card border border-skin-border rounded-theme p-8 sm:p-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-skin-text mb-2">
            How It Works
          </h2>
          <p className="text-xs text-skin-text-muted">Four simple steps to programming mastery.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="w-8 h-8 rounded-full bg-skin-primary text-skin-primary-text font-black text-sm flex items-center justify-center mx-auto sm:mx-0">
              1
            </span>
            <h4 className="font-bold text-sm text-skin-text">Pick Your Track</h4>
            <p className="text-xs text-skin-text-muted">Choose Python, JavaScript, Java, or C++ based on your goals.</p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <span className="w-8 h-8 rounded-full bg-skin-primary text-skin-primary-text font-black text-sm flex items-center justify-center mx-auto sm:mx-0">
              2
            </span>
            <h4 className="font-bold text-sm text-skin-text">Bite-Sized Lessons</h4>
            <p className="text-xs text-skin-text-muted">Read crisp theoretical explanations paired with real-world examples.</p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <span className="w-8 h-8 rounded-full bg-skin-primary text-skin-primary-text font-black text-sm flex items-center justify-center mx-auto sm:mx-0">
              3
            </span>
            <h4 className="font-bold text-sm text-skin-text">Solve Quizzes & Code</h4>
            <p className="text-xs text-skin-text-muted">Pass interactive assertions and run test cases directly in the browser.</p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <span className="w-8 h-8 rounded-full bg-skin-primary text-skin-primary-text font-black text-sm flex items-center justify-center mx-auto sm:mx-0">
              4
            </span>
            <h4 className="font-bold text-sm text-skin-text">Level Up & Compete</h4>
            <p className="text-xs text-skin-text-muted">Gain XP points, unlock rare achievement badges, and top the leaderboard.</p>
          </div>
        </div>
      </section>

      {/* Testimonials (Sample Content Marked) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="primary" className="mb-2">Sample Student Feedback</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-skin-text">
            Loved by CS Students
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-4">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-skin-text leading-relaxed italic">
              "The Hacker theme with terminal green fonts makes solving algorithmic exercises feel like a cybersecurity thriller! I finished two courses in one weekend."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-skin-border">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=student1" alt="Sam" className="w-8 h-8 rounded-full bg-skin-surface" />
              <div>
                <p className="text-xs font-bold text-skin-text">Samir Patel</p>
                <p className="text-[10px] text-skin-text-muted">Computer Science Sophomore</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-skin-text leading-relaxed italic">
              "Having the AI Tutor explain error stack traces without giving away the full answer forced me to genuinely understand how memory pointers work in C++."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-skin-border">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=student2" alt="Maya" className="w-8 h-8 rounded-full bg-skin-surface" />
              <div>
                <p className="text-xs font-bold text-skin-text">Maya Lin</p>
                <p className="text-[10px] text-skin-text-muted">Software Engineering Student</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-skin-text leading-relaxed italic">
              "The daily streak flames and leveling system turned study sessions into a fun game. I haven't missed a single day in over three weeks!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-skin-border">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=student3" alt="David" className="w-8 h-8 rounded-full bg-skin-surface" />
              <div>
                <p className="text-xs font-bold text-skin-text">David O'Connor</p>
                <p className="text-[10px] text-skin-text-muted">Self-Taught Web Developer</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="text-center max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-skin-primary/20 via-skin-card to-skin-primary/20 border-2 border-skin-primary rounded-theme p-10 sm:p-14 shadow-theme-lg">
          <h2 className="text-3xl sm:text-4xl font-black font-display text-skin-text mb-4">
            Ready to Never Be Bored by Code Again?
          </h2>
          <p className="text-sm text-skin-text-muted max-w-xl mx-auto mb-8">
            Join students learning Python, JavaScript, Java, and C++ with gamified missions and AI tutoring.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="primary" icon={Sparkles} glow>
              Launch Student Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
