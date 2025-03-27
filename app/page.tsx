'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icons } from '@/components/ui/icons';
import { SharedLayout } from '@/components/shared-layout';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <SharedLayout isHomePage={true}>
      {/* Welcome Section */}
      <motion.section
        className="prose dark:prose-invert max-w-none"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div className="mb-8 sm:mb-12" variants={fadeInUp}>
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold font-mono m-0 tracking-tight">Welcome to My Blog</h1>
        </motion.div>
        
        <motion.p className="mb-4 sm:mb-6 font-pitch text-sm sm:text-base" variants={fadeInUp}>
          Hi, I'm <span style={{fontWeight: 900}} className="font-black">Aniruddha Aranya A Dheu</span> who thrives for knowledge and is a wannabe comedian. 
          Consistently making each and every day count for the uncertainty. 
          Trying out materials and resources to gather experience in each tech field possible. 
          
          I specialize in <span style={{fontWeight: 900}} className="font-black">Python Programming Language</span> with a deep interest in <span style={{fontWeight: 900}} className="font-black">LLMs, AI/ ML & Data Science.</span>
        </motion.p>

        <motion.p className="mb-4 sm:mb-8 font-pitch text-sm sm:text-base" variants={fadeInUp}>
          On this blog, I'll share insights and experiments around:
        </motion.p>

        <motion.ul className="list-none p-0 mb-6 sm:mb-8 space-y-2 font-pitch text-sm sm:text-base" variants={stagger}>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">⚡</span> Deep dives into Python
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">♟️</span> Chess Analysis and Strategies
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">⚙️</span> Developing and optimizing prompts to efficiently apply and build with LLMs for a wide variety of applications and use cases. 
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">💻</span> Competitive Programming Tips
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">🚀</span> Startup insights
          </motion.li>
        </motion.ul>

        <motion.p className="mb-6 sm:mb-8 font-pitch text-sm sm:text-base" variants={fadeInUp}>
          Whether you're a developer, chess enthusiast, or an AI aficionado, you'll find value here!
        </motion.p>

        <motion.div className="mb-8 sm:mb-12" variants={fadeInUp}>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 font-pitch">
            <span className="text-base sm:text-lg">Connect with me:</span>
            <div className="flex items-center space-x-4">
              <Link 
                href="https://github.com/aranyaadheu" 
                className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.github className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link 
                href="https://facebook.com/aranyaadheu" 
                className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/aranyaadheu/" 
                className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Posts Link Section with top and bottom borders */}
      <motion.div 
        className="mt-8 sm:mt-16"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <div className="border-t border-orange-300/20 dark:border-[#ac4c0c]" />
        <div className="py-6">
          <Link 
            href="/posts" 
            className="block text-center hover:text-zinc-300 transition-colors"
          >
            All Posts →
          </Link>
        </div>
        <div className="border-b border-orange-300/20 dark:border-[#ac4c0c]" />
      </motion.div>
    </SharedLayout>
  );
} 
