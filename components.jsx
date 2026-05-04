// components.jsx — Shared components for Destro Sec V2.0

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─── Logo ─────────────────────────────────────────
const Logo = ({ size = 28 }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src="assets/logo.png"
      alt="Destro Sec"
      style={{ height: size + 6, width: 'auto', display: 'block' }}
    />
  </div>
);

// ─── Navigation ────────────────────────────────────
const Nav = ({ current, onNav }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner container">
          <button onClick={() => onNav('home')} className="nav-logo" aria-label="Destro Sec home">
            <Logo />
          </button>
          <div className="nav-links">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => onNav(l.id)}
                className={`nav-link ${current === l.id ? 'active' : ''}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="nav-cta">
            <button className="btn btn-primary btn-sm" onClick={() => onNav('quote')}>
              Get a Quote
            </button>
          </div>
          <button className="nav-burger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="mobile-drawer" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-panel glass" onClick={e => e.stopPropagation()}>
            <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">×</button>
            {links.map(l => (
              <button key={l.id} onClick={() => { onNav(l.id); setMobileOpen(false); }} className="mobile-link">
                {l.label}
              </button>
            ))}
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => { onNav('quote'); setMobileOpen(false); }}>
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ─── Footer ────────────────────────────────────────
const Footer = ({ onNav }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo />
          <p style={{ marginTop: 16, color: 'var(--color-text-secondary)', fontSize: 14, maxWidth: 320 }}>
            Built by breakers. Trusted by builders. Security consulting, software, and education from a community that thinks like attackers.
          </p>
          <div className="footer-mono">
            <span style={{ color: 'var(--color-brand)' }}>$</span> ./destrosec --since 2023
          </div>
        </div>
        <div className="footer-col">
          <h5>Pages</h5>
          <button onClick={() => onNav('home')}>Home</button>
          <button onClick={() => onNav('services')}>Services</button>
          <button onClick={() => onNav('about')}>About</button>
          <button onClick={() => onNav('contact')}>Contact</button>
          <button onClick={() => onNav('quote')}>Get a Quote</button>
        </div>
        <div className="footer-col">
          <h5>Verticals</h5>
          <button onClick={() => onNav('services', { vertical: 'security' })}>Security</button>
          <button onClick={() => onNav('services', { vertical: 'software' })}>Software</button>
          <button onClick={() => onNav('services', { vertical: 'education' })}>Education</button>
        </div>
        <div className="footer-col">
          <h5>Connect</h5>
          <a href="mailto:info@destrosec.com">info@destrosec.com</a>
          <a href="#" onClick={e => e.preventDefault()}>LinkedIn</a>
          <a href="#" onClick={e => e.preventDefault()}>Instagram</a>
          <a href="#" onClick={e => e.preventDefault()}>GitHub</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Destro Sec. All rights reserved.</span>
        <span className="mono" style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>
          v2.0 — build for break in
        </span>
      </div>
    </div>
  </footer>
);

// ─── Reveal hook ──────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.hasAttribute('data-no-scroll-anim')) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ─── Reveal wrapper ────────────────────────────────
const Reveal = ({ children, delay = 0, as: Tag = 'div', ...props }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${props.className || ''}`} style={{ ...props.style, transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
};

// ─── Vertical icons ────────────────────────────────
const VerticalIcon = ({ vertical, size = 24 }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (vertical === 'security') return (
    <svg {...props}><path d="M12 2 L4 5 V11 C4 16 7.5 20 12 22 C16.5 20 20 16 20 11 V5 Z"/><circle cx="12" cy="11" r="2"/><path d="M12 13 V16"/></svg>
  );
  if (vertical === 'software') return (
    <svg {...props}><path d="M8 6 L3 12 L8 18"/><path d="M16 6 L21 12 L16 18"/><path d="M14 4 L10 20"/></svg>
  );
  if (vertical === 'education') return (
    <svg {...props}><path d="M2 9 L12 4 L22 9 L12 14 Z"/><path d="M6 11 V16 C6 17 8.5 19 12 19 C15.5 19 18 17 18 16 V11"/><path d="M22 9 V14"/></svg>
  );
  return null;
};

// ─── Wireframe Cube (decorative) ──────────────────
const WireframeCube = ({ size = 600, intensity = 1 }) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (document.documentElement.hasAttribute('data-no-scroll-anim')) return;
    let raf, start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rotY = (t * 8) % 360;
  const rotX = 25 + Math.sin(t * 0.3) * 5;
  const op = 0.18 * intensity;

  return (
    <div className="wireframe-cube-scene" style={{ width: size, height: size }} aria-hidden>
      <div className="wireframe-cube" style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}>
        {['front','back','right','left','top','bottom'].map(face => (
          <div key={face} className={`wf-face wf-${face}`} style={{ borderColor: `rgba(255,107,53,${op})` }}>
            <div className="wf-grid" style={{ opacity: op * 1.6 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Stat ──────────────────────────────────────────
const Stat = ({ value, label, accent }) => (
  <div className="stat">
    <div className="stat-value" style={accent ? { color: `var(--color-${accent})` } : null}>{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

// ─── Service data ──────────────────────────────────
const VERTICAL_DATA = {
  security: {
    name: 'Security',
    color: '#e63946',
    rgb: '230, 57, 70',
    eyebrow: 'BUILD FOR BREAK IN',
    headline: 'We break in for you to build better.',
    description: 'Adversarial security testing from operators who think like attackers. Pen tests, red team engagements, and incident response that map to the way real intrusions actually happen.',
    services: [
      { name: 'Penetration Testing', desc: 'External, internal, and web app assessments scoped to your threat model.' },
      { name: 'Red Team Engagements', desc: 'Multi-week adversarial simulations with full kill-chain reporting.' },
      { name: 'Vulnerability Assessment', desc: 'Continuous scanning, triage, and prioritization across your infra.' },
      { name: 'Incident Response', desc: 'On-call IR retainer + post-breach forensics and remediation roadmap.' },
      { name: 'Security Training', desc: 'Hands-on labs for blue and red team workflows — built for your stack.' }
    ],
    proof: { metric: '120+', label: 'engagements delivered', client: 'Sequoia FinTech', quote: 'They found three critical paths our previous vendor missed in two years.' }
  },
  software: {
    name: 'Software',
    color: '#3a86ff',
    rgb: '58, 134, 255',
    eyebrow: 'SECURE BY DEFAULT',
    headline: 'Software shipped with attackers in mind.',
    description: 'Custom development from a team that has spent years exploiting other people\'s code. Every line we write assumes it will be attacked — because we know exactly how.',
    services: [
      { name: 'Custom Software Development', desc: 'Greenfield builds with security baked into architecture, not bolted on.' },
      { name: 'Web & Mobile Applications', desc: 'Production-grade apps with hardened auth, sane defaults, audit trails.' },
      { name: 'API Development & Integration', desc: 'Authenticated, rate-limited, observable APIs your partners can trust.' },
      { name: 'Code Review & Secure SDLC', desc: 'Threat-model-driven reviews and CI/CD pipelines that catch regressions.' },
      { name: 'DevSecOps Implementation', desc: 'Shift left without slowing delivery — practical guardrails, not theatre.' }
    ],
    proof: { metric: '40+', label: 'production systems shipped', client: 'Nordic Health Co.', quote: 'They rewrote our auth layer in six weeks. Audit passed first try.' }
  },
  education: {
    name: 'Education',
    color: '#ffbe0b',
    rgb: '255, 190, 11',
    eyebrow: 'BUILD FOR BREAK IN',
    headline: 'Train the next generation of breakers.',
    description: 'College workshops, CTFs, and bootcamps run by practitioners — not slide-deck consultants. We teach how attacks actually work, then how to build systems that survive them.',
    services: [
      { name: 'College & Institution Workshops', desc: 'Multi-day technical workshops mapped to your curriculum and lab capacity.' },
      { name: 'Certification Prep Programs', desc: 'OSCP, CEH, CompTIA Security+ structured prep with hands-on labs.' },
      { name: 'CTF Hosting', desc: 'End-to-end CTF design and infra for institutions and corporate events.' },
      { name: 'Community Bootcamps', desc: 'Six-week intensive cohorts for students breaking into security careers.' },
      { name: 'Corporate Security Awareness', desc: 'Phishing simulations + role-specific training that actually changes behavior.' }
    ],
    proof: { metric: '2,400+', label: 'students trained', client: 'IIT Hyderabad', quote: 'The CTF infrastructure they built handled 800 concurrent students without a hiccup.' }
  }
};

// ─── Office bearers data ──────────────────────────
const TEAM = [
  {
    id: 'aarav-mehta', name: 'Aarav Mehta', role: 'Founder & CEO', vertical: 'security',
    bioShort: 'Ex-red-team lead turned founder. Believes the best defenders started as attackers.',
    bioLong: 'Aarav spent six years on offensive security teams at two of India\'s largest financial institutions before founding Destro Sec in 2023. He\'s led red team engagements against Fortune 500 companies and trained over 800 students through community CTFs. His philosophy: you can\'t defend what you don\'t understand how to break.\n\nAt Destro Sec he sets the technical direction and personally leads the most adversarial engagements. Outside work he runs a small monthly meetup for early-career security folks in Bangalore.',
    skills: ['Red Teaming', 'Penetration Testing', 'Python', 'Active Directory', 'Cloud Security'],
    certs: ['OSCP', 'OSEP', 'CRTO'],
    achievements: ['Led 50+ red team engagements', 'Speaker at Nullcon 2024', 'Founder of Bangalore Sec Meetup'],
    quote: 'The best defense is built by people who\'ve broken things on purpose.',
    boardRole: 'CEO & Founder', joinedYear: 2023
  },
  {
    id: 'priya-iyer', name: 'Priya Iyer', role: 'CTO & Co-founder', vertical: 'software',
    bioShort: 'Staff engineer with a security mindset. Builds systems that assume the worst.',
    bioLong: 'Priya brings ten years of staff-level engineering experience from infrastructure-heavy startups. She co-founded Destro Sec to bridge the gap between teams that ship fast and teams that ship secure — a gap she watched destroy three companies before deciding to fix it herself.\n\nShe owns the Software vertical and the secure-SDLC practice. Most of her work is unglamorous: reviewing auth flows, hardening CI/CD, writing the playbooks teams reach for at 2am.',
    skills: ['Distributed Systems', 'Go', 'Rust', 'Kubernetes', 'Threat Modeling'],
    certs: ['CKS', 'CISSP'],
    achievements: ['Led infra at three Series-B startups', 'Co-author, Secure SDLC Playbook', 'OSS maintainer'],
    quote: 'Ship fast. Ship safe. The two are not in tension if you build the right scaffolding.',
    boardRole: 'CTO & Co-founder', joinedYear: 2023
  },
  {
    id: 'rohan-das', name: 'Rohan Das', role: 'Head of Education', vertical: 'education',
    bioShort: 'Educator-practitioner running the community programs and college partnerships.',
    bioLong: 'Rohan came to Destro Sec from academia, where he taught applied security at a tier-1 engineering college for four years. He runs the Education vertical end-to-end: curriculum design, college partnerships, CTF infrastructure, and the bootcamp program.\n\nHis north star is simple — every student leaves a Destro Sec workshop able to do something useful, not just nod along to slides.',
    skills: ['Curriculum Design', 'CTF Design', 'Web Exploitation', 'Public Speaking'],
    certs: ['OSCP', 'eWPTX'],
    achievements: ['Designed curriculum for 12 colleges', 'Hosted 30+ CTFs', 'Trained 2,400+ students'],
    quote: 'You learn security the same way you learn music: by playing badly until you don\'t.',
    boardRole: 'Head of Education', joinedYear: 2023
  },
  {
    id: 'sana-kapoor', name: 'Sana Kapoor', role: 'Head of Operations', vertical: 'security',
    bioShort: 'Keeps the engagements on track and the clients informed. Runs a tight ship.',
    bioLong: 'Sana joined as the fourth office bearer in early 2024, bringing program management discipline from a previous life at a Big Four consulting firm. She owns delivery — every engagement, every workshop, every retainer. If you\'ve ever received a status update from Destro Sec, Sana wrote it.\n\nShe also leads the client relationship side: scoping, kickoffs, post-engagement debriefs, and the long-term advisory work that keeps clients coming back.',
    skills: ['Program Management', 'Client Strategy', 'Risk Reporting', 'GRC'],
    certs: ['PMP', 'CISA'],
    achievements: ['Managed 80+ client engagements', 'Built the delivery playbook', 'Zero missed deadlines in 2025'],
    quote: 'Excellent security work means nothing if the client can\'t understand what you delivered.',
    boardRole: 'Head of Operations', joinedYear: 2024
  }
];

// Export to window
Object.assign(window, {
  Logo, Nav, Footer, Reveal, useReveal,
  VerticalIcon, WireframeCube, Stat,
  VERTICAL_DATA, TEAM
});
