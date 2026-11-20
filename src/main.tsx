import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Signal } from './Signal'
import { projects, type Project } from './projects'
import { achievements, coursework, emails, navigation, skills, socials } from './profile'
import './styles.css'

const resumeUrl = import.meta.env.BASE_URL + 'resume.pdf'

function ResumeLink({ className = '' }: { className?: string }) {
  return <a className={className} href={resumeUrl} download="Lalit_Deshmane_Resume.pdf">Download Resume</a>
}

function SocialLinks() {
  return <div className="socials">{socials.map(({ name, url }) =>
    <a key={name} href={url} target="_blank" rel="noopener noreferrer">
      <span className="social-icon" aria-hidden="true">{name === 'GitHub' ? '⌘' : 'in'}</span>{name}
    </a>)}</div>
}

function Tags({ items }: { items: string[] }) {
  return <ul className="tags" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const updateActive = () => {
      const current = [...navigation].reverse().find(([, id]) =>
        (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 140)
      setActive(current?.[1] ?? 'home')
    }
    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  return <header className="header">
    <div className="shell nav-inner">
      <a href="#home" className="brand" aria-label="Lalit Deshmane, home" onClick={() => setMenuOpen(false)}><span>LD</span> Lalit Deshmane</a>
      <button className="menu-toggle button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close menu' : 'Menu'}</button>
      <nav className={menuOpen ? 'nav open' : 'nav'} id="main-navigation" aria-label="Main"
        onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false) }}>
        {navigation.map(([label, id]) => <a key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined}
          onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
    </div>
  </header>
}

