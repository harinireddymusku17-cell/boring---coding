import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, distraction-free modern SaaS aesthetic with subtle neutral slate tones.',
    vibe: 'Distraction-Free',
    palette: ['#ffffff', '#f1f5f9', '#2563eb', '#0f172a'],
    font: 'Inter',
    badge: 'Standard',
  },
  {
    id: 'hacker',
    name: 'Hacker',
    description: 'Terminal-inspired monospace dark interface with glowing matrix green accents.',
    vibe: 'Terminal Matrix',
    palette: ['#060a07', '#0d160f', '#22c55e', '#00ff66'],
    font: 'Fira Code',
    badge: 'Pro',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic neon glow with electric cyan, vivid magenta, and high-contrast night surfaces.',
    vibe: 'Neon Dystopia',
    palette: ['#0a0418', '#180d38', '#00f0ff', '#ff007f'],
    font: 'Orbitron',
    badge: 'Futuristic',
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Deep cosmic navy with stellar purple nebula gradients and starlight cyan highlights.',
    vibe: 'Cosmic Odyssey',
    palette: ['#070914', '#141937', '#6366f1', '#38bdf8'],
    font: 'Orbitron',
    badge: 'Celestial',
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Calming forest emerald and organic earth curves designed to reduce student fatigue.',
    vibe: 'Serene Forest',
    palette: ['#07150e', '#122b1f', '#10b981', '#f59e0b'],
    font: 'Outfit',
    badge: 'Zen',
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Playful kawaii aesthetic with expressive pastels, soft violet, and magenta accents.',
    vibe: 'Expressive Kawaii',
    palette: ['#140d21', '#271a42', '#ec4899', '#fbbf24'],
    font: 'Outfit',
    badge: 'Playful',
  },
  {
    id: 'retro-pixel',
    name: 'Retro Pixel',
    description: 'Arcade 8-bit aesthetic with crisp pixel-art borders, arcade amber, and retro gaming nostalgic charm.',
    vibe: '8-Bit Arcade',
    palette: ['#120e24', '#241d45', '#facc15', '#f43f5e'],
    font: 'Press Start 2P',
    badge: 'Retro',
  },
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('boring_coding_theme') || 'minimal';
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('boring_coding_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    // Apply data-theme to HTML root
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('boring_coding_theme', theme);
  }, [theme]);

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('boring_coding_sound', JSON.stringify(next));
      return next;
    });
  };

  const currentThemeConfig = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, currentThemeConfig, soundEnabled, toggleSound }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
