import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GamificationProvider } from './context/GamificationContext';

import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LessonPage } from './pages/LessonPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { AITutorPage } from './pages/AITutorPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AchievementsPage } from './pages/AchievementsPage';
import { MissionsPage } from './pages/MissionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GamificationProvider>
          <BrowserRouter>
            <Routes>
              {/* Standalone Landing Page & Auth Routes */}
              <Route path="/" element={<Layout><LandingPage /></Layout>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Core Student Application Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout><DashboardPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="/courses" element={<Layout><CoursesPage /></Layout>} />
              <Route path="/courses/:courseId" element={<Layout><CourseDetailPage /></Layout>} />
              <Route
                path="/courses/:courseId/lessons/:lessonId"
                element={
                  <ProtectedRoute>
                    <Layout><LessonPage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="/playground" element={<Layout><PlaygroundPage /></Layout>} />
              <Route path="/ai-tutor" element={<Layout><AITutorPage /></Layout>} />
              <Route path="/leaderboard" element={<Layout><LeaderboardPage /></Layout>} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout><ProfilePage /></Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="/achievements" element={<Layout><AchievementsPage /></Layout>} />
              <Route path="/missions" element={<Layout><MissionsPage /></Layout>} />
              <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />

              {/* Informational Pages */}
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

              {/* 404 Not Found Route */}
              <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
            </Routes>
          </BrowserRouter>
        </GamificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
