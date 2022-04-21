import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Cat from './pages/cat/cat'
import Dog from './pages/dog/dog';
import Pig from './pages/pig/pig';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='cat' element={<Cat/>}/>
        <Route path='dog' element={<Dog/>}/>
        <Route path='pig' element={<Pig/>}/>
      </Routes>
    </div>
  );
}

export default App;
