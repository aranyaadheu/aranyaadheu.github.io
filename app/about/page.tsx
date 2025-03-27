'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
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

export default function AboutPage() {
  return (
    <SharedLayout>
      <motion.section
        className="prose dark:prose-invert max-w-none"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div className="mb-4 sm:mb-6" variants={fadeInUp}>
          <h1 className="text-[1.5rem] sm:text-[1.75rem] font-bold font-mono m-0 tracking-tight">About</h1>
        </motion.div>
        
        <motion.p className="mb-4 sm:mb-6 font-pitch text-sm sm:text-base" variants={fadeInUp}>
          Welcome to my blog! I'm <span style={{fontWeight: 900}} className="font-black">Aniruddha Aranya A Dheu</span>, an AI enthusiast who values solitude, cherishes attention to detail, and believes in the power of reflective thinking.
        </motion.p>
        
        <motion.p className="mb-4 sm:mb-6 font-pitch text-sm sm:text-base" variants={fadeInUp}>
          I love connecting the dots between different fields, combining technical expertise with creative insights. Whether it's developing intelligent algorithms, analyzing chess strategies, or writing efficient code, I'm always looking for ways to innovate.
        </motion.p>

        <motion.p className="mb-4 sm:mb-6 font-pitch text-sm sm:text-base" variants={fadeInUp}>
          I believe in lifelong learning and embracing uncertainty. Every challenge is an opportunity to grow and explore new perspectives. My ultimate goal? To create something meaningful while keeping humor alive in everything I do.
        </motion.p>

        <motion.h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold font-mono mt-8 sm:mt-12 mb-4" variants={fadeInUp}>
          Deep diving into
        </motion.h2>
        <motion.ul className="list-none p-0 mb-6 sm:mb-8 space-y-2 font-pitch text-sm sm:text-base" variants={stagger}>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">📊</span> Data Wrangling with pandas, NumPy & Jupyter
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">🧠</span> Large Language Models (LLMs)
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">💻</span> AI/ ML & Data Science 
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">♟️</span> Chess Analysis 
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">🧩</span> Problem Solving
          </motion.li>
        </motion.ul>

        <motion.h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold font-mono mt-8 sm:mt-12 mb-4" variants={fadeInUp}>
          Skills
        </motion.h2>
        <motion.ul className="list-none p-0 mb-6 sm:mb-8 space-y-2 font-pitch text-sm sm:text-base" variants={stagger}>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">⚡</span> Frontend: HTML, CSS
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">🔧</span> Backend: Python
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">💻</span> Languages: Python
          </motion.li>
          <motion.li className="flex items-center" variants={fadeInUp}>
            <span className="mr-2">🛠️</span> Tools: Git, VS Code, Linux, Jupyter Notebook, Colab, Vercel
          </motion.li>
        </motion.ul>

        <motion.h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold font-mono mt-8 sm:mt-12 mb-4" variants={fadeInUp}>
          Get in Touch
        </motion.h2>
        <motion.p className="mb-4 sm:mb-6 font-pitch text-sm sm:text-base" variants={fadeInUp}>
          Feel free to reach out to me on{" "}
          <Link href="https://github.com/aranyaadheu" className="text-primary hover:underline">
            GitHub
          </Link>
          ,{" "}
          <Link href="https://www.linkedin.com/in/aranyaadheu/" className="text-primary hover:underline">
            LinkedIn
          </Link>
          , or{" "}
          <Link href="https://facebook.com/aranyaadheu/" className="text-primary hover:underline">
            Facebook
          </Link>
          .
        </motion.p>
      </motion.section>
    </SharedLayout>
  );
} 
