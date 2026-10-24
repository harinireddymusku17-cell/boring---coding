import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Sparkles,
  Heart,
  Target,
  Zap,
  ShieldCheck,
  Palette,
  Terminal,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const AboutPage = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black font-display text-skin-text">
          About Boring Coding
        </h1>
        <p className="text-base text-skin-text-muted max-w-2xl mx-auto leading-relaxed">
          The mission is simple: eliminate passive, monotonous programming education and replace it with exhilarating, gamified flow states.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-skin-primary/15 flex items-center justify-center text-skin-primary">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-skin-text">The Problem</h3>
          <p className="text-xs text-skin-text-muted leading-relaxed">
            Conventional coding classes subject students to 60-page PDF slides, hour-long monologues, and repetitive exercises without immediate feedback. Over 65% of beginners drop out out of pure boredom and lack of agency.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-skin-text">The Gamified Solution</h3>
          <p className="text-xs text-skin-text-muted leading-relaxed">
            Boring Coding transforms learning syntax into an adventure. Earn XP points, protect daily streaks, unlock badges, and personalize your environment with the Seven-Theme Engine.
          </p>
        </Card>
      </div>

      <Card className="space-y-4 bg-skin-surface border border-skin-border">
        <h3 className="text-xl font-bold font-display text-skin-text">Core Architectural Pillars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <strong className="text-skin-primary block">Active Recall</strong>
            <p className="text-skin-text-muted">Interactive quizzes and live assertions after every conceptual chunk.</p>
          </div>
          <div className="space-y-1">
            <strong className="text-amber-400 block">Personalized AI Tutor</strong>
            <p className="text-skin-text-muted">Safe, sandboxed hints and error explanations without giving away solutions.</p>
          </div>
          <div className="space-y-1">
            <strong className="text-emerald-400 block">Sensory Customization</strong>
            <p className="text-skin-text-muted">Seven distinct themes matching the mood and aesthetic of every programmer.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
