import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image', 
        { opacity: 0, x: -50, rotationY: -15 },
        { 
          opacity: 1, 
          x: 0, 
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.about-content', 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleResumeDownload = () => {
    // Placeholder functionality - in real implementation, this would download the actual resume
    window.open('/Shubham_Sharma_Resume.pdf', '_blank');
  };

  return (
    <section id="about" ref={sectionRef} className="section-animate py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">About Shubham</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Passionate about leveraging AI to solve complex real-world problems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="about-image flex justify-center lg:justify-start">
            <Card className="bg-slate-900/60 border-slate-700 overflow-hidden transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-0">
                <img
                  src="https://via.placeholder.com/400x400/1e293b/38bdf8?text=Shubham+Sharma"
                  alt="Shubham Sharma"
                  className="w-full h-96 object-cover"
                />
              </CardContent>
            </Card>
          </div>

          {/* About Content */}
          <div className="about-content space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                My journey into AI began at Delhi Technological University, sparked by a project 
                analyzing sentiment in parliamentary speeches. This fascination with language led 
                me to specialize in NLP, where I focus on building models that are not only accurate 
                but also robust and scalable in production environments.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I am passionate about leveraging MLOps best practices to ensure AI solutions deliver 
                sustained, real-world impact. My expertise spans from research and development to 
                production deployment, with a particular focus on natural language processing and 
                conversational AI systems.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Outside of work, I'm an avid landscape photographer, which teaches me patience and 
                an eye for detail—qualities that translate directly into my approach to machine 
                learning and system design.
              </p>
            </div>

            <Button 
              onClick={handleResumeDownload}
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 text-lg font-semibold flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
            >
              <Download size={20} />
              Download My Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;