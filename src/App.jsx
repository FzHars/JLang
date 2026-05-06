import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./pages/landing/LandingPage";
import Kana from "./pages/kana/Kana";
import TrainingMode from "./pages/training/TrainingMode";
import ScoreScreen from "./pages/score/ScoreScreen";
import "./App.css";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/kana" element={<Kana />} />
        <Route path="/training" element={<TrainingMode />} />
        <Route path="/score" element={<ScoreScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
