'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product listings, cart functionality, and secure checkout.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/projects/ecommerce.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/ecommerce"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app that helps users organize tasks, set deadlines, and track progress.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    imageUrl: "/projects/taskmanager.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/taskmanager"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather application that provides real-time weather data and forecasts for locations worldwide.",
    technologies: ["React", "OpenWeather API", "Chart.js", "Styled Components"],
    imageUrl: "/projects/weather.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/weather"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-6 text-secondary max-w-2xl mx-auto">
            Here are some of my recent projects. Each project reflects my skills and expertise in different technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark shadow-lg rounded-lg overflow-hidden"
            >
              <div className="h-48 bg-gray-300 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Project Image
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-sm mb-2">{project.title}</h3>
                <p className="text-secondary mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    Live Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline flex items-center"
                  >
                    GitHub
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 