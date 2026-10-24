import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Heart, Sparkles, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-skin-surface border-t border-skin-border py-8 px-4 sm:px-6 lg:px-8 text-skin-text-muted transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-skin-primary flex items-center justify-center text-skin-primary-text font-black">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-skin-text font-display">
              Boring<span className="text-skin-primary">Coding</span>
            </span>
            <p className="text-xs text-skin-text-dim">Coding doesn't have to be boring.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
          <Link to="/about" className="hover:text-skin-primary transition-colors">About</Link>
          <Link to="/courses" className="hover:text-skin-primary transition-colors">Course Library</Link>
          <Link to="/playground" className="hover:text-skin-primary transition-colors">Code Playground</Link>
          <Link to="/ai-tutor" className="hover:text-skin-primary transition-colors">AI Tutor</Link>
          <Link to="/contact" className="hover:text-skin-primary transition-colors">Contact</Link>
          <Link to="/settings" className="hover:text-skin-primary transition-colors">7-Theme Engine</Link>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for curious students</span>
        </div>
      </div>
    </footer>
  );
};
