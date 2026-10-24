import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Code2,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage = () => {
  const { login, loginDemo, loading } = useAuth();
  const { showToast } = useGamification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      showToast('Welcome back! Ready to code?', 'success');
      navigate('/dashboard');
    } else {
      setError(res.message || 'Invalid email or password.');
    }
  };

  const handleDemoLogin = () => {
    loginDemo();
    showToast('Logged in as Demo Student!', 'xp');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-skin-primary flex items-center justify-center text-skin-primary-text font-black shadow-theme-sm">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight font-display text-skin-text">
              Boring<span className="text-skin-primary">Coding</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-skin-text">Sign In to Continue Learning</h2>
          <p className="text-xs text-skin-text-muted">
            Preserve your streak, level up your rank, and claim daily rewards.
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="p-3.5 bg-skin-primary/10 border-2 border-skin-primary rounded-theme text-center space-y-2">
          <p className="text-xs font-bold text-skin-text">
            ⚡ Quick Evaluator / Demo Student Login
          </p>
          <p className="text-[11px] text-skin-text-muted">
            1-click instant login with sample courses, level 4 progress, and streak!
          </p>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="w-full"
            icon={Sparkles}
            onClick={handleDemoLogin}
          >
            Instant Demo Student Login
          </Button>
        </div>

        {/* Main Login Card */}
        <Card>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-xs text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Student Email"
              type="email"
              icon={Mail}
              placeholder="alex@student.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-skin-text-muted">
                <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-skin-primary hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={loading}
              icon={ArrowRight}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-skin-border text-center text-xs text-skin-text-muted">
            <span>Don't have an account yet? </span>
            <Link to="/register" className="text-skin-primary font-bold hover:underline">
              Create an Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
