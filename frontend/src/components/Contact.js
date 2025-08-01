import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-content', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1.2,
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

      gsap.fromTo('.contact-item', 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="text-sky-400" size={20} />,
      label: "Email",
      value: "shubham.s.ai.engineer@email.com",
      link: "mailto:shubham.s.ai.engineer@email.com"
    },
    {
      icon: <Linkedin className="text-sky-400" size={20} />,
      label: "LinkedIn",
      value: "linkedin.com/in/shubham-sharma-ai",
      link: "https://linkedin.com/in/shubham-sharma-ai"
    },
    {
      icon: <Github className="text-sky-400" size={20} />,
      label: "GitHub",
      value: "github.com/shubham-ai-dev",
      link: "https://github.com/shubham-ai-dev"
    },
    {
      icon: <MapPin className="text-sky-400" size={20} />,
      label: "Location",
      value: "Delhi, India",
      link: null
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-animate py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="contact-content text-4xl sm:text-5xl font-bold text-white mb-4">
            Let's Build Something Intelligent
          </h2>
          <p className="contact-content text-xl text-gray-400 max-w-2xl mx-auto">
            I'm currently seeking new opportunities and am always open to interesting collaborations. 
            Feel free to reach out via email or connect with me on social media.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="contact-content space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item flex items-center space-x-4 p-4 bg-slate-900/40 rounded-lg border border-slate-700 hover:border-sky-400/50 transition-all duration-300">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">{item.label}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-sky-400 transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="contact-content bg-slate-900/60 border-slate-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-sky-400"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-sky-400"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-sky-400 resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  <Send size={18} />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;