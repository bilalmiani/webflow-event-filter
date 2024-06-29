import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import EventDetail from './EventDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-3xl font-bold mb-4 text-black text-center">Event Search</h1>
        <Routes>
          <Route path="/" element={<SearchFilter />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
