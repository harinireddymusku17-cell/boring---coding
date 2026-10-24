import React from 'react';
import { Terminal, CheckCircle2, AlertCircle, Clock, Trash2, Info } from 'lucide-react';

export const OutputConsole = ({
  output,
  error,
  status,
  executionTimeMs,
  onClear,
}) => {
  return (
    <div className="bg-skin-surface border border-skin-border rounded-theme overflow-hidden flex flex-col h-full font-mono text-xs">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-skin-card border-b border-skin-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-skin-primary" />
          <span className="font-bold text-skin-text uppercase tracking-wider text-[11px]">Output Console</span>
        </div>

        <div className="flex items-center gap-2">
          {executionTimeMs !== undefined && executionTimeMs !== null && (
            <span className="flex items-center gap-1 text-[11px] text-skin-text-muted">
              <Clock className="w-3 h-3" /> {executionTimeMs}ms
            </span>
          )}

          {error ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/15 text-rose-500 font-bold text-[10px]">
              <AlertCircle className="w-3 h-3" /> RUNTIME ERROR
            </span>
          ) : output ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> SUCCESS
            </span>
          ) : null}
          {status === 'unconfigured' && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 text-amber-500 font-bold text-[10px]">
              <Info className="w-3 h-3" /> NOTICE
            </span>
          )}

          {onClear && (
            <button
              onClick={onClear}
              className="p-1 text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover rounded transition-colors"
              title="Clear Output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Output Content Area */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed space-y-2 bg-skin-base/50 min-h-[160px]">
        {error ? (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-rose-400">
            <p className="font-bold mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Execution Error
            </p>
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        ) : null}

        {output ? (
          <pre className="text-skin-text whitespace-pre-wrap">{output}</pre>
        ) : null}

        {!output && !error && (
          <p className="text-skin-text-dim italic">
            Click "Run Code" above to execute program and display stdout...
          </p>
        )}
      </div>
    </div>
  );
};
