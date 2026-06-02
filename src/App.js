import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'Work', page: 'portfolio' },
  { label: 'About', page: 'about' },
  { label: 'Notes', page: 'blog' },
  { label: 'Skills', page: 'skills' },
  { label: 'Photos', page: 'photography' },
];

const projects = [
  {
    id: 'verdantops-carbon-console',
    title: 'VerdantOps Carbon Console',
    description:
      'A sustainability dashboard that turns cloud usage, deployment activity, and team habits into measurable carbon-aware product decisions.',
    stack: ['Vue.js', 'Django', 'PostgreSQL', 'Azure', 'APIs'],
    role: 'Full-stack product builder',
    impact: 'Reduced reporting friction with automated ingestion, clear audit trails, and decision-ready insights.',
    link: 'Case study',
    layout: 'large',
  },
  {
    id: 'harbor-cicd-control-room',
    title: 'Harbor CI/CD Control Room',
    description:
      'A deployment observability concept for safer releases across containers, infrastructure plans, and environment health checks.',
    stack: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    role: 'Cloud and DevOps engineer',
    impact: 'Designed for calm release confidence with visual checks before production changes.',
    link: 'Architecture',
  },
  {
    id: 'civic-routes-api',
    title: 'Civic Routes API',
    description:
      'A resilient API layer for location-aware community services, built with structured data, clean endpoints, and pragmatic caching.',
    stack: ['Python', 'Django', 'PostgreSQL', 'REST APIs'],
    role: 'Backend developer',
    impact: 'Improved query clarity and made future mobile/web clients easier to integrate.',
    link: 'GitHub',
  },
  {
    id: 'lens-notes',
    title: 'Lens Notes',
    description:
      'A personal photography journal that pairs image sets with field notes, locations, moods, and technical reflections.',
    stack: ['React', 'CSS', 'IndexedDB', 'UI/UX'],
    role: 'Designer-developer',
    impact: 'Turned a creative habit into a browsable editorial archive.',
    link: 'Live demo',
  },
];

const milestones = [
  ['2023', 'Built the habit', 'Started connecting software engineering fundamentals with product-minded side projects.'],
  ['2024', 'Cloud curiosity', 'Explored Azure, containers, infrastructure thinking, and the craft of shipping dependable systems.'],
  ['2025', 'Sustainability lens', 'Focused more intentionally on climate-aware products and data that helps people act.'],
  ['Next', 'Creative engineering', 'Growing toward full-stack work where code, systems, design, and storytelling meet.'],
];

const posts = [
  {
    id: 'learning-cloud-like-a-builder',
    title: 'Learning cloud like a builder, not a tourist',
    category: 'Cloud',
    date: 'May 18, 2026',
    time: '6 min read',
    excerpt: 'A practical way to move from console-clicking to repeatable systems thinking.',
    featured: true,
  },
  {
    id: 'what-full-stack-feels-like',
    title: 'What full-stack actually feels like on a real project',
    category: 'Full-stack',
    date: 'Apr 27, 2026',
    time: '5 min read',
    excerpt: 'Notes on boundaries, tradeoffs, and making frontend and backend decisions feel coherent.',
  },
  {
    id: 'sustainability-tech-product-taste',
    title: 'Sustainability tech needs better product taste',
    category: 'Sustainability',
    date: 'Apr 09, 2026',
    time: '4 min read',
    excerpt: 'Why climate tools need to be clearer, calmer, and closer to daily decisions.',
  },
  {
    id: 'devops-lessons-from-breaking-deploy',
    title: 'DevOps lessons from breaking my own deploy',
    category: 'DevOps',
    date: 'Mar 15, 2026',
    time: '7 min read',
    excerpt: 'The kind of reliability lesson that stays with you because it made you sweat first.',
  },
  {
    id: 'street-photographs-interface-research',
    title: 'Street photographs as interface research',
    category: 'Photography',
    date: 'Feb 22, 2026',
    time: '3 min read',
    excerpt: 'How framing, contrast, and patience show up again in product design.',
  },
];

