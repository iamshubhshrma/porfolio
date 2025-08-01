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
    // Simple fade-in animation for sections without GSAP context issues
    const sections = document.querySelectorAll('.section-animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'opacity 1s ease, transform 1s ease';
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
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