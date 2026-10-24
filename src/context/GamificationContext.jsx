import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';
import { initialAchievements, initialDailyMissions } from '../data/seedData';

const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const { user, updateUser } = useAuth();

  const [levelUpData, setLevelUpData] = useState({
    isOpen: false,
    newLevel: 1,
    oldLevel: 1,
  });

  const [toastNotification, setToastNotification] = useState(null);

  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem('boring_coding_missions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialDailyMissions;
      }
    }
    return initialDailyMissions.map((m, i) => ({
      ...m,
      currentCount: i === 0 ? 1 : 0,
      completed: i === 0,
      claimed: false,
    }));
  });

  const triggerConfetti = (origin = { x: 0.5, y: 0.6 }) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin,
        colors: ['#22c55e', '#3b82f6', '#ec4899', '#facc15', '#a855f7'],
      });
    } catch {
      // Fallback
    }
  };

  const showToast = (message, type = 'success', icon = 'Sparkles') => {
    setToastNotification({ message, type, icon, id: Date.now() });
    setTimeout(() => {
      setToastNotification(null);
    }, 4500);
  };

  const currentXP = user?.xp || 1850;
  const currentLevel = Math.floor(currentXP / 500) + 1;
  const xpInCurrentLevel = currentXP % 500;
  const xpToNextLevel = 500 - xpInCurrentLevel;
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / 500) * 100));

  const addXP = (amount, reason = 'Lesson Completion') => {
    if (!amount || amount <= 0) return;

    const oldLevel = currentLevel;
    const newXP = currentXP + amount;
    const newLevel = Math.floor(newXP / 500) + 1;

    updateUser({
      xp: newXP,
      level: newLevel,
    });

    showToast(`+${amount} XP earned for ${reason}!`, 'xp');

    if (newLevel > oldLevel) {
      triggerConfetti();
      setLevelUpData({
        isOpen: true,
        oldLevel,
        newLevel,
      });
    }
  };

  const claimMission = (missionId) => {
    const mission = missions.find(m => m.missionId === missionId);
    if (!mission || mission.claimed) return false;

    setMissions(prev =>
      prev.map(m => (m.missionId === missionId ? { ...m, claimed: true } : m))
    );

    addXP(mission.xpReward, `Daily Mission: "${mission.title}"`);
    triggerConfetti();
    return true;
  };

  const claimAchievement = (achievementId) => {
    const ach = initialAchievements.find(a => a.achievementId === achievementId);
    if (!ach) return false;

    const currentUnlocked = user?.unlockedAchievements || [];
    if (currentUnlocked.includes(achievementId)) return false;

    updateUser({
      unlockedAchievements: [...currentUnlocked, achievementId],
    });

    addXP(ach.xpReward, `Achievement: "${ach.title}"`);
    triggerConfetti();
    showToast(`Achievement Unlocked: ${ach.title}!`, 'achievement');
    return true;
  };

  const closeLevelUpModal = () => {
    setLevelUpData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <GamificationContext.Provider
      value={{
        currentXP,
        currentLevel,
        xpInCurrentLevel,
        xpToNextLevel,
        levelProgressPercent,
        addXP,
        triggerConfetti,
        levelUpData,
        closeLevelUpModal,
        toastNotification,
        showToast,
        missions,
        claimMission,
        claimAchievement,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
