import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './Navigation';
import Hero from './Hero';
import Projects from './Projects';
import Skills from './Skills';
import About from './About';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll behavior
      gsap.to(window, { duration: 0, scrollTo: 0 });
      
      // Fade in animations for sections
      gsap.fromTo('.section-animate', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.section-animate',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Hero text animations
      gsap.fromTo('.hero-title', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.3 }
      );

      gsap.fromTo('.hero-subtitle', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6 }
      );

      gsap.fromTo('.hero-bio', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9 }
      );

      gsap.fromTo('.hero-buttons', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2 }
      );

    }, containerRef);

    return () => ctx.revert();
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