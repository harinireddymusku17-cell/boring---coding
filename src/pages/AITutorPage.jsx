import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Bug,
  HelpCircle,
  Lightbulb,
  FileQuestion,
  Code2,
  Trash2,
  Check,
  Copy,
} from 'lucide-react';
import { api } from '../services/api';
import { useGamification } from '../context/GamificationContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const SUGGESTED_PROMPTS = [
  { label: 'Explain Concept', prompt: 'Explain the difference between Pass by Value vs Pass by Reference.', action: 'explain_concept' },
  { label: 'Debug My Code', prompt: 'Why is my loop causing an off-by-one boundary error?', action: 'debug_code' },
  { label: 'Give Me a Hint', prompt: 'How do I optimize finding duplicates in an array from O(N^2) to O(N)?', action: 'hint' },
  { label: 'Generate Practice Questions', prompt: 'Generate 3 challenging recursion interview questions with answers.', action: 'practice_questions' },
  { label: 'Explain Errors', prompt: 'Explain what "TypeError: Cannot read properties of undefined" means in JavaScript.', action: 'explain_errors' },
];

export const AITutorPage = () => {
  const { addXP } = useGamification();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I am your **Boring Coding AI Tutor** 🤖.\n\nI'm here to clarify tricky concepts, debug code, offer hints, or generate practice questions whenever you feel stuck. What are you building or learning today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [codeContext, setCodeContext] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ai/status');
        if (res.ok) {
          const data = await res.json();
          setAiStatus(data);
        }
      } catch {
        // Offline
      }
    };
    checkStatus();
  }, []);

  const handleSendMessage = async (textToSend, action = 'explain_concept') => {
    const query = textToSend || inputMessage;
    if (!query.trim() && !codeContext.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      code: codeContext || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await api.askAITutor({
        message: query,
        code: codeContext,
        action,
        language: 'JavaScript',
      });

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: res.reply,
        provider: res.provider,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
      addXP(10, 'AI Tutor Inquiry');
    } finally {
      setIsLoading(false);
      setCodeContext('');
      setShowCodeInput(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: 'Chat history cleared. How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-skin-text flex items-center gap-2">
            <Bot className="w-7 h-7 text-skin-primary" />
            AI Coding Tutor
          </h1>
          <p className="text-xs text-skin-text-muted">
            Personalized coding co-pilot for explanations, debugging, and hints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {aiStatus?.activeProvider && (
            <Badge variant="primary" size="sm">
              Provider: {aiStatus.activeProvider}
            </Badge>
          )}
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        {SUGGESTED_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.prompt, p.action)}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-skin-card border border-skin-border text-skin-text hover:border-skin-primary hover:text-skin-primary transition-all whitespace-nowrap shrink-0"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <Card className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-skin-surface border border-skin-border">
        {messages.map(msg => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-xl bg-skin-primary/15 border border-skin-primary/30 flex items-center justify-center text-skin-primary shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-theme p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                  isAI
                    ? 'bg-skin-card border border-skin-border text-skin-text shadow-theme-sm'
                    : 'bg-skin-primary text-skin-primary-text font-medium'
                }`}
              >
                {msg.code && (
                  <div className="p-3 bg-black/40 rounded border border-white/10 font-mono text-xs overflow-x-auto mb-2 text-left">
                    <pre>{msg.code}</pre>
                  </div>
                )}

                <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap">
                  {msg.text}
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] opacity-60">
                  <span>{msg.provider || (isAI ? 'AI Tutor' : 'You')}</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-xl bg-skin-card-hover border border-skin-border flex items-center justify-center text-skin-text shrink-0 mt-0.5">
                  <span className="font-bold text-xs">You</span>
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-skin-primary/15 border border-skin-primary/30 flex items-center justify-center text-skin-primary shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-skin-card border border-skin-border p-3.5 rounded-theme flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-skin-primary animate-ping" />
              <span className="w-2 h-2 rounded-full bg-skin-primary animate-ping delay-100" />
              <span className="w-2 h-2 rounded-full bg-skin-primary animate-ping delay-200" />
              <span className="text-xs text-skin-text-muted ml-2">Tutor is drafting an explanation...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </Card>

      {/* Input Form Bar */}
      <div className="space-y-2 shrink-0">
        {showCodeInput && (
          <div className="p-3 bg-skin-card border border-skin-border rounded-theme space-y-2">
            <div className="flex items-center justify-between text-xs text-skin-text-muted">
              <span>Attach Code Snippet:</span>
              <button
                onClick={() => setShowCodeInput(false)}
                className="text-skin-danger hover:underline"
              >
                Close Code Box
              </button>
            </div>
            <textarea
              value={codeContext}
              onChange={(e) => setCodeContext(e.target.value)}
              placeholder="Paste the code you want analyzed..."
              rows={4}
              className="w-full bg-skin-surface border border-skin-border rounded p-2.5 font-mono text-xs text-skin-text focus:outline-none focus:border-skin-primary"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCodeInput(!showCodeInput)}
            className={`p-2.5 rounded-theme border transition-colors ${
              showCodeInput
                ? 'bg-skin-primary text-skin-primary-text border-skin-primary'
                : 'bg-skin-card text-skin-text-muted border-skin-border hover:text-skin-text hover:bg-skin-card-hover'
            }`}
            title="Attach Code Snippet"
          >
            <Code2 className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Ask a programming question, debug request, or concept explanation..."
            className="flex-1 bg-skin-card border border-skin-border rounded-theme px-4 py-3 text-sm text-skin-text placeholder:text-skin-text-dim focus:outline-none focus:border-skin-primary focus:ring-1 focus:ring-skin-primary"
          />

          <Button
            variant="primary"
            size="md"
            icon={Send}
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() && !codeContext.trim()}
          >
            Ask
          </Button>
        </div>
      </div>
    </div>
  );
};
