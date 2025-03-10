'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section bg-light dark:bg-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto"
          >
            {/* Replace with your image */}
            <div className="w-full h-full bg-gray-300 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Your Photo Here
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-lg -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-md mb-4">Who am I?</h3>
            <p className="mb-4">
              I'm a passionate full-stack developer with expertise in building modern web applications. 
              With a strong foundation in both front-end and back-end technologies, I create seamless 
              digital experiences that solve real-world problems.
            </p>
            <p className="mb-6">
              My journey in web development started 5 years ago, and since then, I've worked on various 
              projects ranging from e-commerce platforms to complex enterprise applications. I'm constantly 
              learning and adapting to new technologies to stay at the forefront of web development.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-bold mb-2">Name:</h4>
                <p>Your Name</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Email:</h4>
                <p>your.email@example.com</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Location:</h4>
                <p>Your City, Country</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Availability:</h4>
                <p>Available for work</p>
              </div>
            </div>

            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center"
            >
              Download Resume
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 12.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 