import React, { useState } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  Bot,
  Sparkles,
  Bug,
  HelpCircle,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Clock,
  Layers,
} from 'lucide-react';
import { api } from '../services/api';
import { useGamification } from '../context/GamificationContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { InteractiveCodeEditor } from '../components/editor/InteractiveCodeEditor';
import { OutputConsole } from '../components/editor/OutputConsole';
import { TestRunner } from '../components/editor/TestRunner';

const STARTER_CODES = {
  javascript: `// Boring Coding — JavaScript Playground
// Function: solve(numbers) -> returns sum of squares of positive integers

function solve(numbers) {
  if (!Array.isArray(numbers)) return 0;
  return numbers
    .filter(n => n > 0)
    .map(n => n * n)
    .reduce((sum, n) => sum + n, 0);
}

// Sample test run
const testInput = [1, -2, 3, 4, -5];
console.log("Input array:", testInput);
console.log("Sum of positive squares:", solve(testInput));
`,
  python: `# Boring Coding — Python Playground
# Function: solve(nums) -> filters even numbers and calculates sum

def solve(nums):
    even_squares = [x**2 for x in nums if x % 2 == 0]
    return sum(even_squares)

# Test execution
sample = [1, 2, 3, 4, 5, 6]
print("Input:", sample)
print("Sum of even squares:", solve(sample))
`,
  java: `// Boring Coding — Java Playground
import java.util.*;

public class Main {
    public static int solve(int[] nums) {
        int sum = 0;
        for (int n : nums) {
            if (n > 0) sum += n;
        }
        return sum;
    }

    public static void main(String[] args) {
        int[] data = {5, -3, 10, 15, -2};
        System.out.println("Result: " + solve(data));
    }
}
`,
  cpp: `// Boring Coding — C++ Systems Playground
#include <iostream>
#include <vector>
#include <numeric>

int solve(const std::vector<int>& vec) {
    int sum = 0;
    for (int x : vec) {
        if (x % 2 == 0) sum += x;
    }
    return sum;
}

int main() {
    std::vector<int> numbers = {2, 3, 4, 5, 6};
    std::cout << "Sum of Evens: " << solve(numbers) << std::endl;
    return 0;
}
`,
};

const SAMPLE_TEST_CASES = {
  javascript: [
    { input: '[1, 2, 3]', expectedOutput: '14', description: 'Squares: 1 + 4 + 9 = 14' },
    { input: '[-1, -2, 4]', expectedOutput: '16', description: 'Single positive square: 16' },
  ],
  python: [
    { input: '[2, 4]', expectedOutput: '20', description: '2^2 + 4^2 = 20' },
  ],
  java: [],
  cpp: [],
};