const skills = [
  ['Frontend', ['JavaScript', 'React', 'Vue.js', 'Responsive UI', 'Accessibility', 'UI/UX thinking']],
  ['Backend', ['Python', 'Django', 'REST APIs', 'Auth flows', 'Testing', 'System design']],
  ['Cloud', ['Azure', 'AWS concepts', 'Networking basics', 'Observability', 'Cost awareness']],
  ['DevOps', ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions']],
  ['Data', ['PostgreSQL', 'SQL modelling', 'Caching', 'Data validation']],
  ['Creative', ['Photography', 'Editorial layout', 'Brand systems', 'Visual storytelling']],
];

const photos = [
  { src: '/assets/photo-garden.jpg', title: 'Garden weather', category: 'travel' },
  { src: '/assets/photo-portrait-frame.jpg', title: 'Portrait frame', category: 'portraits' },
  { src: '/assets/me-portrait-main.png', title: 'Studio study', category: 'portraits' },
  { src: '/assets/photo-garden.jpg', title: 'Cloud color', category: 'landscapes' },
  { src: '/assets/photo-portrait-frame.jpg', title: 'Festival geometry', category: 'urban' },
];

function pagePath(page) {
  return `#/${page}`;
}

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '') || 'home';
  const [page = 'home', detail] = raw.split('/');
  return { page, detail };
}

function prefersReducedMotion() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

function useHashRoute() {
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    if (!window.location.hash) window.history.replaceState(null, '', '#/home');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [route.page, route.detail]);

  return route;
}

function LoadingIntro({ complete }) {
  const [progress, setProgress] = useState(0);
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(100);
      setMorphed(true);
      const timer = setTimeout(complete, 450);
      return () => clearTimeout(timer);
    }

    let frame;
    const started = performance.now();
    const tick = (now) => {
      const eased = Math.min(100, Math.pow((now - started) / 2450, 0.88) * 100);
      setProgress(eased);
      if (eased < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setMorphed(true);
        setTimeout(complete, 980);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [complete]);

  return (
    <div className={`loader ${morphed ? 'loader--morphed' : ''}`} aria-live="polite">
      <div className="loader__grain" />
      <div className="loader__name" aria-label={`Loading Alphin Roy ${Math.round(progress)} percent`}>
        <span className="loader__ghost">Alphin Roy</span>
        <span className="loader__fill" style={{ '--loader-progress': `${progress}%` }}>
          <span>Alphin Roy</span>
        </span>
        <span className="loader__initials">AR</span>
      </div>
      <div className="loader__meta">
        <span>assembling portfolio</span>
        <strong>{Math.round(progress)}%</strong>
      </div>
    </div>
  );
}

