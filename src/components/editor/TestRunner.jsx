import React from 'react';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

export const TestRunner = ({ testResults = [], totalTests = 0, passedTests = 0 }) => {
  if (!testResults || testResults.length === 0) {
    return (
      <div className="bg-skin-surface border border-skin-border rounded-theme p-5 text-center text-xs text-skin-text-muted">
        <p>No test cases executed yet. Click <strong>Run Code</strong> to evaluate against assertions.</p>
      </div>
    );
  }

  const allPassed = passedTests === totalTests && totalTests > 0;

  return (
    <div className="space-y-3">
      {/* Test Suite Summary */}
      <div className="flex items-center justify-between p-3 bg-skin-surface border border-skin-border rounded-theme">
        <span className="text-xs font-bold text-skin-text uppercase tracking-wider">
          Test Suite Results
        </span>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            allPassed
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
          }`}
        >
          {passedTests} / {totalTests} Passed
        </span>
      </div>

      {/* Test Cases List */}
      <div className="space-y-2">
        {testResults.map((tc, idx) => (
          <div
            key={idx}
            className={`p-3.5 border rounded-theme text-xs font-mono transition-colors ${
              tc.passed
                ? 'bg-emerald-500/5 border-emerald-500/20'
                : 'bg-rose-500/5 border-rose-500/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {tc.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span className="font-bold text-skin-text">
                  Case #{tc.caseNumber}: {tc.description || 'Test Case'}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  tc.passed ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                }`}
              >
                {tc.passed ? 'PASS' : 'FAIL'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] bg-skin-card p-2.5 rounded border border-skin-border">
              <div>
                <span className="text-skin-text-muted block text-[10px] uppercase">Input</span>
                <span className="text-skin-text">{tc.input || 'None'}</span>
              </div>
              <div>
                <span className="text-skin-text-muted block text-[10px] uppercase">Expected</span>
                <span className="text-emerald-400">{tc.expectedOutput}</span>
              </div>
              <div>
                <span className="text-skin-text-muted block text-[10px] uppercase">Output</span>
                <span className={tc.passed ? 'text-emerald-400' : 'text-rose-400'}>
                  {tc.actualOutput || 'Empty'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