export const PlaygroundPage = () => {
  const { addXP, triggerConfetti } = useGamification();

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(STARTER_CODES.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  // Active Tab for Right Side Panel: 'console', 'tests', 'ai'
  const [activeRightTab, setActiveRightTab] = useState('console');

  // AI Assistant state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(STARTER_CODES[lang] || '');
    setExecutionResult(null);
    setAiResponse(null);
    setActiveRightTab('console');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    // Switch immediately to console tab so the user sees real-time execution
    setActiveRightTab('console');
    try {
      const res = await api.runCode(language, code, SAMPLE_TEST_CASES[language] || []);
      setExecutionResult(res);

      if (res.status === 'passed') {
        addXP(25, 'Playground Execution');
        triggerConfetti();
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleAskAI = async (action) => {
    setActiveRightTab('ai');
    setAiLoading(true);
    try {
      const res = await api.askAITutor({
        action,
        code,
        language,
        message: `Please assist with my ${language} playground code.`,
      });
      setAiResponse(res);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Language Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-skin-text flex items-center gap-2">
            <Terminal className="w-8 h-8 text-skin-primary" />
            Coding Playground
          </h1>
          <p className="text-xs text-skin-text-muted">
            Experiment freely with live console output, test cases, and AI co-pilot debugging.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1.5 bg-skin-card border border-skin-border p-1 rounded-theme">
          {['javascript', 'python', 'java', 'cpp'].map(lang => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-3 py-1.5 rounded-theme text-xs font-bold uppercase transition-all ${
                language === lang
                  ? 'bg-skin-primary text-skin-primary-text shadow-theme-sm'
                  : 'text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover'
              }`}
            >
              {lang === 'cpp' ? 'C++' : lang}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-skin-surface border border-skin-border p-3 rounded-theme">
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            icon={Play}
            onClick={handleRunCode}
            isLoading={isRunning}
            glow
          >
            {isRunning ? 'Executing...' : 'Run Code'}
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={RotateCcw}
            onClick={() => {
              setCode(STARTER_CODES[language] || '');
              setExecutionResult(null);
            }}
            title="Reset to clean starter code"
          >
            Reset Code
          </Button>

          {executionResult && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-skin-text-muted ml-2">
              <Clock className="w-3.5 h-3.5 text-skin-primary" />
              Ran in {executionResult.executionTimeMs || 10}ms
            </span>
          )}
        </div>

        {/* AI Quick Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Bug}
            onClick={() => handleAskAI('debug_code')}
          >
            AI Debug
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Bot}
            onClick={() => handleAskAI('explain_code')}
          >
            AI Explain
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Sparkles}
            onClick={() => handleAskAI('hint')}
          >
            AI Hint
          </Button>
        </div>
      </div>

      {/* Main Side-by-Side Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Monaco Code Editor (6 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <InteractiveCodeEditor
            code={code}
            onChange={setCode}
            language={language}
            height="500px"
            onReset={() => setCode(STARTER_CODES[language] || '')}
          />
        </div>

        {/* Right Column: Side-by-Side Output, Test Cases, and AI Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          {/* Panel Tabs Navigation */}
          <div className="flex items-center gap-1 bg-skin-card border border-skin-border p-1 rounded-theme">
            <button
              onClick={() => setActiveRightTab('console')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-theme text-xs font-bold transition-all ${
                activeRightTab === 'console'
                  ? 'bg-skin-primary text-skin-primary-text shadow-theme-sm'
                  : 'text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Console Output</span>
              {executionResult?.status === 'passed' && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              )}
              {executionResult?.status === 'error' && (
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
              )}
            </button>

            <button
              onClick={() => setActiveRightTab('tests')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-theme text-xs font-bold transition-all ${
                activeRightTab === 'tests'
                  ? 'bg-skin-primary text-skin-primary-text shadow-theme-sm'
                  : 'text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Test Suite</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                executionResult?.passedTests === executionResult?.totalTests && executionResult?.totalTests > 0
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-black/20 text-skin-text-muted'
              }`}>
                {executionResult?.passedTests !== undefined && executionResult?.totalTests > 0
                  ? `${executionResult.passedTests}/${executionResult.totalTests} Pass`
                  : (SAMPLE_TEST_CASES[language]?.length || 0)}
              </span>
            </button>

            <button
              onClick={() => setActiveRightTab('ai')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-theme text-xs font-bold transition-all ${
                activeRightTab === 'ai'
                  ? 'bg-skin-primary text-skin-primary-text shadow-theme-sm'
                  : 'text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Tutor</span>
              {aiResponse && <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />}
            </button>
          </div>

          {/* Panel Tab 1: Live Output Console (Visible directly next to the code!) */}
          {activeRightTab === 'console' && (
            <div className="h-[455px]">
              <OutputConsole
                output={executionResult?.output}
                error={executionResult?.error}
                status={executionResult?.status}
                executionTimeMs={executionResult?.executionTimeMs}
                onClear={() => setExecutionResult(null)}
              />
            </div>
          )}

          {/* Panel Tab 2: Test Cases Assertions */}
          {activeRightTab === 'tests' && (
            <div className="h-[455px] overflow-y-auto bg-skin-card border border-skin-border rounded-theme p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-skin-border">
                <span className="text-xs font-bold text-skin-text uppercase tracking-wider">
                  Automated Assertions
                </span>
                <span className="text-xs text-skin-text-muted">
                  Language: {language.toUpperCase()}
                </span>
              </div>

              {SAMPLE_TEST_CASES[language]?.length > 0 ? (
                <TestRunner
                  testResults={executionResult?.testResults || []}
                  passedTests={executionResult?.passedTests || 0}
                  totalTests={SAMPLE_TEST_CASES[language].length}
                />
              ) : (
                <div className="text-center py-12 text-xs text-skin-text-muted space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-skin-text-dim" />
                  <p>No automated test assertions registered for this sandbox template.</p>
                  <p className="text-[11px] text-skin-text-dim">
                    Use <code>console.log()</code> statements to inspect runtime values in the Console tab.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Panel Tab 3: AI Tutor & Code Assistant */}
          {activeRightTab === 'ai' && (
            <Card className="h-[455px] flex flex-col justify-between space-y-3 p-4">
              <div className="flex-1 overflow-y-auto space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-skin-border">
                  <h3 className="font-bold text-xs font-display text-skin-text flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-skin-primary" />
                    AI Code Analysis & Debugger
                  </h3>
                  {aiResponse && (
                    <Badge variant="primary" size="sm">
                      {aiResponse.provider || 'Active'}
                    </Badge>
                  )}
                </div>

                {aiLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                    <div className="w-8 h-8 border-4 border-skin-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-skin-text-muted">Analyzing your code structure...</p>
                  </div>
                ) : aiResponse ? (
                  <div className="p-3 bg-skin-surface border border-skin-border rounded-theme text-xs leading-relaxed space-y-3">
                    <div className="prose prose-sm prose-invert max-w-none text-skin-text whitespace-pre-wrap">
                      {aiResponse.reply}
                    </div>
                    {aiResponse.configNote && (
                      <p className="text-[10px] text-skin-text-dim border-t border-skin-border pt-2">
                        💡 {aiResponse.configNote}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4 space-y-3 text-skin-text-muted">
                    <Bot className="w-10 h-10 mx-auto text-skin-primary/50" />
                    <h4 className="font-bold text-sm text-skin-text">Need Code Help?</h4>
                    <p className="text-xs leading-relaxed">
                      Click <strong>AI Debug</strong>, <strong>AI Explain</strong>, or <strong>AI Hint</strong> above to have the assistant inspect your playground code.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-skin-border flex items-center justify-between text-[11px] text-skin-text-muted">
                <span>Sandboxed Execution Engine</span>
                <span className="font-bold text-skin-primary">JavaScript VM</span>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
