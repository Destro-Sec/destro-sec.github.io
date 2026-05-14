function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// home.jsx — Home page

const HomePage = ({
  onNav,
  tweaks
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement(HomeHero, {
    onNav: onNav,
    tweaks: tweaks
  }), /*#__PURE__*/React.createElement(Marquee, null), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(AudienceRouter, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(VerticalsIntro, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(ProcessPreview, null), /*#__PURE__*/React.createElement(IndiaFirst, null), /*#__PURE__*/React.createElement(Differentiator, null), /*#__PURE__*/React.createElement(CaseStudyHighlight, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(Manifesto, null), /*#__PURE__*/React.createElement(FooterCTA, {
    onNav: onNav
  }));
};
const HomeHero = ({
  onNav,
  tweaks
}) => {
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    if (document.documentElement.hasAttribute('data-no-scroll-anim')) return;
    const onScroll = () => {
      const y = window.scrollY;
      setParallax(Math.min(y * 0.3, 200));
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    ref: heroRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-cube-bg",
    style: {
      transform: `translate(-50%, calc(-50% + ${parallax * 0.5}px))`
    }
  }, /*#__PURE__*/React.createElement(WireframeCube, {
    size: 720,
    intensity: tweaks.glow
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-glow",
    style: {
      opacity: 0.5 * tweaks.glow
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container hero-inner"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 0
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "SECURITY \xB7 SOFTWARE \xB7 EDUCATION")), /*#__PURE__*/React.createElement("h1", {
    className: "hero-headline"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 80,
    as: "span",
    className: "hero-line"
  }, /*#__PURE__*/React.createElement("span", null, "Built For")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 180,
    as: "span",
    className: "hero-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-accent"
  }, "Break In", /*#__PURE__*/React.createElement("span", {
    className: "hero-period"
  }, ".")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 320
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead hero-sub"
  }, "Security consulting, software development, and hands-on education \u2014 built by a community that thinks like attackers.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 420
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onNav('quote')
  }, "Get a Quote", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8M7 3l4 4-4 4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-lg",
    onClick: () => onNav('services')
  }, "Explore Services"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 560
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-meta mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-meta-dot"
  }), /*#__PURE__*/React.createElement("span", null, "Available for engagements \xB7 Q3 2026")))), /*#__PURE__*/React.createElement("div", {
    className: "scroll-indicator",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "scroll"), /*#__PURE__*/React.createElement("div", {
    className: "scroll-line"
  })), /*#__PURE__*/React.createElement("svg", {
    className: "hero-lineart",
    viewBox: "0 0 1200 600",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "laGrad",
    x1: "0",
    x2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#ff6b35",
    stopOpacity: "0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "#ff6b35",
    stopOpacity: "0.6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#ff6b35",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    className: "la-path la-1",
    d: "M -50 380 Q 200 280, 400 360 T 800 320 T 1250 380",
    fill: "none",
    stroke: "url(#laGrad)",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("path", {
    className: "la-path la-2",
    d: "M -50 420 Q 250 360, 500 420 T 950 380 T 1250 440",
    fill: "none",
    stroke: "url(#laGrad)",
    strokeWidth: "0.8",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "la-dot la-d1",
    cx: "200",
    cy: "320",
    r: "2.5",
    fill: "#ff6b35"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "la-dot la-d2",
    cx: "900",
    cy: "280",
    r: "2",
    fill: "#ff6b35",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "la-dot la-d3",
    cx: "600",
    cy: "440",
    r: "2",
    fill: "#ff6b35",
    opacity: "0.5"
  })));
};
const TrustBar = () => {
  const stats = [{
    value: '120+',
    label: 'Engagements delivered'
  }, {
    value: '2,400+',
    label: 'Students trained'
  }, {
    value: '40+',
    label: 'Production systems shipped'
  }, {
    value: '24h',
    label: 'Avg response time'
  }];
  const logos = ['Sequoia FinTech', 'Nordic Health Co.', 'IIT Hyderabad', 'Apex Defense', 'Gridline Labs', 'Prism AI'];
  return /*#__PURE__*/React.createElement("section", {
    className: "trust-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "trust-stats"
  }, stats.map(s => /*#__PURE__*/React.createElement(Stat, _extends({
    key: s.label
  }, s))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-strip-label mono"
  }, "TRUSTED BY"), /*#__PURE__*/React.createElement("div", {
    className: "logo-row"
  }, logos.map(l => /*#__PURE__*/React.createElement("div", {
    key: l,
    className: "logo-chip"
  }, l)))))));
};
const VerticalsIntro = ({
  onNav
}) => {
  return /*#__PURE__*/React.createElement("section", {
    className: "verticals-intro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "WHAT WE DO"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2"
  }, "Three verticals.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-secondary"
  }, "One shared discipline."))), /*#__PURE__*/React.createElement("div", {
    className: "verticals-grid"
  }, Object.entries(VERTICAL_DATA).map(([key, v], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: key,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("button", {
    className: `vertical-card vertical-card-${key}`,
    onClick: () => onNav('services', {
      vertical: key
    }),
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vertical-card-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vertical-card-icon"
  }, /*#__PURE__*/React.createElement(VerticalIcon, {
    vertical: key,
    size: 28
  })), /*#__PURE__*/React.createElement("div", {
    className: "vertical-card-num mono"
  }, "0", i + 1)), /*#__PURE__*/React.createElement("h3", {
    className: "vertical-card-title"
  }, v.name), /*#__PURE__*/React.createElement("p", {
    className: "vertical-card-desc"
  }, v.description), /*#__PURE__*/React.createElement("div", {
    className: "vertical-card-cta mono"
  }, "Explore ", v.name.toLowerCase(), /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8M7 3l4 4-4 4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))))))));
};

