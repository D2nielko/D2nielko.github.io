export default function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-2 px-6 py-12 text-sm text-neutral-500">
        <span>© {new Date().getFullYear()} Daniel Ko</span>
        <span aria-hidden="true">·</span>
        <a
          href="https://github.com/D2nielko"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          GitHub
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="https://www.linkedin.com/in/dkdanielko/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          LinkedIn
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="/feed.xml"
          className="hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          RSS
        </a>
      </div>
    </footer>
  );
}
