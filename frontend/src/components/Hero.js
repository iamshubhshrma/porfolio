import React, { useEffect } from 'react';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  useEffect(() => {
    // Simple staggered animations without GSAP
    const elements = [
      '.hero-title',
      '.hero-subtitle', 
      '.hero-bio',
      '.hero-buttons'
    ];

    elements.forEach((className, index) => {
      const element = document.querySelector(className);
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 300 + (index * 300));
      }
    });
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
          Shubham Sharma
        </h1>
        
        <h2 className="hero-subtitle text-xl sm:text-2xl lg:text-3xl text-sky-400 font-semibold mb-8">
          AI Engineer | Natural Language Processing & MLOps
        </h2>
        
        <p className="hero-bio text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          I build and deploy intelligent language models that bridge the gap between human 
          communication and machine understanding, driving business value through scalable AI.
        </p>
        
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={scrollToProjects}
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View My Projects
          </Button>
          
          <Button 
            onClick={scrollToContact}
            variant="outline"
            className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Contact Me
          </Button>
        </div>
        
        <div className="hero-buttons flex justify-center space-x-6">
          <a
            href="https://github.com/shubham-ai-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-sky-400 transition-colors duration-300 transform hover:scale-110"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/shubham-sharma-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-sky-400 transition-colors duration-300 transform hover:scale-110"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-sky-400" size={24} />
      </div>
    </section>
  );
};

export default Hero;