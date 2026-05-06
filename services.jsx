// services.jsx — Services page with cuboid navigator + DISTINCT layout per vertical

const ServicesPage = ({ onNav, initialVertical, tweaks }) => {
  const [active, setActive] = useState(initialVertical || 'security');
  const contentHeadingRef = useRef(null);

  useEffect(() => { if (initialVertical) setActive(initialVertical); }, [initialVertical]);

  const handleSwitch = (key) => {
    if (key === active) return;
    setActive(key);
    setTimeout(() => contentHeadingRef.current?.focus?.(), 320);
  };

  const v = VERTICAL_DATA[active];

  return (
    <div className="page services-page" data-vertical={active}>
      <div className="services-glow" style={{
        background: `radial-gradient(circle, rgba(${v.rgb}, ${0.18 * tweaks.glow}) 0%, transparent 60%)`
      }} />
      <section className="services-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">SERVICES</span>
            <h1 className="services-h1">What we do<span style={{ color: 'var(--color-brand)' }}>.</span></h1>
            <p className="lead" style={{ maxWidth: 640 }}>
              Three verticals. Three distinct ways of working. Switch between them with the cuboid below.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="services-content-wrap">
        <div className={`vertical-content ${active === 'security' ? 'active' : ''}`} role="tabpanel" aria-hidden={active !== 'security'}>
          <SecurityPanel onNav={onNav} contentHeadingRef={active === 'security' ? contentHeadingRef : null} />
        </div>
        <div className={`vertical-content ${active === 'software' ? 'active' : ''}`} role="tabpanel" aria-hidden={active !== 'software'}>
          <SoftwarePanel onNav={onNav} contentHeadingRef={active === 'software' ? contentHeadingRef : null} />
        </div>
        <div className={`vertical-content ${active === 'education' ? 'active' : ''}`} role="tabpanel" aria-hidden={active !== 'education'}>
          <EducationPanel onNav={onNav} contentHeadingRef={active === 'education' ? contentHeadingRef : null} />
        </div>
      </div>

      <CuboidNavigator active={active} onChange={handleSwitch} style={tweaks.cuboidStyle} />
    </div>
  );
};

