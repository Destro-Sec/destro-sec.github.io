// home.jsx — Home page

const HomePage = ({ onNav, tweaks }) => {
  return (
    <div className="page">
      <HomeHero onNav={onNav} tweaks={tweaks} />
      <Marquee />
      <TrustBar />
      <VerticalsIntro onNav={onNav} />
      <Differentiator />
      <CaseStudyHighlight onNav={onNav} />
      <Manifesto />
      <FooterCTA onNav={onNav} />
    </div>
  );
};

const HomeHero = ({ onNav, tweaks }) => {
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    if (document.documentElement.hasAttribute('data-no-scroll-anim')) return;
    const onScroll = () => {
      const y = window.scrollY;
      setParallax(Math.min(y * 0.3, 200));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-cube-bg" style={{ transform: `translate(-50%, calc(-50% + ${parallax * 0.5}px))` }}>
        <WireframeCube size={720} intensity={tweaks.glow} />
      </div>
      <div className="hero-glow" style={{ opacity: 0.5 * tweaks.glow }} />
      <div className="container hero-inner">
        <Reveal delay={0}>
          <span className="eyebrow">SECURITY · SOFTWARE · EDUCATION</span>
        </Reveal>
        <h1 className="hero-headline">
          <Reveal delay={80} as="span" className="hero-line"><span>Build For</span></Reveal>
          <Reveal delay={180} as="span" className="hero-line"><span className="hero-accent">Break In<span className="hero-period">.</span></span></Reveal>
        </h1>
        <Reveal delay={320}>
          <p className="lead hero-sub">
            Security consulting, software development, and hands-on education — built by a community that thinks like attackers.
          </p>
        </Reveal>
        <Reveal delay={420}>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => onNav('quote')}>
              Get a Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNav('services')}>
              Explore Services
            </button>
          </div>
        </Reveal>
        <Reveal delay={560}>
          <div className="hero-meta mono">
            <span className="hero-meta-dot" />
            <span>Available for engagements · Q3 2026</span>
          </div>
        </Reveal>
      </div>
      <div className="scroll-indicator" aria-hidden>
        <span className="mono">scroll</span>
        <div className="scroll-line" />
      </div>
      <svg className="hero-lineart" viewBox="0 0 1200 600" aria-hidden>
        <defs>
          <linearGradient id="laGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff6b35" stopOpacity="0"/>
            <stop offset="50%" stopColor="#ff6b35" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#ff6b35" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path className="la-path la-1" d="M -50 380 Q 200 280, 400 360 T 800 320 T 1250 380" fill="none" stroke="url(#laGrad)" strokeWidth="1.2"/>
        <path className="la-path la-2" d="M -50 420 Q 250 360, 500 420 T 950 380 T 1250 440" fill="none" stroke="url(#laGrad)" strokeWidth="0.8" opacity="0.5"/>
        <circle className="la-dot la-d1" cx="200" cy="320" r="2.5" fill="#ff6b35"/>
        <circle className="la-dot la-d2" cx="900" cy="280" r="2" fill="#ff6b35" opacity="0.7"/>
        <circle className="la-dot la-d3" cx="600" cy="440" r="2" fill="#ff6b35" opacity="0.5"/>
      </svg>
    </section>
  );
};

