'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container-custom z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left md:max-w-2xl"
        >
          <h1 className="heading-xl mb-4">
            <span className="block">Hi, I'm</span>
            <span className="text-primary">Your Name</span>
          </h1>
          <h2 className="heading-md text-secondary mb-6">
            Full Stack Developer & Designer
          </h2>
          <p className="text-lg mb-8 text-secondary">
            I build exceptional and accessible digital experiences for the web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="#projects" className="btn btn-primary">
              View My Work
            </Link>
            <Link href="#contact" className="btn btn-secondary">
              Contact Me
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero; 