function Hero() {
  return <section className="hero shell" id="home" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="marker" /> DATA SCIENCE &amp; MACHINE LEARNING</p>
      <h1 id="hero-title">Lalit Santosh<br />Deshmane<span>.</span></h1>
      <p className="hero-degree">B.Tech in Data Science and Artificial Intelligence<br />Indian Institute of Technology Guwahati</p>
      <p className="hero-intro">I build practical solutions with machine learning, statistical modelling, and software engineering.</p>
      <div className="actions">
        <a className="button primary" href="#projects">Explore My Work</a>
        <ResumeLink className="button" />
        <a className="text-link" href="#contact">Get in Touch</a>
      </div>
      <SocialLinks />
    </div>
    <figure className="hero-visual">
      <div className="visual-top"><span>TIME-SERIES ANALYSIS</span><span aria-hidden="true">+</span></div>
      <Signal hero />
      <figcaption><span>Illustrative signal field</span><a href="#wavecatboost">WaveCatBoost</a></figcaption>
    </figure>
    <a className="scroll-cue" href="#projects"><span aria-hidden="true" /> Scroll to explore</a>
  </section>
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  return <article id={project.id} className={'project-card ' + (index === 0 ? 'featured' : index < 3 ? 'secondary' : 'compact')}>
    <div className="project-art" aria-hidden="true">
      <Signal variant={index} />
      <span>{project.discipline}</span>
    </div>
    <div className="project-copy">
      {index === 0 && <p className="eyebrow"><span className="marker" /> FEATURED PROJECT</p>}
      <h3><button className="title-button" onClick={onSelect}>{project.title}</button></h3>
      <p className="subtitle">{project.subtitle}</p>
      <p>{project.description}</p>
      <ul className="highlights">{(project.results.length ? project.results : project.highlights).slice(0, index < 3 ? 2 : 1)
        .map(item => <li key={item}>{item}</li>)}</ul>
      <Tags items={project.tags} />
      <div className="actions">
        {index === 0
          ? <a className="button primary" href={project.url} target="_blank" rel="noopener noreferrer">Explore Project</a>
          : <button className="button" onClick={onSelect}>Explore Project</button>}
        {index === 0
          ? <button className="text-link" onClick={onSelect}>Read case study</button>
          : <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">{index === 3 ? 'Live platform' : 'Project link'}</a>}
      </div>
    </div>
  </article>
}

function ProjectDialog({ project, close }: { project: Project | null; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    if (!project || !element) return
    element.showModal()
    return () => { if (element.open) element.close() }
  }, [project])
  if (!project) return null

  return <dialog ref={dialog} onCancel={event => { event.preventDefault(); close() }} aria-labelledby="dialog-title"
    onClick={event => { if (event.target === event.currentTarget) close() }}>
    <div className="dialog-inner">
      <div className="dialog-top"><p className="eyebrow">{project.discipline}</p>
        <button className="button" onClick={close}>Close</button></div>
      <h2 id="dialog-title">{project.title}</h2>
      <p className="subtitle">{project.subtitle}</p>
      <h3>Overview</h3><p>{project.description}</p>
      <h3>Problem statement</h3><p>{project.problem}</p>
      <h3>Technical approach</h3><ul className="highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>
      <h3>Methodology</h3><ol className="method">{project.method.map(item => <li key={item}>{item}</li>)}</ol>
      <h3>Technologies</h3><Tags items={project.tags} />
      {!!project.results.length && <><h3>Reported results</h3><ul className="highlights">
        {project.results.map(item => <li key={item}>{item}</li>)}</ul></>}
      <h3>Project links</h3><a href={project.url} className="button primary" target="_blank" rel="noopener noreferrer">Open Project</a>
      {project.links?.map(link => <a className="button additional-link" key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
    </div>
  </dialog>
}

function Intro({ label, title, id }: { label: string; title: string; id: string }) {
  return <div className="section-intro"><p className="eyebrow"><span className="marker" /> {label}</p><h2 id={id}>{title}</h2></div>
}

function App() {
  const [selected, setSelected] = useState<Project | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  function openProject(project: Project) {
    trigger.current = document.activeElement as HTMLElement
    setSelected(project)
  }
  function closeProject() {
    setSelected(null)
    requestAnimationFrame(() => trigger.current?.focus())
  }

  return <>
    <a className="skip" href="#main">Skip to content</a>
    <Header />
    <main id="main">
      <Hero />
      <section className="work section" id="projects" aria-labelledby="projects-title">
        <div className="shell">
          <div className="split-intro">
            <Intro label="PORTFOLIO" title="Selected work" id="projects-title" />
            <p>Six projects across forecasting, deep learning, and software engineering.</p>
          </div>
          <div className="project-grid">{projects.map((project, index) =>
            <ProjectCard project={project} index={index} key={project.id} onSelect={() => openProject(project)} />)}</div>
        </div>
      </section>
      <section className="section shell split" id="about" aria-labelledby="about-title">
        <Intro label="ABOUT" title="From theory to practice" id="about-title" />
        <div className="body-copy">
          <p>I’m a Data Science and Artificial Intelligence undergraduate at IIT Guwahati. I’m interested in how ideas from statistics, mathematics, and computer science become useful models and applications.</p>
          <p>In academic and collaborative projects, I’ve built predictive models, experimented with deep learning, and worked on computer vision, automated training, and full-stack applications. I enjoy learning new tools with a concrete problem to solve and working with others to test ideas.</p>
          <p>I’m interested in opportunities across data science, AI and machine learning, deep learning, software engineering, analytics, and research.</p>
        </div>
      </section>
      <section className="section band" id="education" aria-labelledby="education-title">
        <div className="shell">
          <Intro label="EDUCATION" title="Academic foundation" id="education-title" />
          <div className="panel">
            <div className="education-top">
              <div><p className="eyebrow">2024 – PRESENT</p><h3>Indian Institute of Technology Guwahati</h3><p>B.Tech in Data Science and Artificial Intelligence</p></div>
              <div className="cgpa"><strong>8.76</strong><span>CGPA</span></div>
            </div>
            <div className="coursework">{coursework.map(([group, ...courses]) =>
              <div key={group}><h4>{group}</h4><ul>{courses.map(course => <li key={course}>{course}</li>)}</ul></div>)}</div>
            <p className="exposure">Additional academic exposure includes Operating Systems, PySpark, and machine learning and deep learning libraries.</p>
          </div>
        </div>
      </section>
      <section className="section shell" id="skills" aria-labelledby="skills-title">
        <Intro label="SKILLS" title="Technical toolkit" id="skills-title" />
        <div className="info-grid">{skills.map(skill => <article className="panel" key={skill.name}>
          <h3>{skill.name}</h3>{skill.tools.length > 0 && <Tags items={skill.tools} />}
          {skill.elementary && <><p className="group-label">Elementary proficiency</p><Tags items={skill.elementary} /></>}
          {skill.academic && <><p className="group-label">Academic exposure</p><Tags items={skill.academic} /></>}
        </article>)}</div>
      </section>
      <section className="section band" id="experience" aria-labelledby="experience-title">
        <div className="shell split">
          <Intro label="EXPERIENCE" title="Academic & Project Experience" id="experience-title" />
          <div className="body-copy">
            <p>Through coursework and collaborative projects, I’ve worked across the lifecycle of machine learning applications, from preprocessing and exploratory analysis to experimentation, model evaluation, and optimization.</p>
            <p>I’ve connected models to REST APIs and web interfaces, and worked with deep learning pipelines for computer vision, OCR, and audio transcription.</p>
            {/* <article className="panel leadership">
              <p className="eyebrow">LEADERSHIP · 2025</p>
              <h3>General Executive, Student Alumni Interaction Linkage (SAIL)</h3>
              <p>Indian Institute of Technology Guwahati</p>
              <p>Coordinated logistics for Graduation Ball and Finalis Resonare, supporting events for more than 1,000 graduating B.Tech, M.Tech, and Ph.D. students.</p>
            </article> */}
          </div>
        </div>
      </section>
      {/* <section className="section shell" id="achievements" aria-labelledby="achievements-title">
        <Intro label="ACHIEVEMENTS" title="Competitions & volunteering" id="achievements-title" />
        <div className="info-grid achievements">{achievements.map(item => <article className="panel" key={item.event}>
          <p className="eyebrow">{item.year}</p><h3>{item.event}</h3><strong>{item.result}</strong><p>{item.detail}</p>
        </article>)}</div>
      </section> */}
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="shell split">
          <Intro label="CONTACT" title="Let’s connect" id="contact-title" />
          <div className="body-copy">
            <p>I’m interested in discussing opportunities, exchanging ideas, and collaborating on projects. Feel free to reach out.</p>
            <a className="button primary" href={'mailto:' + emails[0]}>Email Me</a>
            <ul className="email-list">{emails.map(email => <li key={email}><a href={'mailto:' + email}>{email}</a></li>)}</ul>
            <SocialLinks />
          </div>
        </div>
      </section>
    </main>
    <footer className="shell footer">
      <span>Lalit Santosh Deshmane</span><ResumeLink className="text-link" /><a className="text-link" href="#home">Back to top</a>
    </footer>
    <ProjectDialog project={selected} close={closeProject} />
  </>
}

createRoot(document.getElementById('root')!).render(<App />)
