import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the provider
import Navbar from './components/Navbar/Navbar';
import StreamList from './components/StreamList/StreamList';
import Movies from './components/Movie/Movies';
import About from './components/About';
import Cart from './components/Cart/Cart';
//import 'https://fonts.googleapis.com/icon?family=Material+Icons';
import './App.css';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> {/* Wrap with the provider */}
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
    </GoogleOAuthProvider>
  );
};

export default App;
