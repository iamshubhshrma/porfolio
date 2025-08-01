import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navigation from './Navigation';
import Hero from './Hero';
import Projects from './Projects';
import Skills from './Skills';
import About from './About';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Portfolio = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the initial page load
      const tl = gsap.timeline();
      
      // Page load animations
      tl.from('.nav-container', {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero-bio', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.2');

      // Scroll-triggered animations for sections
      gsap.utils.toArray('.section-animate').forEach((section, index) => {
        gsap.fromTo(section, 
          { 
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Project cards staggered animation
      gsap.fromTo('.project-card', 
        { 
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotationX: 10
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Skills cards floating animation
      gsap.fromTo('.skill-category', 
        { 
          y: 60,
          opacity: 0,
          rotationY: 15
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.skill-category',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Tech badges animation
      gsap.fromTo('.skill-badge', 
        { 
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.skill-badge',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // About section split animation
      gsap.fromTo('.about-image', 
        { 
          x: -100,
          opacity: 0,
          rotationY: -20
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.about-content', 
        { 
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Certification cards 3D effect
      gsap.fromTo('.cert-card', 
        { 
          y: 50,
          opacity: 0,
          rotationX: -15,
          transformPerspective: 1000
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cert-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact section animation
      gsap.fromTo('.contact-content', 
        { 
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact info items
      gsap.fromTo('.contact-item', 
        { 
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-item',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax effect for hero background
      gsap.to('#hero', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Text reveal animations
      gsap.utils.toArray('.text-reveal').forEach(text => {
        gsap.fromTo(text, 
          { 
            clipPath: 'inset(0 100% 0 0)' 
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-900 text-gray-200 overflow-x-hidden">
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