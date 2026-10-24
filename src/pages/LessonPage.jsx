import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Play,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Code2,
  ChevronRight,
  Lightbulb,
  Award,
} from 'lucide-react';
import { api } from '../services/api';
import { useGamification } from '../context/GamificationContext';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { InteractiveCodeEditor } from '../components/editor/InteractiveCodeEditor';
import { OutputConsole } from '../components/editor/OutputConsole';
import { TestRunner } from '../components/editor/TestRunner';

export const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { addXP, triggerConfetti } = useGamification();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});
  const [showQuizHint, setShowQuizHint] = useState({});

  // Coding exercise state
  const [userCode, setUserCode] = useState('');
  const [executionResult, setExecutionResult] = useState(null);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [exercisePassed, setExercisePassed] = useState(false);

  // Lesson completion state
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      const data = await api.getLessonById(courseId, lessonId);
      setLesson(data);
      if (data?.codingExercise?.initialCode) {
        setUserCode(data.codingExercise.initialCode);
      }
      setQuizAnswers({});
      setQuizSubmitted({});
      setExecutionResult(null);
      setExercisePassed(false);
      setIsCompleted(false);
      setLoading(false);
    };
    fetchLesson();
  }, [courseId, lessonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[450px]">
        <div className="animate-spin w-8 h-8 border-4 border-skin-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-skin-text">Lesson Not Found</h2>
        <Link to={`/courses/${courseId}`}>
          <Button variant="secondary" icon={ArrowLeft}>Back to Course</Button>
        </Link>
      </div>
    );
  }

  // Quiz handlers
  const handleSelectOption = (qId, option) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleCheckQuiz = (q) => {
    setQuizSubmitted(prev => ({ ...prev, [q.questionId]: true }));
    const isCorrect = String(quizAnswers[q.questionId] || '').trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
    if (isCorrect) {
      addXP(25, 'Quiz Answer');
      triggerConfetti();
    }
  };

  // Code runner handler
  const handleRunExercise = async () => {
    setIsRunningCode(true);
    try {
      const res = await api.runCode(
        lesson.codingExercise?.language || 'javascript',
        userCode,
        lesson.codingExercise?.testCases || []
      );
      setExecutionResult(res);

      if (res.status === 'passed') {
        setExercisePassed(true);
        triggerConfetti();
      }
    } finally {
      setIsRunningCode(false);
    }
  };

  const handleFinishLesson = async () => {
    setIsCompleted(true);
    const xpReward = lesson.xp || 50;
    addXP(xpReward, `Completed Lesson: ${lesson.title}`);
    triggerConfetti();
    setShowCompletionModal(true);

    // Persist completed lesson in user profile
    const currentCompleted = user?.completedLessons || [];
    if (!currentCompleted.includes(lesson.lessonId)) {
      updateUser({
        completedLessons: [...currentCompleted, lesson.lessonId],
      });
    }

    try {
      await api.completeLesson(lesson.lessonId, { xpEarned: xpReward });
    } catch {
      // Offline fallback
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Breadcrumb & Nav */}
      <div className="flex items-center justify-between">
        <Link
          to={`/courses/${courseId}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-skin-text-muted hover:text-skin-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Syllabus
        </Link>
        <Badge variant="xp">+{lesson.xp || 50} XP for Completion</Badge>
      </div>

      {/* Lesson Title Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-black font-display text-skin-text">
          {lesson.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-skin-text-muted">
          <span>Est. Time: {lesson.durationMinutes || 15} mins</span>
          <span>•</span>
          <span>Interactive Exercise Included</span>
        </div>
      </div>

      {/* Learning Objectives Box */}
      {lesson.learningObjectives?.length > 0 && (
        <Card className="bg-skin-surface border-l-4 border-l-skin-primary space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-skin-primary flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> Learning Objectives
          </h3>
          <ul className="space-y-1.5 text-xs text-skin-text-muted">
            {lesson.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Theory & Explanation Content */}
      <Card className="prose prose-invert max-w-none text-skin-text space-y-4">
        <div className="text-sm leading-relaxed whitespace-pre-wrap text-skin-text-muted">
          {lesson.theoryContent}
        </div>

        {lesson.codeExample && (
          <div className="mt-4 pt-4 border-t border-skin-border space-y-2">
            <p className="text-xs font-bold text-skin-primary uppercase tracking-wider">
              Example Implementation ({lesson.codeExample.language})
            </p>
            <div className="p-4 bg-skin-card rounded-theme border border-skin-border font-mono text-xs overflow-x-auto">
              <pre className="text-skin-text">{lesson.codeExample.code}</pre>
            </div>
            {lesson.codeExample.explanation && (
              <p className="text-xs text-skin-text-muted italic">
                💡 {lesson.codeExample.explanation}
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Interactive Quizzes Section */}
      {lesson.quizzes?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-display text-skin-text flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            Interactive Knowledge Check
          </h2>

          <div className="space-y-4">
            {lesson.quizzes.map((quiz, qIdx) => {
              const selected = quizAnswers[quiz.questionId];
              const submitted = quizSubmitted[quiz.questionId];
              const isCorrect = String(selected || '').trim().toLowerCase() === String(quiz.correctAnswer).trim().toLowerCase();

              return (
                <Card key={quiz.questionId || qIdx} className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-semibold text-sm text-skin-text">
                      Q{qIdx + 1}: {quiz.question}
                    </p>
                    {quiz.hint && (
                      <button
                        onClick={() => setShowQuizHint(prev => ({ ...prev, [quiz.questionId]: !prev[quiz.questionId] }))}
                        className="text-amber-400 hover:text-amber-300 p-1 shrink-0"
                        title="Show Hint"
                      >
                        <Lightbulb className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {showQuizHint[quiz.questionId] && (
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded text-xs text-amber-400">
                      💡 Hint: {quiz.hint}
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2">
                    {quiz.options?.map((opt, oIdx) => {
                      const isOptionSelected = selected === opt;
                      let optionClasses = 'bg-skin-surface border-skin-border text-skin-text hover:bg-skin-card-hover';

                      if (submitted) {
                        if (opt === quiz.correctAnswer) {
                          optionClasses = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-bold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionClasses = 'bg-rose-500/15 border-rose-500/40 text-rose-400';
                        }
                      } else if (isOptionSelected) {
                        optionClasses = 'bg-skin-primary/20 border-skin-primary text-skin-primary font-bold';
                      }

                      return (
                        <div
                          key={oIdx}
                          onClick={() => !submitted && handleSelectOption(quiz.questionId, opt)}
                          className={`p-3 rounded-theme border text-xs cursor-pointer transition-all flex items-center justify-between ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {submitted && opt === quiz.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {submitted ? (
                      <div className="text-xs">
                        {isCorrect ? (
                          <span className="text-emerald-400 font-bold">Correct! +25 XP</span>
                        ) : (
                          <span className="text-rose-400 font-bold">Incorrect. {quiz.explanation}</span>
                        )}
                      </div>
                    ) : (
                      <div />
                    )}

                    {!submitted && (
                      <Button
                        size="sm"
                        variant="primary"
                        disabled={!selected}
                        onClick={() => handleCheckQuiz(quiz)}
                      >
                        Submit Answer
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Coding Exercise Section */}
      {lesson.codingExercise && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-skin-text flex items-center gap-2">
              <Code2 className="w-5 h-5 text-skin-primary" />
              Hands-On Code Challenge
            </h2>
            <Badge variant="primary">{lesson.codingExercise.language || 'JavaScript'}</Badge>
          </div>

          <Card className="space-y-4">
            <div className="p-3 bg-skin-surface border border-skin-border rounded-theme text-xs text-skin-text-muted leading-relaxed">
              <strong className="text-skin-text block mb-1">Challenge Instructions:</strong>
              {lesson.codingExercise.prompt}
            </div>

            {/* Code Editor */}
            <InteractiveCodeEditor
              code={userCode}
              onChange={setUserCode}
              language={lesson.codingExercise.language || 'javascript'}
              height="300px"
              onReset={() => setUserCode(lesson.codingExercise.initialCode)}
            />

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleRunExercise}
                isLoading={isRunningCode}
                icon={Play}
                glow
              >
                Run Code & Test Cases
              </Button>

              {lesson.codingExercise.hints?.length > 0 && (
                <span className="text-xs text-skin-text-muted">
                  💡 Hint: {lesson.codingExercise.hints[0]}
                </span>
              )}
            </div>

            {/* Console Output & Test Results */}
            {executionResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                <OutputConsole
                  output={executionResult.output}
                  error={executionResult.error}
                  status={executionResult.status}
                  executionTimeMs={executionResult.executionTimeMs}
                  onClear={() => setExecutionResult(null)}
                />

                <TestRunner
                  testResults={executionResult.testResults}
                  passedTests={executionResult.passedTests}
                  totalTests={executionResult.totalTests}
                />
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Bottom Completion Bar */}
      <div className="p-6 bg-skin-card border-2 border-skin-primary rounded-theme flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-skin-text">Ready to complete this lesson?</h3>
          <p className="text-xs text-skin-text-muted">Submit your progress to earn XP and level up!</p>
        </div>

        <Button
          size="lg"
          variant="primary"
          icon={Sparkles}
          glow
          onClick={handleFinishLesson}
        >
          Complete Lesson (+{lesson.xp || 50} XP)
        </Button>
      </div>

      {/* Celebration Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCompletionModal(false)} />
          <div className="relative z-10 w-full max-w-md bg-skin-card border-2 border-skin-primary rounded-theme p-8 text-center space-y-4 shadow-theme-lg animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto bg-emerald-500/20 border-2 border-emerald-500 rounded-2xl flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black font-display text-skin-text">
              Lesson Conquered!
            </h3>

            <p className="text-xs text-skin-text-muted">
              You completed <strong>{lesson.title}</strong> and earned{' '}
              <strong className="text-purple-400">+{lesson.xp || 50} XP</strong>!
            </p>

            <div className="pt-2 flex gap-3">
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={() => setShowCompletionModal(false)}
              >
                Review Lesson
              </Button>
              <Link to={`/courses/${courseId}`} className="flex-1">
                <Button variant="primary" size="md" className="w-full" icon={ArrowRight}>
                  Next Lesson
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
