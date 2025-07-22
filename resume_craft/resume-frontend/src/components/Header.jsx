import React, { useState, useEffect } from 'react';
import { Menu, X, User, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const navLinks = [
  //   { name: 'About', href: '/about' },
  //   { name: 'Examples', href: '/examples' },
  //   { name: 'Contact', href: '/contact' },
  //   { name: 'Help', href: '/help' }
  // ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/20 backdrop-blur-2xl border-b border-white/20 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
              ResumeCraft
            </span>
          </div>
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="relative text-white/80 hover:text-white font-medium transition-colors duration-300 group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div> */}

          {/* Desktop Auth & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to={"/login"}>
            <button className="group flex items-center space-x-2 text-white/80 hover:text-white font-medium px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300">
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Login</span>
            </button>
            </Link>
            
            <Link to={"/signup"}>
            <button className="text-white/80 hover:text-white font-medium px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300">
              Sign Up
            </button>
            </Link>

            <Link to='/build'>
            <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 overflow-hidden">
              <span className="relative z-10">Build Resume</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white/10 backdrop-blur-2xl border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {/* {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block text-white/80 hover:text-white font-medium py-2 px-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))} */}
            
            <div className="pt-4 border-t border-white/20 space-y-3">
              <button 
                className="w-full flex items-center justify-center space-x-2 text-white/80 hover:text-white font-medium py-3 px-4 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
              
              <button 
                className="w-full text-white/80 hover:text-white font-medium py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </button>
              
              <Link to='/build'>
              <button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                <span>Build Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none transition-opacity duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`} />
    </nav>
  );
};

export default Header;