// ─── Audience Router ─────────────────────────────
const AudienceRouter = ({
  onNav
}) => {
  const audiences = [{
    id: 'company',
    tag: "I'M A COMPANY",
    title: 'I need our product secured — or built to begin with.',
    sub: 'Pen tests, red team, software, retainers.',
    go: ['services', {
      vertical: 'security'
    }]
  }, {
    id: 'college',
    tag: "I'M A COLLEGE",
    title: 'I want a CTF or workshop on our campus.',
    sub: 'Programs run by working operators.',
    go: ['services', {
      vertical: 'education'
    }]
  }, {
    id: 'student',
    tag: "I'M A STUDENT",
    title: 'I want to learn how to break (and build) things.',
    sub: 'Bootcamps, mentorship, open CTFs.',
    go: ['contact', {}]
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "audience"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "PICK YOUR PATH"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2"
  }, "Who's reading this?")), /*#__PURE__*/React.createElement("div", {
    className: "audience-grid"
  }, audiences.map((a, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: a.id,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("button", {
    className: `audience-card audience-${a.id}`,
    onClick: () => onNav(a.go[0], a.go[1])
  }, /*#__PURE__*/React.createElement("div", {
    className: "audience-tag mono"
  }, a.tag), /*#__PURE__*/React.createElement("h3", {
    className: "audience-title"
  }, a.title), /*#__PURE__*/React.createElement("p", {
    className: "audience-sub"
  }, a.sub), /*#__PURE__*/React.createElement("div", {
    className: "audience-cta mono"
  }, "go ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true
  }, "\u2192"))))))));
};

// ─── Process Preview ─────────────────────────────
const ProcessPreview = () => {
  const steps = [{
    n: '01',
    t: 'Scope',
    d: 'Same-day call. Real engineer. We map your threat model — not a checklist.'
  }, {
    n: '02',
    t: 'Engage',
    d: 'Operators on-site or remote. Daily updates in your channel of choice.'
  }, {
    n: '03',
    t: 'Report',
    d: 'Findings written for the people who fix them. Re-test included.'
  }, {
    n: '04',
    t: 'Stay close',
    d: 'Retainer or on-call. The same people pick up the phone at 3am.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "process-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "HOW WE WORK"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2"
  }, "Four steps. No surprises.")), /*#__PURE__*/React.createElement("div", {
    className: "proc-rail"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.n,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "proc-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proc-step-num mono"
  }, s.n), /*#__PURE__*/React.createElement("div", {
    className: "proc-step-line",
    "aria-hidden": true
  }), /*#__PURE__*/React.createElement("div", {
    className: "proc-step-t"
  }, s.t), /*#__PURE__*/React.createElement("div", {
    className: "proc-step-d"
  }, s.d)))))));
};

