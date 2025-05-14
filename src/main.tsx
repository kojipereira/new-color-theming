
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check for dark mode preference
const setInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Run before rendering the app
setInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
