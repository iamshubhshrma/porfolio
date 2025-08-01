import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Brain, Cloud, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-category', 
        { opacity: 0, y: 40, rotationX: -15 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.skill-badge', 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: "Programming & Data",
      icon: <Code className="text-sky-400" size={24} />,
      skills: ["Python", "SQL", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"]
    },
    {
      title: "NLP Frameworks",
      icon: <Brain className="text-sky-400" size={24} />,
      skills: ["Hugging Face Transformers", "spaCy", "NLTK", "Gensim", "Rasa"]
    },
    {
      title: "Deep Learning",
      icon: <Database className="text-sky-400" size={24} />,
      skills: ["PyTorch", "TensorFlow", "Keras"]
    },
    {
      title: "MLOps & Cloud",
      icon: <Cloud className="text-sky-400" size={24} />,
      skills: ["Docker", "Kubernetes", "MLflow", "FastAPI", "AWS (SageMaker, S3, EC2)", "GCP (Vertex AI, GKE)"]
    },
    {
      title: "Tools",
      icon: <Settings className="text-sky-400" size={24} />,
      skills: ["Git", "Jira", "Jenkins", "Linux"]
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="section-animate py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building and deploying intelligent AI systems
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Card key={index} className="skill-category bg-slate-900/60 border-slate-700 hover:border-sky-400/50 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  {category.icon}
                </div>
                <CardTitle className="text-xl text-white">{category.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      className="skill-badge bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;