// ─── India First ─────────────────────────────────
const IndiaFirst = () => /*#__PURE__*/React.createElement("section", {
  className: "india-first"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
  className: "if-grid"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "eyebrow"
}, "BUILT IN INDIA \xB7 FOR INDIA-FIRST TEAMS"), /*#__PURE__*/React.createElement("h2", {
  className: "section-h2"
}, "Compliance-aware ", /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--color-brand)'
  }
}, "by default.")), /*#__PURE__*/React.createElement("p", {
  className: "lead",
  style: {
    maxWidth: 540
  }
}, "Engagements scoped to the frameworks Indian teams actually answer to. Reports your auditor and your regulator can both read.")), /*#__PURE__*/React.createElement("div", {
  className: "if-frameworks"
}, [{
  k: 'DPDPA 2023',
  d: 'Digital Personal Data Protection Act readiness, audits, and DPIA support.'
}, {
  k: 'RBI ITF',
  d: 'Information Technology Framework for banks, NBFCs, and payment systems.'
}, {
  k: 'CERT-In',
  d: '6-hour incident reporting playbooks and forensic retention controls.'
}, {
  k: 'ISO 27001 / SOC 2',
  d: 'For your global customers — pre-audit pen tests and gap closure.'
}].map(f => /*#__PURE__*/React.createElement("div", {
  key: f.k,
  className: "if-fw"
}, /*#__PURE__*/React.createElement("div", {
  className: "if-fw-k mono"
}, f.k), /*#__PURE__*/React.createElement("div", {
  className: "if-fw-d"
}, f.d))))))));
const Differentiator = () => {
  const points = [{
    num: '01',
    title: 'Builders who break things',
    desc: 'Every consultant on our team has shipped production code. Every engineer has done offensive work. The two skills compound.'
  }, {
    num: '02',
    title: 'Education is not a side hustle',
    desc: 'Our college and community programs are run by the same practitioners delivering enterprise engagements — not a separate marketing team.'
  }, {
    num: '03',
    title: 'Reports you will actually read',
    desc: 'No 200-page PDFs of CVSS scores. Findings are prioritized, mapped to your stack, and written like a teammate explained them.'
  }, {
    num: '04',
    title: 'On-call when it matters',
    desc: 'Retainers come with a real human number. The same people who delivered your engagement pick up the phone at 3am.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "differentiator"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "WHY DESTRO SEC"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2"
  }, "The discipline of an attacker.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-secondary"
  }, "The reliability of a vendor."))), /*#__PURE__*/React.createElement("div", {
    className: "diff-grid"
  }, points.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.num,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "diff-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "diff-num mono"
  }, p.num), /*#__PURE__*/React.createElement("h4", {
    className: "diff-title"
  }, p.title), /*#__PURE__*/React.createElement("p", {
    className: "diff-desc"
  }, p.desc)))))));
};
const CaseStudyHighlight = ({
  onNav
}) => {
  return /*#__PURE__*/React.createElement("section", {
    className: "case-highlight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "case-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip security"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Security \xB7 Case Study"), /*#__PURE__*/React.createElement("h3", {
    className: "case-headline"
  }, "\"They found three critical paths our previous vendor missed in two years.\""), /*#__PURE__*/React.createElement("div", {
    className: "case-meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "case-meta-label mono"
  }, "CLIENT"), /*#__PURE__*/React.createElement("div", {
    className: "case-meta-value"
  }, "Sequoia FinTech")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "case-meta-label mono"
  }, "ENGAGEMENT"), /*#__PURE__*/React.createElement("div", {
    className: "case-meta-value"
  }, "Red Team \u2014 6 weeks")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "case-meta-label mono"
  }, "OUTCOME"), /*#__PURE__*/React.createElement("div", {
    className: "case-meta-value"
  }, "3 critical, 11 high"))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => onNav('services', {
      vertical: 'security'
    })
  }, "See security services")), /*#__PURE__*/React.createElement("div", {
    className: "case-visual"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-terminal mono"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-terminal-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-r"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot-y"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot-g"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 12,
      color: 'var(--color-text-muted)',
      fontSize: 11
    }
  }, "~/engagements/sequoia")), /*#__PURE__*/React.createElement("div", {
    className: "case-terminal-body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff6b35'
    }
  }, "$"), " ./recon --target prod.internal"), /*#__PURE__*/React.createElement("div", {
    className: "dim"
  }, "[+] 142 hosts discovered"), /*#__PURE__*/React.createElement("div", {
    className: "dim"
  }, "[+] 18 services exposed"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff6b35'
    }
  }, "$"), " ./auth-fuzz --user-svc"), /*#__PURE__*/React.createElement("div", {
    className: "dim"
  }, "[!] privilege escalation found"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#e63946'
    }
  }, "[CRIT] CVE-2024-XXXX bypass"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#06d6a0'
    }
  }, "\u2713"), " remediation pushed"), /*#__PURE__*/React.createElement("div", {
    className: "cursor"
  }, "\u2588"))))))));
};
const FooterCTA = ({
  onNav
}) => /*#__PURE__*/React.createElement("section", {
  className: "footer-cta"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
  className: "cta-block"
}, /*#__PURE__*/React.createElement("h2", {
  className: "cta-headline"
}, "Ready to break in", /*#__PURE__*/React.createElement("br", null), "to build better?"), /*#__PURE__*/React.createElement("p", {
  className: "lead",
  style: {
    margin: '0 auto',
    textAlign: 'center'
  }
}, "Tell us what you're working on. We'll come back within 24 hours with a real human and a real plan."), /*#__PURE__*/React.createElement("div", {
  className: "cta-buttons"
}, /*#__PURE__*/React.createElement(MagneticBtn, {
  className: "btn btn-primary btn-lg",
  onClick: () => onNav('quote')
}, "Get a Quote", /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 14 14",
  fill: "none",
  style: {
    marginLeft: 8,
    verticalAlign: 'middle'
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7h8M7 3l4 4-4 4",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}))), /*#__PURE__*/React.createElement("button", {
  className: "btn btn-ghost btn-lg",
  onClick: () => onNav('contact')
}, "Or just say hi \u2192"))))));

