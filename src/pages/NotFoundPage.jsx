import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-2xl bg-skin-card border-2 border-skin-border flex items-center justify-center text-skin-primary font-mono text-3xl font-black shadow-theme-md">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black font-display text-skin-text">
          Null Pointer Exception!
        </h1>
        <p className="text-sm text-skin-text-muted max-w-md mx-auto">
          The route you are navigating to does not exist or has been refactored into the void.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="primary" size="md" icon={Home}>
            Back to Dashboard
          </Button>
        </Link>
        <Link to="/courses">
          <Button variant="secondary" size="md" icon={ArrowLeft}>
            Browse Courses
          </Button>
        </Link>
      </div>
    </div>
  );
};