// ─── 3D Wireframe rotating cube (interactive) ──────────
const RotatingShape = ({ shape = 'cube', accent }) => {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 25, y: 0 });
  const auto = useRef(true);

  useEffect(() => {
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000; last = now;
      if (auto.current) setRot(r => ({ ...r, y: r.y + dt * 18 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e) => {
    auto.current = false;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 60;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -40;
    setRot({ x: 25 + y, y: rot.y + x * 0.05 });
  };
  const onLeave = () => { auto.current = true; };

  return (
    <div className="rotshape-scene" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="rotshape" style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}>
        {shape === 'cube' && ['front','back','right','left','top','bottom'].map(f => (
          <div key={f} className={`rs-face rs-${f}`} style={{ borderColor: accent }}>
            <div className="rs-grid" style={{ background: `linear-gradient(${accent}11, transparent), linear-gradient(90deg, ${accent}22 1px, transparent 1px) 0 0/16px 16px, linear-gradient(${accent}22 1px, transparent 1px) 0 0/16px 16px` }}/>
          </div>
        ))}
        {shape === 'octa' && [...Array(8)].map((_, i) => (
          <div key={i} className="octa-tri" style={{ borderColor: accent, transform: `rotateY(${i * 45}deg) rotateZ(54.7deg) translateY(-50%)` }}/>
        ))}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════
// SECURITY — Interactive Kill Chain + 3D Cube
// ════════════════════════════════════════════════════
const SecurityPanel = ({ onNav, contentHeadingRef }) => {
  const v = VERTICAL_DATA.security;
  const [activeStage, setActiveStage] = useState(0);

  const killChain = [
    { stage: 'RECON', name: 'Penetration Testing', desc: 'External, internal, and web app assessments scoped to your real threat model — not a checklist.', metric: '142', metricLabel: 'avg attack surface mapped' },
    { stage: 'INITIAL', name: 'Red Team Engagements', desc: 'Multi-week adversarial simulations with full kill-chain reporting and detection-engineering feedback.', metric: '6 wks', metricLabel: 'typical engagement length' },
    { stage: 'PERSIST', name: 'Vulnerability Assessment', desc: 'Continuous scanning, triage, and prioritization across cloud, AD, and application layers.', metric: '24 hr', metricLabel: 'critical triage SLA' },
    { stage: 'IMPACT', name: 'Incident Response', desc: 'On-call IR retainer + post-breach forensics and a 90-day remediation roadmap your team will actually finish.', metric: '15 min', metricLabel: 'avg pickup time' },
    { stage: 'HARDEN', name: 'Security Training', desc: 'Hands-on labs for blue and red team workflows — built around your stack and your runbooks.', metric: '∞', metricLabel: 'replays in your lab' }
  ];

  return (
    <div className="container sec-panel">
      <div className="sec-hero">
        <div className="sec-hero-left">
          <span className="chip" style={{ color: v.color, borderColor: `rgba(${v.rgb}, 0.4)`, background: `rgba(${v.rgb}, 0.08)` }}>
            <span className="dot" />BUILT FOR BREAK IN
          </span>
          <h2 ref={contentHeadingRef} tabIndex="-1" className="vc-headline" style={{ outline: 'none' }}>
            We break in so you can <span style={{ color: v.color }}>build better.</span>
          </h2>
          <p className="lead vc-desc">Adversarial security testing from operators who think like attackers. Every engagement maps to how real intrusions actually unfold.</p>
          <div className="sec-stats">
            <div><div className="sec-stat-num">120<span style={{ color: v.color }}>+</span></div><div className="sec-stat-label mono">ENGAGEMENTS</div></div>
            <div><div className="sec-stat-num">3.2<span style={{ color: v.color }}>×</span></div><div className="sec-stat-label mono">FINDINGS VS PEERS</div></div>
            <div><div className="sec-stat-num">98<span style={{ color: v.color }}>%</span></div><div className="sec-stat-label mono">RETENTION</div></div>
          </div>
        </div>
        <div className="sec-hero-right">
          <RotatingShape shape="cube" accent={v.color} />
          <div className="sec-hero-tag mono">DRAG TO ROTATE</div>
        </div>
      </div>

      <div className="sec-killchain">
        <div className="sec-kc-header">
          <span className="eyebrow">THE KILL CHAIN — OUR SERVICES MAPPED</span>
          <p className="text-secondary" style={{ fontSize: 14, fontFamily: 'var(--font-mono)' }}>Hover or tap a stage</p>
        </div>
        <div className="kc-stages">
          {killChain.map((s, i) => (
            <button
              key={i}
              className={`kc-stage ${i === activeStage ? 'active' : ''}`}
              onMouseEnter={() => setActiveStage(i)}
              onClick={() => setActiveStage(i)}
              style={{ '--accent': v.color, '--accent-rgb': v.rgb }}
            >
              <div className="kc-stage-num mono">0{i + 1}</div>
              <div className="kc-stage-tag mono">{s.stage}</div>
              <div className="kc-stage-bar"><div className="kc-stage-fill" /></div>
            </button>
          ))}
        </div>
        <div className="kc-detail glass" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
          <div className="kc-detail-left">
            <div className="kc-detail-tag mono" style={{ color: v.color }}>{killChain[activeStage].stage}</div>
            <h3 className="kc-detail-name">{killChain[activeStage].name}</h3>
            <p className="kc-detail-desc">{killChain[activeStage].desc}</p>
            <button className="btn btn-primary" onClick={() => onNav('quote', { vertical: 'security' })}>
              Scope this engagement →
            </button>
          </div>
          <div className="kc-detail-right">
            <div className="kc-metric-num" style={{ color: v.color }}>{killChain[activeStage].metric}</div>
            <div className="kc-metric-label mono">{killChain[activeStage].metricLabel}</div>
          </div>
        </div>
      </div>

      <div className="sec-proof">
        <blockquote>"They found three critical paths our previous vendor missed in two years."</blockquote>
        <cite className="mono">— Sequoia FinTech · Red Team, 6 weeks · 3 critical, 11 high</cite>
      </div>

      <div className="sec-skills">
        <span className="vc-skills-label">ARSENAL</span>
        <div className="skill-chip-row" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
          {(window.SKILL_CHIPS?.security || []).map(s => <span key={s} className="skill-chip">{s}</span>)}
        </div>
      </div>

      <div className="sec-compliance">
        <span className="eyebrow">COMPLIANCE & FRAMEWORKS</span>
        <div className="sec-comp-row">
          {['ISO 27001', 'SOC 2 Type II', 'PCI-DSS', 'HIPAA', 'DPDPA 2023', 'RBI ITF', 'CERT-In', 'OWASP ASVS', 'MITRE ATT&CK'].map(f => (
            <div key={f} className="sec-comp-chip">{f}</div>
          ))}
        </div>
      </div>

      <div className="sec-deliverables">
        <span className="eyebrow">WHAT YOU GET</span>
        <div className="sec-deliv-grid">
          {[
            { t: 'Executive summary', d: 'One page, board-ready. No CVSS jargon.' },
            { t: 'Technical findings', d: 'Reproducible PoC, severity, fix, and re-test plan.' },
            { t: 'Detection feedback', d: 'What your SOC saw vs what we did. Tuning notes included.' },
            { t: 'Remediation roadmap', d: '90-day prioritized plan your team will actually finish.' }
          ].map(d => (
            <div key={d.t} className="sec-deliv" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
              <div className="sec-deliv-t">{d.t}</div>
              <div className="sec-deliv-d">{d.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════
// SOFTWARE — Code editor + module grid
// ════════════════════════════════════════════════════
const SoftwarePanel = ({ onNav, contentHeadingRef }) => {
  const v = VERTICAL_DATA.software;
  const modules = [
    { name: 'Custom Software', icon: 'box', desc: 'Greenfield builds with security baked into architecture, not bolted on.', tag: 'BUILD' },
    { name: 'Web & Mobile Apps', icon: 'screen', desc: 'Production-grade apps with hardened auth, sane defaults, and audit trails.', tag: 'SHIP' },
    { name: 'API Development', icon: 'plug', desc: 'Authenticated, rate-limited, observable APIs your partners can trust.', tag: 'INTEGRATE' },
    { name: 'Code Review & SDLC', icon: 'eye', desc: 'Threat-model-driven reviews and CI/CD pipelines that catch regressions.', tag: 'AUDIT' },
    { name: 'DevSecOps', icon: 'gear', desc: 'Shift left without slowing delivery — practical guardrails, not theatre.', tag: 'AUTOMATE' }
  ];

  return (
    <div className="container sw-panel">
      <div className="sw-hero">
        <div className="sw-hero-left">
          <span className="chip" style={{ color: v.color, borderColor: `rgba(${v.rgb}, 0.4)`, background: `rgba(${v.rgb}, 0.08)` }}>
            <span className="dot" />SECURE BY DEFAULT
          </span>
          <h2 ref={contentHeadingRef} tabIndex="-1" className="vc-headline" style={{ outline: 'none' }}>
            Software shipped with <span style={{ color: v.color }}>attackers in mind.</span>
          </h2>
          <p className="lead vc-desc">Custom development from a team that's spent years exploiting other people's code. Every line we write assumes it will be attacked — because we know exactly how.</p>
        </div>
        <div className="sw-editor">
          <div className="sw-editor-bar">
            <span className="dot-r"/><span className="dot-y"/><span className="dot-g"/>
            <span className="sw-tabs mono">
              <span className="sw-tab active">auth.ts</span>
              <span className="sw-tab">middleware.ts</span>
              <span className="sw-tab">+</span>
            </span>
          </div>
          <div className="sw-editor-body mono">
            <div><span className="sw-ln">1</span><span className="sw-kw">import</span> {'{'} verifyJWT, rateLimit {'}'} <span className="sw-kw">from</span> <span className="sw-str">'./security'</span></div>
            <div><span className="sw-ln">2</span><span className="sw-kw">import</span> {'{'} z {'}'} <span className="sw-kw">from</span> <span className="sw-str">'zod'</span></div>
            <div><span className="sw-ln">3</span></div>
            <div><span className="sw-ln">4</span><span className="sw-com">// auth assumes the worst</span></div>
            <div><span className="sw-ln">5</span><span className="sw-kw">export const</span> <span className="sw-fn">login</span> = <span className="sw-kw">async</span> (req) =&gt; {'{'}</div>
            <div><span className="sw-ln">6</span>  <span className="sw-kw">await</span> <span className="sw-fn">rateLimit</span>(req.ip, <span className="sw-num">5</span>)</div>
            <div><span className="sw-ln">7</span>  <span className="sw-kw">const</span> body = Schema.<span className="sw-fn">parse</span>(req.body)</div>
            <div><span className="sw-ln">8</span>  <span className="sw-kw">const</span> user = <span className="sw-kw">await</span> <span className="sw-fn">findUser</span>(body.email)</div>
            <div><span className="sw-ln">9</span>  <span className="sw-kw">if</span> (!user) <span className="sw-kw">return</span> <span className="sw-fn">timingSafeFail</span>()</div>
            <div><span className="sw-ln">10</span>  <span className="sw-kw">return</span> <span className="sw-fn">issueShortToken</span>(user)</div>
            <div><span className="sw-ln">11</span>{'}'}<span className="sw-cur">█</span></div>
          </div>
          <div className="sw-editor-status mono">
            <span style={{ color: v.color }}>●</span> 0 vulns · ASVS L2 · 124ms p99
          </div>
        </div>
      </div>

      <div className="sw-modules">
        <span className="eyebrow">MODULES</span>
        <div className="sw-mod-grid">
          {modules.map((m, i) => (
            <div key={m.name} className="sw-mod" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
              <div className="sw-mod-tag mono">{m.tag}</div>
              <h4 className="sw-mod-name">{m.name}</h4>
              <p className="sw-mod-desc">{m.desc}</p>
              <div className="sw-mod-meta mono">/{i + 1}<span>·</span>module</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sw-stack">
        <span className="vc-skills-label">STACK</span>
        <div className="skill-chip-row" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
          {(window.SKILL_CHIPS?.software || []).map(s => <span key={s} className="skill-chip">{s}</span>)}
        </div>
      </div>

      <div className="sw-cta">
        <button className="btn btn-primary btn-lg" onClick={() => onNav('quote', { vertical: 'software' })}>Scope a build →</button>
      </div>

      <div className="sw-process">
        <span className="eyebrow">HOW WE BUILD</span>
        <div className="sw-proc-grid">
          {[
            { n: '01', t: 'Threat Model', d: 'Before a line of code, we map abuse cases against your data and users.' },
            { n: '02', t: 'Architect', d: 'Auth, secrets, and trust boundaries are designed in — not added later.' },
            { n: '03', t: 'Build & Review', d: 'Two-pair review on every PR; SAST/DAST in CI; threat-model gates per release.' },
            { n: '04', t: 'Hand Off', d: 'Runbooks, alerting, and a 30-day pairing window so your team owns it.' }
          ].map(p => (
            <div key={p.n} className="sw-proc" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
              <div className="sw-proc-num mono">{p.n}</div>
              <div className="sw-proc-t">{p.t}</div>
              <div className="sw-proc-d">{p.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sw-case glass" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
        <div className="sw-case-tag mono" style={{ color: v.color }}>CASE STUDY · NORDIC HEALTH CO.</div>
        <blockquote className="sw-case-q">"Their team shipped our patient portal in 14 weeks. Zero criticals in our first external audit."</blockquote>
        <div className="sw-case-meta mono">— Head of Engineering · HIPAA + ISO 27001 + SOC 2</div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════
// EDUCATION — Cohort timeline + leaderboard
// ════════════════════════════════════════════════════
const EducationPanel = ({ onNav, contentHeadingRef }) => {
  const v = VERTICAL_DATA.education;
  const cohort = [
    { week: 'Wk 1', title: 'Foundations', detail: 'Linux, networking, threat models' },
    { week: 'Wk 2', title: 'Web Exploitation', detail: 'OWASP Top 10, hands-on Burp labs' },
    { week: 'Wk 3', title: 'AD & Internals', detail: 'BloodHound, Kerberoasting, lateral movement' },
    { week: 'Wk 4', title: 'Cloud Pen Test', detail: 'AWS/GCP misconfig, IAM abuse' },
    { week: 'Wk 5', title: 'Reporting', detail: 'Writing findings the dev team will fix' },
    { week: 'Wk 6', title: 'Live CTF', detail: 'Capstone — real targets, real time' }
  ];
  const board = [
    { rank: 1, handle: 'r00t_eve', score: 4280, college: 'IIT Hyd' },
    { rank: 2, handle: 'nullbyte', score: 4100, college: 'BITS Goa' },
    { rank: 3, handle: 'shellz', score: 3960, college: 'IIIT-B' },
    { rank: 4, handle: 'pwn_kid', score: 3780, college: 'NIT Trichy' },
    { rank: 5, handle: 'sudo_em', score: 3640, college: 'VIT' }
  ];

  return (
    <div className="container ed-panel">
      <div className="ed-hero">
        <div>
          <span className="chip" style={{ color: v.color, borderColor: `rgba(${v.rgb}, 0.4)`, background: `rgba(${v.rgb}, 0.08)` }}>
            <span className="dot" />BUILT FOR BREAK IN
          </span>
          <h2 ref={contentHeadingRef} tabIndex="-1" className="vc-headline" style={{ outline: 'none' }}>
            Train the next generation<br/>of <span style={{ color: v.color }}>breakers.</span>
          </h2>
          <p className="lead vc-desc">College workshops, CTFs, and bootcamps run by practitioners — not slide-deck consultants. We teach how attacks actually work, then how to build systems that survive them.</p>
          <div className="ed-stats">
            <div><div className="ed-stat-num">2.4K<span style={{ color: v.color }}>+</span></div><div className="ed-stat-label mono">STUDENTS TRAINED</div></div>
            <div><div className="ed-stat-num">30<span style={{ color: v.color }}>+</span></div><div className="ed-stat-label mono">CTFS HOSTED</div></div>
            <div><div className="ed-stat-num">12</div><div className="ed-stat-label mono">COLLEGE PARTNERS</div></div>
          </div>
        </div>
        <div className="ed-shape">
          <RotatingShape shape="cube" accent={v.color} />
          <div className="ed-shape-tag mono">800 CONCURRENT</div>
        </div>
      </div>

      <div className="ed-grid">
        <div className="ed-cohort glass">
          <div className="ed-cohort-head">
            <h3>The 6-Week Bootcamp</h3>
            <span className="mono ed-cohort-meta">cohort_07 · 32 students · live</span>
          </div>
          <div className="ed-timeline">
            {cohort.map((c, i) => (
              <div key={i} className="ed-week" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
                <div className="ed-week-bullet" />
                <div className="ed-week-tag mono">{c.week}</div>
                <div className="ed-week-body">
                  <div className="ed-week-title">{c.title}</div>
                  <div className="ed-week-detail">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ed-board glass">
          <div className="ed-board-head">
            <h3>Live CTF Leaderboard</h3>
            <span className="mono ed-board-meta"><span className="ed-pulse"/>autumn_invitational · 47:22 left</span>
          </div>
          <div className="ed-board-list">
            {board.map(p => (
              <div key={p.rank} className={`ed-board-row ${p.rank === 1 ? 'leader' : ''}`} style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
                <div className="ed-rank mono">#{p.rank}</div>
                <div>
                  <div className="ed-handle">{p.handle}</div>
                  <div className="ed-college mono">{p.college}</div>
                </div>
                <div className="ed-score" style={{ color: p.rank === 1 ? v.color : undefined }}>{p.score.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="ed-board-foot mono">view full board →</div>
        </div>
      </div>

      <div className="ed-services">
        {VERTICAL_DATA.education.services.map((s, i) => (
          <div key={s.name} className="ed-svc" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
            <div className="ed-svc-num mono">/0{i + 1}</div>
            <div className="ed-svc-name">{s.name}</div>
            <div className="ed-svc-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="ed-cta">
        <button className="btn btn-primary btn-lg" onClick={() => onNav('quote', { vertical: 'education' })}>Host us at your campus →</button>
        <button className="btn btn-ghost" onClick={() => onNav('contact')}>Apply to a cohort →</button>
      </div>

      <div className="ed-partners">
        <span className="vc-skills-label">COLLEGE PARTNERS</span>
        <div className="ed-part-row">
          {['IIT Hyderabad', 'BITS Goa', 'IIIT-B', 'NIT Trichy', 'VIT Vellore', 'PES University', 'Manipal', 'SRM Chennai'].map(c => (
            <div key={c} className="ed-part-chip">{c}</div>
          ))}
        </div>
        <blockquote className="ed-part-q">
          "Their CTF infra ran flawlessly for 800 of our students. The mentorship after was even better."
          <cite className="mono">— Prof. Anand · IIT Hyderabad</cite>
        </blockquote>
      </div>

      <div className="ed-cohort-cta glass" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
        <div>
          <div className="ed-cohort-tag mono" style={{ color: v.color }}>NEXT COHORT · 12 SEATS LEFT</div>
          <div className="ed-cohort-when">Cohort 08 · starts June 17, 2026 · 6 weeks · live online</div>
        </div>
        <button className="btn btn-primary" onClick={() => onNav('contact')}>Apply now →</button>
      </div>
    </div>
  );
};

// ─── Cuboid Navigator ─────────────────────────────
const CuboidNavigator = ({ active, onChange, style }) => {
  const tabsRef = useRef(null);
  const keys = Object.keys(VERTICAL_DATA);

  const handleKey = (e, key) => {
    const idx = keys.indexOf(key);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const next = keys[(idx + 1) % keys.length]; onChange(next); tabsRef.current?.querySelector(`[data-key="${next}"]`)?.focus(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const prev = keys[(idx - 1 + keys.length) % keys.length]; onChange(prev); tabsRef.current?.querySelector(`[data-key="${prev}"]`)?.focus(); }
    else if (e.key === 'Home') { e.preventDefault(); onChange(keys[0]); }
    else if (e.key === 'End') { e.preventDefault(); onChange(keys[keys.length - 1]); }
  };

  return (
    <div className={`cuboid-navigator cuboid-style-${style}`} role="tablist" aria-label="Service verticals" ref={tabsRef}>
      <div className="cuboid-platform" aria-hidden />
      <div className="cuboid">
        {keys.map((key) => {
          const v = VERTICAL_DATA[key];
          const isActive = key === active;
          return (
            <button
              key={key} data-key={key} role="tab" id={`tab-${key}`}
              aria-selected={isActive} aria-controls={`panel-${key}`}
              tabIndex={isActive ? 0 : -1}
              className={`cuboid-face ${isActive ? 'active' : ''}`}
              onClick={() => onChange(key)}
              onKeyDown={(e) => handleKey(e, key)}
              style={{ '--face-accent': v.color, '--face-rgb': v.rgb }}
            >
              <div className="cuboid-face-inner">
                <div className="cuboid-face-icon"><VerticalIcon vertical={key} size={20} /></div>
                <div className="cuboid-face-label">{v.name}</div>
              </div>
              {isActive && <div className="cuboid-face-glow" aria-hidden />}
            </button>
          );
        })}
      </div>
      <div className="cuboid-hint mono" aria-hidden>
        <span className="cuboid-hint-key">←</span><span className="cuboid-hint-key">→</span> switch vertical
      </div>
    </div>
  );
};

const SKILL_CHIPS = {
  security: ['Burp Suite Pro', 'Nuclei', 'Metasploit', 'BloodHound', 'OSCP-aligned', 'MITRE ATT&CK', 'Active Directory', 'Cloud Pen Test', 'Web App / API', 'Mobile (iOS/Android)', 'Source Code Review', 'CVE Research'],
  software: ['React / Next.js', 'TypeScript', 'Go', 'Rust', 'Node.js', 'PostgreSQL', 'Kubernetes', 'AWS / GCP', 'Threat Modeling', 'OWASP ASVS', 'CI/CD Hardening', 'Zero Trust'],
  education: ['Custom Curriculum', 'CTF Infrastructure', 'OSCP Prep', 'CEH Prep', 'CompTIA Sec+', 'Hands-on Labs', 'Phishing Sims', 'College Workshops', 'Bootcamp Cohorts', 'Mentorship']
};

Object.assign(window, { ServicesPage, SKILL_CHIPS });
