export default function AboutPage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-8">About Me</h1>
      
      <p className="mb-6">
        Hi! I'm Aranya A Dheu, a passionate developer from Sylhet, Bangladesh. I love building things with code and solving complex problems.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4">What I Do</h2>
      <ul className="list-none p-0 space-y-4">
        <li>🌐 Web Development</li>
        <li>♟️ Chess Analysis</li>
        <li>💻 Competitive Programming</li>
        <li>🧩 Problem Solving</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4">Skills</h2>
      <ul className="list-none p-0 space-y-4">
        <li>Frontend: React, Next.js, Tailwind CSS</li>
        <li>Backend: Node.js, Express</li>
        <li>Languages: JavaScript, TypeScript, Python</li>
        <li>Tools: Git, VS Code, Linux</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4">Get in Touch</h2>
      <p>
        Feel free to reach out to me on{" "}
        <a href="https://github.com/aranyaadheu" className="text-primary hover:underline">
          GitHub
        </a>
        ,{" "}
        <a href="https://www.linkedin.com/in/aranyaadheu/" className="text-primary hover:underline">
          LinkedIn
        </a>
        , or{" "}
        <a href="https://leetcode.com/aranyaadheu/" className="text-primary hover:underline">
          LeetCode
        </a>
        .
      </p>
    </div>
  )
} 