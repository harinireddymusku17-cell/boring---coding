import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Clock,
  Sparkles,
  Lock,
  Play,
  CheckCircle,
  Filter,
} from 'lucide-react';
import { api } from '../services/api';
import { initialCourses } from '../data/seedData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { ProgressBar } from '../components/ui/ProgressBar';

export const CoursesPage = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const data = await api.getCourses({
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        search,
      });
      setCourses(data);
      setLoading(false);
    };

    const debounce = setTimeout(fetchCourses, 200);
    return () => clearTimeout(debounce);
  }, [search, selectedLanguage, selectedDifficulty]);

  const languages = ['all', 'python', 'javascript', 'java', 'cpp'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black font-display text-skin-text mb-2">
          Course Library
        </h1>
        <p className="text-sm text-skin-text-muted">
          Master computer science foundations through hands-on gamified tracks.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-skin-card border border-skin-border rounded-theme p-4 space-y-4 shadow-theme-sm">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:flex-1">
            <Input
              icon={Search}
              placeholder="Search courses by keyword, topic, or language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Difficulty Chips */}
          <div className="flex items-center gap-1.5 self-start md:self-auto overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-theme text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-skin-primary text-skin-primary-text'
                    : 'bg-skin-surface border border-skin-border text-skin-text-muted hover:text-skin-text'
                }`}
              >
                {diff === 'all' ? 'All Difficulties' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-2 border-t border-skin-border pt-3 overflow-x-auto">
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedLanguage === lang
                  ? 'bg-skin-primary/20 text-skin-primary border border-skin-primary/40'
                  : 'text-skin-text-muted hover:text-skin-text hover:bg-skin-card-hover'
              }`}
            >
              {lang === 'all' ? 'All Languages' : lang === 'cpp' ? 'C++' : lang}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.courseId} hoverEffect className="flex flex-col justify-between">
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between mb-3">
                <Badge variant="primary" size="sm">
                  {course.language.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-skin-text-muted">
                    {course.difficulty}
                  </span>
                  {course.isPremium && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500">
                      PRO
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-lg text-skin-text mb-2 line-clamp-1">
                {course.title}
              </h3>
              <p className="text-xs text-skin-text-muted leading-relaxed mb-4 line-clamp-3">
                {course.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-skin-border">
              <div className="flex items-center justify-between text-xs text-skin-text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {course.estimatedHours} Hours
                </span>
                <span className="flex items-center gap-1 font-bold text-skin-primary">
                  <Sparkles className="w-3.5 h-3.5" /> +{course.xpReward} XP
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link to={`/courses/${course.courseId}`} className="w-full">
                  <Button variant="primary" size="md" icon={Play} className="w-full">
                    View Curriculum
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
