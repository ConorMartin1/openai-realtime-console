import React from 'react';
import ConsolePage from './pages/ConsolePage';

function App() {
  console.log("App is rendering"); // Add this to check if App renders
  return (
    <div>
      <ConsolePage />
    </div>
  );
}

export default App;