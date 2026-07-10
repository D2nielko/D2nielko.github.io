import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "CS student at UBC and software developer — projects, experience, and skills.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>

      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        I&apos;m a Computer Science student at the University of British Columbia
        (BSc, 2020–2027), Dean&apos;s Honour List and Outstanding International
        Student Award recipient, and a software developer. I&apos;m interested in
        frontier AI, software engineering, and quant, and I spend a fair amount of
        time on competitive programming and ICPC prep.
      </p>

      <h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">Projects</h2>
      <ul className="space-y-6">
        <li>
          <div className="font-medium">
            <Link href="/visualizer/" className="hover:text-neutral-600 dark:hover:text-neutral-300 underline underline-offset-2">
              Algorithm Visualizer
            </Link>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            An interactive 3D visualizer for Dijkstra&apos;s pathfinding algorithm, live on this
            site — place walls, run the search, and watch the frontier expand and the path trace back.
          </p>
          <p className="text-xs text-neutral-400 font-mono mt-1">TypeScript, Next.js</p>
        </li>
        <li>
          <div className="font-medium">AI Conversational Companion</div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            A companion powered by the Anthropic API that returns structured JSON (reply plus
            emotion) to drive real-time SVG animation, persists user facts in SQLite across
            sessions, and cuts API cost by serving simple interactions from canned responses.
          </p>
          <p className="text-xs text-neutral-400 font-mono mt-1">Anthropic API, SQLite, SVG</p>
        </li>
        <li>
          <div className="font-medium">League of Legends Performance Analyzer</div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            A machine-learning web app that scores a player&apos;s match performance against peers
            in the same rank, ingesting Riot API match history and applying PCA to per-game stats.
          </p>
          <p className="text-xs text-neutral-400 font-mono mt-1">Riot API, PCA, scikit-learn, AWS</p>
        </li>
      </ul>

      <h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">Experience</h2>
      <ul className="space-y-6">
        <li>
          <div className="font-medium">Software Developer — Optum, UnitedHealth Group</div>
          <div className="text-xs text-neutral-400 font-mono">Jan 2026 – Present</div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Eliminated a credential-exposure vulnerability with automated encrypted credential
            rotation, automated patch deployment to customer sites with a Python packaging
            pipeline, and fixed production UI defects in a WebView2-hosted React app.
          </p>
        </li>
        <li>
          <div className="font-medium">Systems Engineer — Republic of Korea Air Force</div>
          <div className="text-xs text-neutral-400 font-mono">Sep 2023 – Jun 2025</div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Led a cross-functional team of 11 to deploy a secure intranet separating
            mission-critical from administrative traffic, built a batch image-rescaling CLI with
            no external libraries, and cut incident response time 75% by authoring playbooks and
            pre-positioning equipment.
          </p>
        </li>
        <li>
          <div className="font-medium">Full Stack Software Developer — ICBC</div>
          <div className="text-xs text-neutral-400 font-mono">Jan – Apr 2023</div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Built a full-stack proof-of-concept (Vue.js, Node.js) on GCP Kubernetes at a Google x
            ICBC hackathon to flag over-claiming repair shops, modeling cost data in BigQuery, and
            automated vehicle registration validation and vendor verification with Python and Selenium.
          </p>
        </li>
      </ul>

      <h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">Skills</h2>
      <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
        <p>
          <span className="font-mono text-neutral-400">Languages: </span>
          Python, C#, C++, SQL, JavaScript, TypeScript, Java, Rust
        </p>
        <p>
          <span className="font-mono text-neutral-400">Frameworks: </span>
          scikit-learn, Flask, Vue.js, Node.js, React, .NET
        </p>
        <p>
          <span className="font-mono text-neutral-400">Databases: </span>
          Oracle, BigQuery, SQLite
        </p>
        <p>
          <span className="font-mono text-neutral-400">Tools: </span>
          Git, GCP, AWS, Linux, JUnit, Azure, Docker
        </p>
      </div>

      <h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">Contact</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        <a href="mailto:dannieko02@gmail.com" className="hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-2">
          dannieko02@gmail.com
        </a>
        {" · "}
        <a href="https://github.com/D2nielko" className="hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-2">
          GitHub
        </a>
        {" · "}
        <a href="https://www.linkedin.com/in/dkdanielko/" className="hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-2">
          LinkedIn
        </a>
      </p>
    </div>
  );
}
