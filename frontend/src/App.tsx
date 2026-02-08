import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { ThemeProvider } from './components/theme-provider';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-50 transition-colors duration-300">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/estimate" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}