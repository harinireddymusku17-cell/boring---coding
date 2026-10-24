import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-skin-primary flex items-center justify-center text-skin-primary-text font-black shadow-theme-sm">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight font-display text-skin-text">
              Boring<span className="text-skin-primary">Coding</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-skin-text">Reset Your Password</h2>
          <p className="text-xs text-skin-text-muted">
            Enter your registered email and we'll dispatch reset instructions.
          </p>
        </div>

        <Card>
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-skin-text">Check Your Inbox</h3>
              <p className="text-xs text-skin-text-muted">
                If an account exists for <strong>{email}</strong>, a password reset link has been dispatched.
              </p>
              <div className="pt-3">
                <Link to="/login">
                  <Button variant="secondary" size="md">Return to Login</Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Student Email"
                type="email"
                icon={Mail}
                placeholder="alex@student.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" variant="primary" size="lg" className="w-full" icon={ArrowRight}>
                Send Password Reset Link
              </Button>

              <div className="pt-2 text-center">
                <Link to="/login" className="text-xs text-skin-primary hover:underline">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
