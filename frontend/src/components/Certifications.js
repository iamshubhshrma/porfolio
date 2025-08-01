import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-card', 
        { opacity: 0, y: 40, rotationX: -10 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 1,
          stagger: 0.3,
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

  const certifications = [
    {
      name: "TensorFlow Developer Certificate",
      issuer: "Google",
      credentialId: "G-CERT-9821-XYZ",
      verifyUrl: "#",
      description: "Demonstrates proficiency in building and training neural networks using TensorFlow",
      logoText: "TF"
    },
    {
      name: "AWS Certified Machine Learning - Specialty",
      issuer: "Amazon Web Services",
      credentialId: "AWS-ML-S-5432-ABC",
      verifyUrl: "#",
      description: "Validates expertise in building, training, and deploying ML models on AWS",
      logoText: "AWS"
    }
  ];

  return (
    <section id="certifications" ref={sectionRef} className="section-animate py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Certifications</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional certifications that validate my expertise in AI and cloud technologies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Card key={index} className="cert-card bg-slate-900/60 border-slate-700 hover:border-sky-400/50 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-slate-800 border border-sky-400/30 flex items-center justify-center">
                        <span className="text-sky-400 font-bold text-sm">TF</span>
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white mb-1">{cert.name}</CardTitle>
                      <CardDescription className="text-sky-400 font-medium">{cert.issuer}</CardDescription>
                    </div>
                  </div>
                  <Award className="text-sky-400 flex-shrink-0" size={24} />
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {cert.description}
                </p>
                
                <div className="mb-4">
                  <Badge className="bg-slate-800 text-gray-300 border border-slate-600">
                    ID: {cert.credentialId}
                  </Badge>
                </div>
                
                <Button 
                  variant="outline" 
                  className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open(cert.verifyUrl, '_blank')}
                >
                  <ExternalLink size={16} />
                  Verify Credential
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;