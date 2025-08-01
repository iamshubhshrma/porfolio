import React, { useEffect, useRef } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Projects from './Projects';
import Skills from './Skills';
import About from './About';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';

const Portfolio = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Ensure all content is visible immediately
    const sections = document.querySelectorAll('.section-animate');
    sections.forEach((section) => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    });

    // Add a simple fade-in animation after content is visible
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1
      });

      sections.forEach((section) => observer.observe(section));
      
      return () => {
        sections.forEach((section) => observer.unobserve(section));
      };
    }, 100);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-900 text-gray-200">
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;