import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

const ThemeContext = createContext();

const themeModeStorage = localStorage.getItem('theme-mode') === 'true';

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(themeModeStorage); // Default 'light-theme'
  const themeToggle = (e) => {
    const isChecked = e.target.checked;

    // setThemeMode((current) => !current);
    if (isChecked) {
      setThemeMode(true); // dark mode
      localStorage.setItem('theme-mode', true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setThemeMode(false); // light mode
      localStorage.setItem('theme-mode', false);
      document.documentElement.removeAttribute('data-theme');
    }
  };

  useEffect(() => {
    if (themeModeStorage) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);
  return <ThemeContext.Provider value={{ themeMode, themeToggle }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
