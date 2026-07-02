import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              Daniel Ko
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
              <a href="#projects" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Skills</a>
              <a href="#experience" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Experience</a>
              <Link href="/blog" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              DK
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Daniel Ko
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Computer Science student at UBC and software developer. I like algorithms and
            competitive programming, and I care about shipping things I can explain end to end —
            from encrypted credential rotation in production to ML pipelines on AWS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              View My Projects
            </a>
            <a href="#contact" className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-3 rounded-lg font-medium transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                I&apos;m a Computer Science student at UBC who likes building software I can reason about
                all the way down. I&apos;ve shipped fixes in production at Optum, led an infrastructure
                deployment in the ROKAF, and built ML and full-stack projects on my own.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Lately I&apos;m focused on algorithms and competitive programming, which is why I&apos;m
                building an interactive algorithm visualizer as the centerpiece of this site.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">Algorithms</span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">Full-Stack</span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">Machine Learning</span>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">BSc. Computer Science</h4>
                  <p className="text-slate-600 dark:text-slate-300">University of British Columbia • 2020 – 2027</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">GPA: 3.80/4.0 • Dean&apos;s Honour List • Outstanding International Student Award</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 — Algorithm Visualizer (centerpiece, in progress) */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium uppercase tracking-wide">
                Coming soon
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Algorithm Visualizer</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  An interactive visualizer for pathfinding algorithms, starting with Dijkstra&apos;s
                  shortest path on a grid. Place walls, run the search, and watch the frontier expand
                  and the path trace back. In active development.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">TypeScript</span>
                  <span className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-sm">Next.js</span>
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-sm">Algorithms</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-400 dark:text-slate-500">In progress</span>
                </div>
              </div>
            </div>

            {/* Project 2 — AI Conversational Companion */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-green-500 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">AI Conversational Companion</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A companion powered by the Anthropic API that returns structured JSON (reply plus
                  emotion) to drive real-time SVG animation. Persists user facts in SQLite across
                  sessions, and cuts API cost by serving simple interactions from canned responses.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-sm">Anthropic API</span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">SQLite</span>
                  <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm">SVG</span>
                </div>
              </div>
            </div>

            {/* Project 3 — LoL Performance Analyzer */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">League of Legends Performance Analyzer</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A machine-learning web app (AWS Rift Rewind Challenge) that scores a player&apos;s
                  match performance against peers in the same rank. Ingests Riot API match history,
                  applies PCA to per-game stats, and serves the model end-to-end on AWS.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-sm">Python</span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm">scikit-learn</span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">AWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "C#", "C++", "SQL", "JavaScript", "TypeScript", "Java", "Rust"].map((s) => (
                  <span key={s} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {["scikit-learn", "Flask", "Vue.js", "Node.js", "React", ".NET"].map((s) => (
                  <span key={s} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {["Oracle", "BigQuery", "SQLite"].map((s) => (
                  <span key={s} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "GCP", "AWS", "Linux", "JUnit", "Azure", "Docker"].map((s) => (
                  <span key={s} className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Experience</h2>
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Software Developer</h3>
                  <p className="text-blue-600 dark:text-blue-400">Optum, UnitedHealth Group</p>
                </div>
                <span className="text-slate-500 dark:text-slate-400">Jan 2026 - Present</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Eliminated a credential-exposure vulnerability by introducing automated encrypted
                credential rotation on a configurable schedule. Automated patch deployment to
                customer sites with a Python packaging pipeline, and fixed production UI defects in
                a WebView2-hosted React app.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">C#</span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm">Python</span>
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-sm">React</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Systems Engineer</h3>
                  <p className="text-blue-600 dark:text-blue-400">Republic of Korea Air Force</p>
                </div>
                <span className="text-slate-500 dark:text-slate-400">Sep 2023 - Jun 2025</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Led a cross-functional team of 11 to deploy a secure intranet separating
                mission-critical from administrative traffic. Built a batch image-rescaling CLI with
                no external libraries, and cut incident response time 75% by authoring playbooks and
                pre-positioning equipment.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-sm">C++</span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm">Python</span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-sm">Infrastructure</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Full Stack Software Developer</h3>
                  <p className="text-blue-600 dark:text-blue-400">Insurance Corporation of British Columbia</p>
                </div>
                <span className="text-slate-500 dark:text-slate-400">Jan - Apr 2023</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Built a full-stack proof-of-concept (Vue.js, Node.js) on GCP Kubernetes at a
                Google x ICBC hackathon to flag over-claiming repair shops, modeling cost data in
                BigQuery. Automated vehicle registration validation and vendor verification with
                Python and Selenium.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm">Vue.js</span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">Node.js</span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-sm">GCP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Get In Touch</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            I&apos;m always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="mailto:dannieko02@gmail.com" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              dannieko02@gmail.com
            </a>
            <a href="https://github.com/D2nielko" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dkdanielko/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
              </svg>
              LinkedIn
            </a>
          </div>
          <div className="mt-8">
            <a href="/resume.pdf" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 Daniel Ko. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