// ─── Marquee ────────────────────────────────────
const Marquee = () => {
  const items1 = ['Penetration Testing', 'Red Team', 'OSCP', 'Burp Suite', 'Nuclei', 'Active Directory', 'Cloud Pen Test', 'Incident Response', 'Threat Modeling', 'OWASP Top 10', 'Custom Software', 'DevSecOps', 'CTF Hosting', 'Bootcamps'];
  const items2 = ['BUILT FOR BREAK IN', 'BREAK IN TO BUILD BETTER', 'SECURITY', 'SOFTWARE', 'EDUCATION', 'BUILDERS WHO BREAK', 'BREAKERS WHO BUILD', 'EST. 2023'];
  return /*#__PURE__*/React.createElement("section", {
    className: "marquee-section",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee-row marquee-row-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee-track"
  }, [...items1, ...items1].map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "marquee-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-bullet"
  }), it)))), /*#__PURE__*/React.createElement("div", {
    className: "marquee-row marquee-row-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee-track marquee-reverse"
  }, [...items2, ...items2].map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "marquee-item marquee-item-display"
  }, it)))));
};

// ─── Manifesto ──────────────────────────────────
const Manifesto = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (document.documentElement.hasAttribute('data-no-scroll-anim')) {
      setProgress(1);
      return;
    }
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - (r.top - vh * 0.2) / (vh * 0.6)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const words = ['We', 'break', 'things', 'on', 'purpose,', 'so', 'the', 'systems', 'you', 'build', 'survive', 'the', 'people', 'who', "don't."];
  return /*#__PURE__*/React.createElement("section", {
    className: "manifesto",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "MANIFESTO"), /*#__PURE__*/React.createElement("p", {
    className: "sr-only"
  }, "We break things on purpose, so the systems you build survive the people who don't."), /*#__PURE__*/React.createElement("h2", {
    className: "manifesto-text",
    "aria-hidden": true
  }, words.map((w, i) => {
    const wp = Math.max(0, Math.min(1, progress * words.length - i));
    const isAccent = ['break', 'things', 'survive', "don't."].includes(w);
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "manif-word",
      style: {
        opacity: 0.15 + wp * 0.85,
        color: isAccent && wp > 0.6 ? 'var(--color-brand)' : undefined
      }
    }, w, " ");
  })), /*#__PURE__*/React.createElement("div", {
    className: "manifesto-meta mono"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, "v2.0"), " \xB7 est. 2023 \xB7 Bangalore"), /*#__PURE__*/React.createElement("div", {
    className: "manifesto-sig"
  }, "\u2014 the destro sec team"))));
};

// ─── Magnetic Button ─────────────────────────────
const MagneticBtn = ({
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const ref = useRef(null);
  const onMove = e => {
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
  return /*#__PURE__*/React.createElement("button", _extends({
    ref: ref,
    className: `magnetic ${className}`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "magnetic-inner"
  }, children));
};
Object.assign(window, {
  HomePage,
  Marquee,
  Manifesto,
  MagneticBtn
});