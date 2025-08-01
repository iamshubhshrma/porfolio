import React, { useEffect, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simple scroll-triggered animation
    const cards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, index * 300);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(60px) scale(0.9)';
      card.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const projects = [
    {
      title: "Intelligent Document Processing (IDP) for Automated Invoice Analysis",
      description: "Developed an end-to-end pipeline to automatically extract, classify, and validate key information—such as vendor name, invoice date, line items, and total amount—from thousands of unstructured PDF invoices, streamlining accounts payable workflows.",
      techStack: ["Python", "TensorFlow", "spaCy", "PyMuPDF", "OpenCV", "Docker", "FastAPI", "AWS S3"],
      result: "Reduced manual data entry time by 95% and decreased processing errors by 99%",
      githubUrl: "https://github.com/shubham-ai-dev/intelligent-document-processing",
      caseStudyUrl: "#"
    },
    {
      title: "Multilingual Customer Support Chatbot for E-commerce",
      description: "Engineered a conversational AI agent capable of handling customer queries in both English and Hindi. The chatbot manages user intents, answers FAQs from a knowledge base, and seamlessly escalates complex issues to human agents.",
      techStack: ["Python", "PyTorch", "Hugging Face Transformers", "Rasa", "Docker", "Kubernetes", "GCP"],
      result: "Automated 60% of incoming customer support tickets and improved user satisfaction scores by 25%",
      githubUrl: "https://github.com/shubham-ai-dev/multilingual-chatbot",
      demoUrl: "#"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="section-animate py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">My Work</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my latest AI/ML projects that solve real-world problems with cutting-edge technology
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => (
            <Card key={index} className="project-card bg-slate-900/80 border-slate-700 hover:border-sky-400/50 transition-all duration-500 transform hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-2xl text-white mb-4">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="bg-sky-500/20 text-sky-300 hover:bg-sky-500/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-gray-300 text-lg leading-relaxed mb-6">
                  {project.description}
                </CardDescription>
                
                <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 p-4 rounded-lg mb-6 border border-sky-500/30">
                  <p className="text-sky-300 font-semibold text-lg">
                    Key Result: {project.result}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github size={18} />
                    View on GitHub
                  </Button>
                  
                  {project.caseStudyUrl && (
                    <Button 
                      variant="outline" 
                      className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                      onClick={() => window.open(project.caseStudyUrl, '_blank')}
                    >
                      <ExternalLink size={18} />
                      Read Case Study
                    </Button>
                  )}
                  
                  {project.demoUrl && (
                    <Button 
                      variant="outline" 
                      className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                      onClick={() => window.open(project.demoUrl, '_blank')}
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;