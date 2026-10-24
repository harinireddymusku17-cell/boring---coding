import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto py-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black font-display text-skin-text">
          Get in Touch
        </h1>
        <p className="text-xs text-skin-text-muted">
          Have feedback, course suggestions, or questions about Boring Coding?
        </p>
      </div>

      <Card>
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-skin-text">Message Received!</h3>
            <p className="text-xs text-skin-text-muted">
              Thanks for reaching out, {name}! Our team will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Name"
              placeholder="Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Your Email"
              type="email"
              placeholder="alex@student.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-skin-text-muted">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="What's on your mind?..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-skin-surface border border-skin-border rounded-theme p-3 text-sm text-skin-text focus:outline-none focus:border-skin-primary"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" icon={Send}>
              Send Message
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};
