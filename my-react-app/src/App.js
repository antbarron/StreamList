import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import StreamList from './components/StreamList/StreamList';
import Movies from './components/Movie/Movies';
import About from './components/About';
import Cart from './components/Cart/Cart';

import './App.css'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movie/:title" element={<Movies />} />
        <Route path="/movie/:id" element={<Movies />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
