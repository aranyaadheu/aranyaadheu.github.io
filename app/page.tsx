'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Icons } from '@/components/ui/icons';

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
    <main>
      {/* Header/Navigation */}
      <motion.header
        className="mb-16 pb-4 border-b border-orange-300/20"
        initial="hidden"
        animate="show"
        variants={fadeInUp}
      >
        <Navigation />
      </motion.header>

      {/* Welcome Section */}
      <motion.section
        className="prose dark:prose-invert max-w-none"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div className="mb-12" variants={fadeInUp}>
          <h1 className="text-[2.5rem] md:text-[3rem] font-bold font-mono m-0 tracking-tight">Welcome to My Blog</h1>
        </motion.div>
        
        <motion.p className="mb-6 font-pitch" variants={fadeInUp}>
          Hi, I'm <strong>Aniruddha Aranya A Dheu</strong>, aka <strong>aranyaadheu</strong> who thrives for knowledge and is a wannabe comedian. 
          Consistently making each and every day count for the uncertainty. 
          Trying out materials and resources to gather experience in each tech field possible. 
          
          I specialize in <strong>Python Programming Language</strong> and <strong>competitive programming</strong>, 
          with a deep interest in AI/ ML and Data Science.
        </motion.p>

        <motion.p className="mb-8 font-pitch" variants={fadeInUp}>
          On this blog, I'll share insights about:
        </motion.p>

        <motion.ul className="list-none p-0 mb-8 space-y-2 font-pitch" variants={stagger}>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">⚡</span> Python
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">♟️</span> Chess Analysis and Strategies
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">💻</span> Competitive Programming Tips
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">🚀</span> Problem-Solving Techniques
          </motion.li>
        </motion.ul>

        <motion.p className="mb-8 font-pitch" variants={fadeInUp}>
          Whether you're a developer, chess enthusiast, or problem-solving aficionado, you'll find value here!
        </motion.p>

        <motion.div className="mb-12" variants={fadeInUp}>
          <div className="flex items-center space-x-4 font-pitch">
            <span className="text-lg">Connect with me:</span>
            <div className="flex items-center space-x-3">
              <Link 
                href="https://github.com/aranyaadheu" 
                className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.github className="w-6 h-6" />
              </Link>
              <Link 
                href="https://facebook.com/aranyaadheu" 
                className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.facebook className="w-6 h-6" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/aranyaadheu/" 
                className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col space-y-8">
          <Link 
            href="/posts" 
            className="block text-center hover:text-zinc-300 transition-colors border-b border-orange-300/20 pb-4"
          >
            All Posts →
          </Link>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-6">
              <Link 
                href="https://github.com/aranyaadheu" 
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.github className="w-5 h-5" />
              </Link>
              <Link 
                href="https://facebook.com/aranyaadheu" 
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/aranyaadheu/" 
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.linkedin className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-zinc-500">Copyright © 2025 | All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
} 