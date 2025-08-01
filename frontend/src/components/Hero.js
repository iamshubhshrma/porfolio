import React from 'react';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const scrollToProjects = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: '#projects', offsetY: 80 },
      ease: 'power3.inOut'
    });
  };

  const scrollToContact = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: '#contact', offsetY: 80 },
      ease: 'power3.inOut'
    });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
          <span className="inline-block">Shubham</span>{' '}
          <span className="inline-block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            Sharma
          </span>
        </h1>
        
        <h2 className="hero-subtitle text-xl sm:text-2xl lg:text-3xl text-sky-400 font-semibold mb-8">
          <span className="text-reveal">AI Engineer | Natural Language Processing & MLOps</span>
        </h2>
        
        <p className="hero-bio text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          I build and deploy intelligent language models that bridge the gap between human 
          communication and machine understanding, driving business value through scalable AI.
        </p>
        
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={scrollToProjects}
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25"
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
            className="text-gray-400 hover:text-sky-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/shubham-sharma-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-sky-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center animate-bounce">
          <ArrowDown className="text-sky-400 mb-2" size={24} />
          <div className="w-1 h-8 bg-gradient-to-b from-sky-400 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;