'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools';
}

const skillsData: Skill[] = [
  // Frontend
  { name: 'HTML5', icon: '🌐', category: 'frontend' },
  { name: 'CSS3', icon: '🎨', category: 'frontend' },
  { name: 'JavaScript', icon: '📜', category: 'frontend' },
  { name: 'TypeScript', icon: '📘', category: 'frontend' },
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🌊', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'Express', icon: '🚂', category: 'backend' },
  { name: 'MongoDB', icon: '🍃', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
  { name: 'GraphQL', icon: '⬢', category: 'backend' },
  
  // Tools
  { name: 'Git', icon: '📊', category: 'tools' },
  { name: 'GitHub', icon: '🐙', category: 'tools' },
  { name: 'VS Code', icon: '📝', category: 'tools' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'Figma', icon: '🎭', category: 'tools' },
];

const Skills = () => {
  const categories = [
    { id: 'frontend', title: 'Frontend Development' },
    { id: 'backend', title: 'Backend Development' },
    { id: 'tools', title: 'Tools & Technologies' },
  ];

  return (
    <section id="skills" className="section bg-light dark:bg-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-6 text-secondary max-w-2xl mx-auto">
            Here are the technologies and tools I work with on a daily basis.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={category.id}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="heading-md mb-6 text-center md:text-left"
              >
                {category.title}
              </motion.h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skillsData
                  .filter(skill => skill.category === category.id)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + categoryIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center text-center"
                    >
                      <span className="text-3xl mb-2" role="img" aria-label={skill.name}>
                        {skill.icon}
                      </span>
                      <span className="font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 