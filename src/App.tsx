import React from 'react';
import './App.css';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Services from './components/Services';
import Contact from './components/Contact';

/**
 * Главный компонент приложения — собирает все секции портфолио.
 * Навигация фиксирована сверху с mix-blend-mode: difference.
 */
function App() {
  return (
    <div className="App">
      {/* Кастомный курсор — только на десктопе */}
      <CustomCursor />

      {/* Навигация */}
      <nav className="nav">
        <div className="nav__logo">HERO</div>
        <div className="nav__links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Секции страницы */}
      <Hero />
      <About />
      <Work />
      <Services />
      <Contact />

      {/* Футер */}
      <footer className="footer">
        <span className="footer__text">
          &copy; 2026 Hero Design. All rights reserved.
        </span>
        <span className="footer__text">Creative Studio</span>
      </footer>
    </div>
  );
}

export default App;