function Navbar({ active, introDone, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a className={`brand ${introDone ? 'brand--ready' : ''}`} href="#/home" aria-label="Alphin Roy home">
        <span>AR</span>
      </a>
      <nav className={`navlinks ${open ? 'navlinks--open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.page}
            className={active === item.page ? 'active' : ''}
            href={pagePath(item.page)}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle dark and light mode">
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          <i aria-hidden="true" />
        </button>
        <a className="nav-contact" href="#/contact">
          Let&apos;s Talk
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header reveal">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {text && <span>{text}</span>}
    </div>
  );
}

function ProjectPanel({ project, index, compact = false }) {
  return (
    <a
      className={`project-panel reveal ${project.layout === 'large' && !compact ? 'project-panel--large' : ''}`}
      href={`#/portfolio/${project.id}`}
      style={{ '--delay': `${index * 70}ms` }}
    >
      <span className="project-panel__index">0{index + 1}</span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row">
        {project.stack.slice(0, 4).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <small>{project.link}</small>
    </a>
  );
}

function SocialIcon({ type }) {
  const icons = {
    linkedin: (
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708C16 15.487 15.474 16 14.825 16H1.175C.526 16 0 15.487 0 14.854V1.146Zm4.943 12.248V6.169H2.542v7.225h2.401Zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.539-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016Zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4Z" />
    ),
    github: (
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.54 7.54 0 0 1 8 3.89c.68.003 1.36.092 2 .26 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    ),
    instagram: (
      <>
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 8 0Zm0 1.442c2.136 0 2.389.008 3.232.046.78.036 1.204.166 1.486.275.373.145.64.318.92.598.28.28.453.546.598.92.109.282.24.706.275 1.486.038.844.046 1.096.046 3.233 0 2.136-.008 2.389-.046 3.232-.036.78-.166 1.204-.275 1.486a2.476 2.476 0 0 1-.598.92c-.28.28-.546.453-.92.598-.282.109-.706.24-1.486.275-.844.038-1.096.046-3.232.046-2.137 0-2.39-.008-3.233-.046-.78-.036-1.204-.166-1.486-.275a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.598-.92c-.109-.282-.24-.706-.275-1.486-.038-.844-.046-1.096-.046-3.232 0-2.137.008-2.39.046-3.233.036-.78.166-1.204.275-1.486.145-.373.318-.64.598-.92.28-.28.546-.453.92-.598.282-.109.706-.24 1.486-.275.844-.038 1.096-.046 3.233-.046Z" />
        <path d="M8 3.892a4.108 4.108 0 1 0 0 8.216A4.108 4.108 0 0 0 8 3.892Zm0 1.442a2.666 2.666 0 1 1 0 5.332 2.666 2.666 0 0 1 0-5.332Zm5.123-.162a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0Z" />
      </>
    ),
    email: <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697Zm6.761 4.134-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.142l-6.57-4.027L8 9.586l-1.239-.755Zm3.436-.588L16 11.801V4.697l-5.803 3.546Z" />,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
      {icons[type]}
    </svg>
  );
}

function Home() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const snapRef = useRef(false);

  function updateParallax(event) {
    if (prefersReducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setParallax({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) });
  }

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const snapToSection = (id) => {
      if (snapRef.current) return false;
      snapRef.current = true;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        snapRef.current = false;
      }, 780);
      return true;
    };

    const handleSnap = (delta) => {
      const hero = heroRef.current;
      const overview = document.getElementById('overview');
      if (!hero || !overview || Math.abs(delta) < 8) return false;

      const scrollY = window.scrollY;
      const overviewTop = overview.offsetTop;
      const viewportBottom = scrollY + window.innerHeight;
      const heroEndReached = viewportBottom >= overviewTop - 28;
      const nearOverviewTop = scrollY >= overviewTop - 80 && scrollY < overviewTop + window.innerHeight * 0.34;

      if (delta > 0 && heroEndReached && scrollY < overviewTop - 8) {
        return snapToSection('overview');
      }

      if (delta < 0 && nearOverviewTop) {
        return snapToSection('home');
      }

      return false;
    };

    const handleWheel = (event) => {
      if (handleSnap(event.deltaY)) event.preventDefault();
    };

    const handleTouchStart = (event) => {
      heroRef.current.dataset.touchStart = String(event.touches[0]?.clientY ?? 0);
    };

    const handleTouchMove = (event) => {
      const start = Number(heroRef.current?.dataset.touchStart ?? 0);
      const current = event.touches[0]?.clientY ?? start;
      const delta = start - current;
      if (handleSnap(delta)) event.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="page page--home">
      <section
        className="section hero"
        id="home"
        ref={heroRef}
        onMouseMove={updateParallax}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
        style={{ '--mx': parallax.x, '--my': parallax.y }}
      >
        <div className="hero__copy reveal">
          <p className="eyebrow">Full-stack developer / cloud-focused builder</p>
          <h1>Alphin Roy</h1>
          <p className="hero__intro">
            I build clean digital products with reliable backends, cloud-aware delivery, and a creative eye.
          </p>
          <div className="button-row">
            <a className="button button--primary" href="#/portfolio">
              View Portfolio
            </a>
            <a className="button" href="#/about">
              About Me
            </a>
          </div>
          <div className="hero__socials" aria-label="Social and profile links">
            <a href="https://www.linkedin.com/in/alphinroy" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <SocialIcon type="linkedin" />
            </a>
            <a href="https://github.com/alphinroy" target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <SocialIcon type="github" />
            </a>
            <a href="https://www.instagram.com/alphinroy" target="_blank" rel="noreferrer" aria-label="Instagram profile">
              <SocialIcon type="instagram" />
            </a>
            <a href="mailto:hello@alphinroy.dev" aria-label="Email Alphin Roy">
              <SocialIcon type="email" />
            </a>
          </div>
        </div>
        <div className="hero__visual reveal" aria-label="Portrait of Alphin Roy">
          <div className="portrait-shell">
            <img src="/assets/me-portrait-cutout.png" alt="Alphin Roy professional portrait cutout" loading="eager" />
          </div>
          <span className="portrait-caption">Software / Cloud / Creative</span>
        </div>
        <aside className="hero__side reveal">
          <span>Quick profile</span>
          <dl>
            <div>
              <dt>Role</dt>
              <dd>Student developer</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Full-stack, cloud, DevOps</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>Vue, Django, PostgreSQL, Azure</dd>
            </div>
            <div>
              <dt>Creative</dt>
              <dd>Photography and UI judgement</dd>
            </div>
          </dl>
        </aside>
        <a className="hero__scroll-cue" href="#overview">
          <span>Scroll to overview</span>
          <i />
        </a>
      </section>

      <section className="section section--overview" id="overview">
        <SectionHeader
          eyebrow="Overview"
          title="A focused snapshot before the deeper pages"
          text="The home page keeps the important material visible without trying to show everything at once."
        />
        <div className="overview-grid">
          <ProjectPanel project={projects[0]} index={0} compact />
          <div className="overview-stack">
            <article className="overview-note reveal">
              <span>Technical range</span>
              <h3>Vue, Django, PostgreSQL, Azure, Docker, Kubernetes, Terraform, APIs.</h3>
              <a className="button" href="#/skills">
                Explore Skills
              </a>
            </article>
            <a className="featured-post reveal" href={`#/blog/${posts[0].id}`}>
              <div>
                <span>{posts[0].category}</span>
                <h3>{posts[0].title}</h3>
                <p>{posts[0].excerpt}</p>
              </div>
              <small>
                {posts[0].date} / {posts[0].time}
              </small>
            </a>
          </div>
          <a className="overview-photo reveal" href="#/photography">
            <img src="/assets/photo-garden.jpg" alt="Alphin Roy outdoor photography preview" loading="lazy" />
            <span>Photography</span>
          </a>
        </div>
      </section>
    </div>
  );
}

