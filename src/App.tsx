import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Learning from './pages/Learning';
import Quizzes from './pages/Quizzes';
import InteractiveLessons from './pages/InteractiveLessons';
import TeacherDashboard from './pages/TeacherDashboard';
import Leaderboard from './pages/Leaderboard';
import TrashSortingGame from './components/games/TrashSortingGame';
import PowerGridSimulator from './components/games/PowerGridSimulator';
import WordleGame from './components/games/wordle/WordleGame';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { RecycleGame } from './components/games/recycle-rush/RecycleGame';
import Quiz from './components/Quiz';
import { LessonPage as NutrientCycleLesson } from './components/games/NutrientCycle/src/pages/LessonPage';
import NutrientCycleLanding from './pages/NutrientCycleLanding';
import LifeChoicesSimLanding from './pages/LifeChoicesSimLanding';
import LifeChoicesGame from './components/games/life-choices-sim/pages/Index';

const queryClient = new QueryClient();

function App() {
  return (
    <GameProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quiz/:category" element={<Quiz />} />
            <Route path="/interactive" element={<InteractiveLessons />} />
            <Route path="/interactive/trash-sorting" element={<TrashSortingGame />} />
            <Route path="/interactive/nutrient-cycle" element={<NutrientCycleLanding />} />
            <Route path="/interactive/nutrient-cycle/:lessonId" element={<NutrientCycleLesson />} />
            
            <Route path="/interactive/power-grid" element={<PowerGridSimulator />} />
            <Route path="/interactive/eco-vocab" element={<WordleGame />} />
            <Route path="/interactive/recycle-rush" element={<RecycleGame />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/interactive/life-choices-sim" element={<LifeChoicesSimLanding />} />
            <Route path="/interactive/life-choices-sim/play" element={<LifeChoicesGame />} />
          </Routes>
        </div>
      </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </GameProvider>
  );
}

export default App;