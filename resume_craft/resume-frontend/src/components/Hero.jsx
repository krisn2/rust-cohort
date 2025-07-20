import React, { useState, useEffect } from 'react';
import { FileText, Download, Sparkles, ArrowRight, CheckCircle, Star } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI-Powered Builder',
    // description: 'Smart suggestions and auto-formatting help you create the perfect resume in minutes, not hours.',
    description: 'Coming Soon',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Instant PDF Export',
    description: 'Download ATS-optimized PDFs that pass through applicant tracking systems seamlessly.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Premium Templates',
    description: 'Access professionally designed templates crafted by hiring managers and designers.',
    color: 'from-emerald-500 to-teal-500'
  },
];

const testimonials = [
  { name: "Sarah M.", role: "Software Engineer", text: "Got 3 interviews in my first week!" },
  { name: "Mike R.", role: "Marketing Manager", text: "Landed my dream job at Google" },
  { name: "Lisa K.", role: "Designer", text: "The templates are absolutely stunning" }
];

const Hero = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-14">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px',
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 sm:px-10 py-12">
        {/* Trust indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/90 text-sm">Trusted by 100K+ professionals</span>
          </div>
        </div>

        {/* Hero Title with enhanced typography */}
        <div className="flex justify-center my-12">
          <div className="max-w-4xl text-center">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight mb-6 animate-fade-in">
              Craft Your Resume,
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Land Your Dream Job
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Create professional, ATS-friendly resumes in minutes with our AI-powered builder. 
              Stand out from the crowd and get hired faster.
            </p>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-12">
          <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Build My Resume Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="text-white/90 hover:text-white font-medium px-6 py-4 rounded-2xl border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/5">
            View Templates
          </button>
        </div>

        {/* Social proof */}
        <div className="flex justify-center mb-16">
          <div className="text-center">
            <p className="text-white/60 text-sm mb-4">Join thousands who got hired this month</p>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white/80">{testimonials[currentTestimonial].text}</span>
              <span className="text-white/60">- {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].role}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group w-full max-w-sm p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 hover:bg-white/10 cursor-pointer relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed text-base group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '1K+', label: 'Resumes Created' },
            { number: '95%', label: 'Success Rate' },
            { number: '1K+', label: 'User' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;