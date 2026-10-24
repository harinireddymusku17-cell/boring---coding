import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { LevelUpModal } from '../gamification/LevelUpModal';
import { ToastContainer } from '../gamification/ToastContainer';

export const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-skin-base text-skin-text antialiased transition-colors duration-200">
      <Navbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex w-full">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </div>
          <Footer />
        </main>
      </div>

      <LevelUpModal />
      <ToastContainer />
    </div>
  );
};
