
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeModeProvider } from './hooks/useThemeMode'

createRoot(document.getElementById("root")!).render(
  <ThemeModeProvider>
    <App />
  </ThemeModeProvider>
);
