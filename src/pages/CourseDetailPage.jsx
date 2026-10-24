import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Sparkles,
  Play,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Award,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

export const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const data = await api.getCourseById(courseId);
      setCourse(data);
      setLoading(false);
    };
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-skin-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-skin-text">Course Not Found</h2>
        <Link to="/courses">
          <Button variant="secondary" icon={ArrowLeft}>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const completedList = user?.completedLessons || ['py-les-1', 'js-les-1'];
  const firstLessonId = course.modules?.[0]?.lessons?.[0]?.lessonId || 'py-les-1';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/courses" className="inline-flex items-center gap-1.5 text-xs font-semibold text-skin-text-muted hover:text-skin-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </Link>
      </div>

      {/* Hero Overview Card */}
      <Card className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-skin-card via-skin-card to-skin-primary/5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{course.language.toUpperCase()}</Badge>
          <Badge variant="default">{course.difficulty}</Badge>
          <Badge variant="xp">+{course.xpReward} XP Milestone</Badge>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black font-display text-skin-text">
            {course.title}
          </h1>
          <p className="text-sm sm:text-base text-skin-text-muted leading-relaxed max-w-3xl">
            {course.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-skin-border text-xs text-skin-text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-skin-primary" /> {course.estimatedHours} Total Study Hours
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-skin-primary" /> {course.modules?.length || 2} Comprehensive Modules
          </span>
          <span className="flex items-center gap-1.5 font-bold text-skin-primary">
            <Award className="w-4 h-4" /> Certificate of Mastery Upon Finish
          </span>
        </div>

        <div className="pt-2">
          <Link to={`/courses/${course.courseId}/lessons/${firstLessonId}`}>
            <Button size="lg" variant="primary" icon={Play} glow>
              Start Learning Now
            </Button>
          </Link>
        </div>
      </Card>

      {/* Curriculum Syllabus Modules */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold font-display text-skin-text">
          Course Syllabus & Interactive Lessons
        </h2>

        <div className="space-y-4">
          {course.modules?.map((mod, modIdx) => (
            <Card key={mod.moduleId || modIdx} className="p-0 overflow-hidden">
              <div className="p-4 bg-skin-surface border-b border-skin-border flex items-center justify-between">
                <span className="font-bold text-sm text-skin-text">
                  {mod.title}
                </span>
                <span className="text-xs text-skin-text-muted">
                  {mod.lessons?.length || 0} Lessons
                </span>
              </div>

              <div className="divide-y divide-skin-border">
                {mod.lessons?.map((lesson, lessonIdx) => {
                  const isCompleted = completedList.includes(lesson.lessonId);
                  return (
                    <div
                      key={lesson.lessonId || lessonIdx}
                      className="p-4 flex items-center justify-between hover:bg-skin-card-hover transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-skin-border shrink-0" />
                        )}
                        <div>
                          <p className="font-semibold text-sm text-skin-text">{lesson.title}</p>
                          <div className="flex items-center gap-3 text-[11px] text-skin-text-muted mt-0.5">
                            <span>{lesson.durationMinutes || 15} mins</span>
                            <span className="font-bold text-purple-400">+{lesson.xp || 50} XP</span>
                          </div>
                        </div>
                      </div>

                      <Link to={`/courses/${course.courseId}/lessons/${lesson.lessonId}`}>
                        <Button size="sm" variant={isCompleted ? 'secondary' : 'primary'} icon={Play}>
                          {isCompleted ? 'Review' : 'Start'}
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