const TrustBar = () => {
  const stats = [
    { value: '120+', label: 'Engagements delivered' },
    { value: '2,400+', label: 'Students trained' },
    { value: '40+', label: 'Production systems shipped' },
    { value: '24h', label: 'Avg response time' }
  ];
  const logos = ['Sequoia FinTech', 'Nordic Health Co.', 'IIT Hyderabad', 'Apex Defense', 'Gridline Labs', 'Prism AI'];

  return (
    <section className="trust-bar">
      <div className="container">
        <Reveal>
          <div className="trust-stats">
            {stats.map(s => <Stat key={s.label} {...s} />)}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="logo-strip">
            <div className="logo-strip-label mono">TRUSTED BY</div>
            <div className="logo-row">
              {logos.map(l => (
                <div key={l} className="logo-chip">{l}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const VerticalsIntro = ({ onNav }) => {
  return (
    <section className="verticals-intro">
      <div className="container">
        <Reveal>
          <span className="eyebrow">WHAT WE DO</span>
          <h2 className="section-h2">Three verticals.<br/><span className="text-secondary">One shared discipline.</span></h2>
        </Reveal>
        <div className="verticals-grid">
          {Object.entries(VERTICAL_DATA).map(([key, v], i) => (
            <Reveal key={key} delay={i * 100}>
              <button
                className={`vertical-card vertical-card-${key}`}
                onClick={() => onNav('services', { vertical: key })}
                style={{ '--accent': v.color, '--accent-rgb': v.rgb }}
              >
                <div className="vertical-card-top">
                  <div className="vertical-card-icon"><VerticalIcon vertical={key} size={28} /></div>
                  <div className="vertical-card-num mono">0{i + 1}</div>
                </div>
                <h3 className="vertical-card-title">{v.name}</h3>
                <p className="vertical-card-desc">{v.description}</p>
                <div className="vertical-card-cta mono">
                  Explore {v.name.toLowerCase()}
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Differentiator = () => {
  const points = [
    { num: '01', title: 'Builders who break things', desc: 'Every consultant on our team has shipped production code. Every engineer has done offensive work. The two skills compound.' },
    { num: '02', title: 'Education is not a side hustle', desc: 'Our college and community programs are run by the same practitioners delivering enterprise engagements — not a separate marketing team.' },
    { num: '03', title: 'Reports you will actually read', desc: 'No 200-page PDFs of CVSS scores. Findings are prioritized, mapped to your stack, and written like a teammate explained them.' },
    { num: '04', title: 'On-call when it matters', desc: 'Retainers come with a real human number. The same people who delivered your engagement pick up the phone at 3am.' }
  ];
  return (
    <section className="differentiator">
      <div className="container">
        <Reveal>
          <span className="eyebrow">WHY DESTRO SEC</span>
          <h2 className="section-h2">The discipline of an attacker.<br/><span className="text-secondary">The reliability of a vendor.</span></h2>
        </Reveal>
        <div className="diff-grid">
          {points.map((p, i) => (
            <Reveal key={p.num} delay={i * 80}>
              <div className="diff-item">
                <div className="diff-num mono">{p.num}</div>
                <h4 className="diff-title">{p.title}</h4>
                <p className="diff-desc">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudyHighlight = ({ onNav }) => {
  return (
    <section className="case-highlight">
      <div className="container">
        <Reveal>
          <div className="case-card glass">
            <div className="case-content">
              <span className="chip security"><span className="dot" />Security · Case Study</span>
              <h3 className="case-headline">"They found three critical paths our previous vendor missed in two years."</h3>
              <div className="case-meta">
                <div>
                  <div className="case-meta-label mono">CLIENT</div>
                  <div className="case-meta-value">Sequoia FinTech</div>
                </div>
                <div>
                  <div className="case-meta-label mono">ENGAGEMENT</div>
                  <div className="case-meta-value">Red Team — 6 weeks</div>
                </div>
                <div>
                  <div className="case-meta-label mono">OUTCOME</div>
                  <div className="case-meta-value">3 critical, 11 high</div>
                </div>
              </div>
              <button className="btn btn-secondary" onClick={() => onNav('services', { vertical: 'security' })}>
                See security services
              </button>
            </div>
            <div className="case-visual">
              <div className="case-terminal mono">
                <div className="case-terminal-bar">
                  <span className="dot-r" />
                  <span className="dot-y" />
                  <span className="dot-g" />
                  <span style={{ marginLeft: 12, color: 'var(--color-text-muted)', fontSize: 11 }}>~/engagements/sequoia</span>
                </div>
                <div className="case-terminal-body">
                  <div><span style={{ color: '#ff6b35' }}>$</span> ./recon --target prod.internal</div>
                  <div className="dim">[+] 142 hosts discovered</div>
                  <div className="dim">[+] 18 services exposed</div>
                  <div><span style={{ color: '#ff6b35' }}>$</span> ./auth-fuzz --user-svc</div>
                  <div className="dim">[!] privilege escalation found</div>
                  <div style={{ color: '#e63946' }}>[CRIT] CVE-2024-XXXX bypass</div>
                  <div><span style={{ color: '#06d6a0' }}>✓</span> remediation pushed</div>
                  <div className="cursor">█</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const FooterCTA = ({ onNav }) => (
  <section className="footer-cta">
    <div className="container">
      <Reveal>
        <div className="cta-block">
          <h2 className="cta-headline">Ready to break in<br/>for build better?</h2>
          <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
            Tell us what you're working on. We'll come back within 24 hours with a real human and a real plan.
          </p>
          <div className="cta-buttons">
            <MagneticBtn className="btn btn-primary btn-lg" onClick={() => onNav('quote')}>
              Get a Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 8, verticalAlign: 'middle' }}><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </MagneticBtn>
            <button className="btn btn-ghost btn-lg" onClick={() => onNav('contact')}>Or just say hi →</button>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── Marquee ────────────────────────────────────
const Marquee = () => {
  const items1 = ['Penetration Testing', 'Red Team', 'OSCP', 'Burp Suite', 'Nuclei', 'Active Directory', 'Cloud Pen Test', 'Incident Response', 'Threat Modeling', 'OWASP Top 10', 'Custom Software', 'DevSecOps', 'CTF Hosting', 'Bootcamps'];
  const items2 = ['BUILD FOR BREAK IN', 'BREAK IN FOR BUILD BETTER', 'SECURITY', 'SOFTWARE', 'EDUCATION', 'BUILDERS WHO BREAK', 'BREAKERS WHO BUILD', 'EST. 2023'];
  return (
    <section className="marquee-section" aria-hidden>
      <div className="marquee-row marquee-row-1">
        <div className="marquee-track">
          {[...items1, ...items1].map((it, i) => (
            <span key={i} className="marquee-item">
              <span className="m-bullet" />{it}
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-row marquee-row-2">
        <div className="marquee-track marquee-reverse">
          {[...items2, ...items2].map((it, i) => (
            <span key={i} className="marquee-item marquee-item-display">{it}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Manifesto ──────────────────────────────────
const Manifesto = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (document.documentElement.hasAttribute('data-no-scroll-anim')) { setProgress(1); return; }
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - (r.top - vh * 0.2) / (vh * 0.6)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = ['We', 'break', 'things', 'on', 'purpose,', 'so', 'the', 'systems', 'you', 'build', 'survive', 'the', 'people', 'who', 'don\u2019t.'];

  return (
    <section className="manifesto" ref={ref}>
      <div className="container">
        <span className="eyebrow">MANIFESTO</span>
        <h2 className="manifesto-text">
          {words.map((w, i) => {
            const wp = Math.max(0, Math.min(1, (progress * words.length - i)));
            const isAccent = ['break', 'things', 'survive', 'don\u2019t.'].includes(w);
            return (
              <span key={i} className="manif-word" style={{
                opacity: 0.15 + wp * 0.85,
                color: isAccent && wp > 0.6 ? 'var(--color-brand)' : undefined
              }}>{w} </span>
            );
          })}
        </h2>
        <div className="manifesto-meta mono">
          <div><span className="text-muted">v2.0</span> · est. 2023 · Bangalore</div>
          <div className="manifesto-sig">— the destro sec team</div>
        </div>
      </div>
    </section>
  );
};

// ─── Magnetic Button ─────────────────────────────
const MagneticBtn = ({ children, className = '', onClick, ...rest }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <button ref={ref} className={`magnetic ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} {...rest}>
      <span className="magnetic-inner">{children}</span>
    </button>
  );
};

Object.assign(window, { HomePage, Marquee, Manifesto, MagneticBtn });