import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const sectionRef = useRef(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim() || formData.name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors[0],
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${API}/contact`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });

      if (response.data.success) {
        setSubmitStatus('success');
        toast({
          title: "Message Sent Successfully!",
          description: response.data.message,
          variant: "default"
        });
        
        // Clear form
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus('error');
      
      if (error.response?.status === 429) {
        toast({
          title: "Rate Limit Exceeded",
          description: "Please wait a moment before sending another message.",
          variant: "destructive"
        });
      } else if (error.response?.data?.detail) {
        toast({
          title: "Error",
          description: error.response.data.detail,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
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
                <div key={index} className="contact-item flex items-center space-x-4 p-4 bg-slate-900/40 rounded-lg border border-slate-700 hover:border-sky-400/50 transition-all duration-300 transform hover:scale-[1.02]">
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
          <Card className="contact-content bg-slate-900/60 border-slate-700 hover:border-sky-400/30 transition-all duration-300">
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
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-sky-400 transition-all duration-300"
                    disabled={isSubmitting}
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
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-sky-400 transition-all duration-300"
                    disabled={isSubmitting}
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
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-sky-400 resize-none transition-all duration-300"
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                    submitStatus === 'success' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : submitStatus === 'error'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-sky-500 hover:bg-sky-600'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={18} />
                      Message Sent!
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <AlertCircle size={18} />
                      Try Again
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
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