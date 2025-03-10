'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  // Remove state for now to simplify
  const isMenuOpen = false;

  return (
    <header className="fixed w-full bg-white/80 dark:bg-dark/80 backdrop-blur-sm z-50 py-4">
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="#skills" className="hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 