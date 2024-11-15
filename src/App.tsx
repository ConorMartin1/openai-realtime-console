import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsolePage from './pages/ConsolePage/ConsolePage';
import ReviewPage from './pages/ReviewPage/ReviewPage';
import HomePage from './pages/HomePage/HomePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import TemplatesPage from './pages/TemplatesPage/TemplatesPage';

function App() {
  console.log("App is rendering");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/console" element={<ConsolePage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
      </Routes>
    </Router>
  );
}

export default App;