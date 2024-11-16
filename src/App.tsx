import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsolePage from './pages/ConsolePage/ConsolePage';
import ReviewPage from './pages/ReviewPage/ReviewPage';
import HomePage from './pages/HomePage/HomePage';
import HomePage2 from './pages/HomePage2/HomePage2';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import SettingsPage2 from './pages/SettingsPage2/SettingsPage2';
import TemplatesPage from './pages/TemplatesPage/TemplatesPage';

function App() {
  console.log("App is rendering");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home2" element={<HomePage2 />} />
        <Route path="/console" element={<ConsolePage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings2" element={<SettingsPage2 />} />
        <Route path="/templates" element={<TemplatesPage />} />
      </Routes>
    </Router>
  );
}

export default App;