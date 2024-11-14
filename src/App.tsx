import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsolePage from './pages/ConsolePage/ConsolePage';
import ReviewPage from './pages/ReviewPage/ReviewPage';

function App() {
  console.log("App is rendering");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsolePage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;