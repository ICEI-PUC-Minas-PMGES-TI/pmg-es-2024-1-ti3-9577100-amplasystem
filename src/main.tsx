// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Add } from '@carbon/react/icons';
import { GlobalTheme, Button } from '@carbon/react';

import './styles/globals.scss';

const theme = 'g100'; // ← sua implementação, por exemplo, buscando configurações do usuário

const Home = () => (
  <div>
    <h1>Home</h1>
    <Add />
    <Button>Home Button</Button>
  </div>
);

const About = () => (
  <div>
    <h1>About</h1>
    <Button>About Button</Button>
  </div>
);

const App = () => {
  useEffect(() => {
    document.documentElement.dataset['carbonTheme'] = theme;
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </GlobalTheme>
  );
};

export default App;
