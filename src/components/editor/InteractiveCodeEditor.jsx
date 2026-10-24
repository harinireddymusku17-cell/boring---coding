import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal, Copy, Check, RefreshCw } from 'lucide-react';

export const InteractiveCodeEditor = ({
  code,
  onChange,
  language = 'javascript',
  height = '420px',
  readOnly = false,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [monacoFailed, setMonacoFailed] = useState(false);
  const textareaRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextareaChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  // Map language aliases
  const getMonacoLang = (lang) => {
    const l = (lang || '').toLowerCase();
    if (l === 'js') return 'javascript';
    if (l === 'py') return 'python';
    if (l === 'c++') return 'cpp';
    return l || 'javascript';
  };

  // Line count for the fallback editor
  const lineCount = (code || '').split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 12) }, (_, i) => i + 1);

  return (
    <div className="relative border border-skin-border rounded-theme overflow-hidden bg-skin-card shadow-theme-sm">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-skin-surface border-b border-skin-border text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono font-bold text-skin-primary uppercase text-[11px] tracking-wider">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2 py-1 text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded text-xs transition-colors"
              title="Reset Code to Initial State"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded text-xs transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor Body: Monaco with Resilient Built-in Fallback */}
      {!monacoFailed ? (
        <Editor
          height={height}
          language={getMonacoLang(language)}
          value={code}
          onChange={(val) => onChange && onChange(val || '')}
          theme="vs-dark"
          loading={
            <div className="flex items-center justify-center h-full text-xs text-skin-text-muted gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-skin-primary" />
              <span>Loading Monaco Engine...</span>
            </div>
          }
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Fira Code, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            readOnly,
            tabSize: 2,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
          }}
          onMount={() => {}}
          onError={() => setMonacoFailed(true)}
        />
      ) : (
        /* Built-in Resilient Fallback Editor (Zero External CDN Dependency) */
        <div className="flex bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm overflow-hidden" style={{ height }}>
          {/* Line Numbers Column */}
          <div className="select-none py-3 px-3 bg-[#181818] text-[#858585] text-right font-mono text-xs border-r border-[#333]">
            {lineNumbers.map(n => (
              <div key={n} className="leading-6">{n}</div>
            ))}
          </div>

          {/* Textarea Code Input */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleTextareaChange}
            readOnly={readOnly}
            spellCheck="false"
            className="flex-1 w-full bg-transparent text-[#d4d4d4] font-mono p-3 leading-6 resize-none focus:outline-none"
            style={{ tabSize: 2 }}
          />
        </div>
      )}
    </div>
  );
};