function Portfolio({ detail }) {
  const project = projects.find((item) => item.id === detail);
  if (project) return <ProjectPage project={project} />;

  return (
    <section className="section page" id="portfolio">
      <SectionHeader
        eyebrow="Selected work"
        title="Case studies with systems thinking"
        text="These now open into dedicated project pages instead of modal-only details."
      />
      <div className="project-grid">
        {projects.map((item, index) => (
          <ProjectPanel key={item.id} project={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectPage({ project }) {
  return (
    <article className="section page detail-page">
      <a className="back-link" href="#/portfolio">
        Back to portfolio
      </a>
      <p className="eyebrow">Project case study</p>
      <h1>{project.title}</h1>
      <p className="detail-lede">{project.description}</p>
      <div className="detail-grid">
        <section>
          <h2>Role and approach</h2>
          <p>{project.role}. The emphasis is on clean product thinking, maintainable implementation, and choices that help a team keep moving after launch.</p>
        </section>
        <section>
          <h2>Impact</h2>
          <p>{project.impact}</p>
        </section>
        <section>
          <h2>Stack</h2>
          <div className="tag-row">
            {project.stack.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function About() {
  return (
    <section className="section page about" id="about">
      <SectionHeader
        eyebrow="About"
        title="A developer who likes thoughtful systems and human details"
        text="Alphin blends engineering discipline with visual curiosity, using each project as a place to learn how products should behave, scale, and feel."
      />
      <div className="about-layout">
        <div className="about-story reveal">
          <p>
            I am an emerging full-stack developer with a strong interest in cloud infrastructure, DevOps practices, and
            sustainability-focused products. My work sits between practical engineering and creative judgment: clear
            interfaces, reliable backends, and decisions that make a product easier to maintain after the first launch.
          </p>
          <p>
            Photography keeps my taste honest. It trains me to notice composition, patience, contrast, and the small
            details that change how people experience a thing.
          </p>
        </div>
        <ol className="timeline">
          {milestones.map(([year, title, text]) => (
            <li className="reveal" key={year}>
              <time>{year}</time>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Blog({ detail }) {
  const selected = posts.find((post) => post.id === detail);
  if (selected) return <BlogPost post={selected} />;

  const featured = posts.find((post) => post.featured);
  const rest = posts.filter((post) => !post.featured);

  return (
    <section className="section page blog" id="blog">
      <SectionHeader eyebrow="Journal" title="Notes from the build log" text="A modern editorial surface ready for future writing." />
      <a className="featured-post reveal" href={`#/blog/${featured.id}`}>
        <div>
          <span>{featured.category}</span>
          <h3>{featured.title}</h3>
          <p>{featured.excerpt}</p>
        </div>
        <small>
          {featured.date} / {featured.time}
        </small>
      </a>
      <div className="post-list">
        {rest.map((post) => (
          <a className="post-row reveal" href={`#/blog/${post.id}`} key={post.id}>
            <span>{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <small>
              {post.date} / {post.time}
            </small>
          </a>
        ))}
      </div>
    </section>
  );
}

function BlogPost({ post }) {
  return (
    <article className="section page detail-page">
      <a className="back-link" href="#/blog">
        Back to blog
      </a>
      <p className="eyebrow">{post.category}</p>
      <h1>{post.title}</h1>
      <p className="detail-lede">{post.excerpt}</p>
      <div className="detail-grid">
        <section>
          <h2>Draft direction</h2>
          <p>
            This placeholder article is structured for future expansion with real notes, diagrams, code snippets, and
            field observations. The page already has a readable editorial rhythm and metadata.
          </p>
        </section>
        <section>
          <h2>Metadata</h2>
          <p>
            {post.date} / {post.time}
          </p>
        </section>
      </div>
    </article>
  );
}

function Skills() {
  return (
    <section className="section page skills" id="skills">
      <SectionHeader
        eyebrow="Capabilities"
        title="Built around product depth, not tool collecting"
        text="Grouped skills are presented as working modes: interface craft, backend clarity, cloud confidence, and creative taste."
      />
      <div className="skills-layout">
        <div className="orbit reveal" aria-hidden="true">
          {['Vue', 'Django', 'Azure', 'Docker', 'SQL', 'UX'].map((label, index) => (
            <span key={label} style={{ '--i': index }}>
              {label}
            </span>
          ))}
          <strong>AR</strong>
        </div>
        <div className="skill-groups">
          {skills.map(([category, items], index) => (
            <article className="skill-card reveal" key={category} style={{ '--delay': `${index * 55}ms` }}>
              <h3>{category}</h3>
              <div className="pill-list">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Photography() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const categories = ['all', 'travel', 'urban', 'portraits', 'landscapes'];
  const visible = filter === 'all' ? photos : photos.filter((photo) => photo.category === filter);

  return (
    <section className="section page photography" id="photography">
      <SectionHeader
        eyebrow="Photography"
        title="A visual notebook for movement, weather, and people"
        text="Real photos are already wired in, and the grid can grow into a larger gallery."
      />
      <div className="filter-row reveal" aria-label="Photography filters">
        {categories.map((category) => (
          <button className={filter === category ? 'active' : ''} type="button" key={category} onClick={() => setFilter(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="photo-grid">
        {visible.map((photo, index) => (
          <button className="photo-tile reveal" type="button" key={`${photo.title}-${index}`} onClick={() => setLightbox(photo)}>
            <img src={photo.src} alt={photo.title} loading="lazy" />
            <span>{photo.title}</span>
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="lightbox" role="presentation" onClick={() => setLightbox(null)}>
          <figure onClick={(event) => event.stopPropagation()}>
            <button className="icon-button" type="button" aria-label="Close photo lightbox" onClick={() => setLightbox(null)}>
              x
            </button>
            <img src={lightbox.src} alt={lightbox.title} />
            <figcaption>{lightbox.title}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section page contact" id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Have a product, platform, or story worth building?"
        text="Available for internships, junior developer opportunities, collaboration, and creative technical projects."
      />
      <div className="contact-layout">
        <form
          className={`contact-form reveal ${sent ? 'contact-form--sent' : ''}`}
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="button button--primary" type="submit">
            {sent ? 'Message staged' : 'Send message'}
          </button>
        </form>
        <aside className="contact-card reveal">
          <p>Prefer direct? Use the profile links as placeholders until real destinations are connected.</p>
          <a href="mailto:hello@alphinroy.dev">hello@alphinroy.dev</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </aside>
      </div>
    </section>
  );
}

function RenderRoute({ route }) {
  switch (route.page) {
    case 'portfolio':
      return <Portfolio detail={route.detail} />;
    case 'about':
      return <About />;
    case 'blog':
      return <Blog detail={route.detail} />;
    case 'skills':
      return <Skills />;
    case 'photography':
      return <Photography />;
    case 'contact':
      return <Contact />;
    case 'home':
    default:
      return <Home />;
  }
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('ar-theme') || 'dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const route = useHashRoute();
  const active = useMemo(() => (navItems.map((item) => item.page).includes(route.page) ? route.page : 'home'), [route.page]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ar-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.16 }
    );
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [introDone, route.page, route.detail]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [route.page, route.detail]);

  return (
    <div className="app">
      {!introDone && <LoadingIntro complete={() => setIntroDone(true)} />}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <Navbar active={active} introDone={introDone} theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main className={introDone ? 'main main--visible' : 'main'} id="main">
        <RenderRoute route={route} />
      </main>
      <footer className="footer">
        <span>Alphin Roy</span>
        <span>Designed for thoughtful software, cloud craft, and creative curiosity.</span>
      </footer>
    </div>
  );
}

export default App;
