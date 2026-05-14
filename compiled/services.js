// services.jsx — Services page with cuboid navigator + DISTINCT layout per vertical

const ServicesPage = ({
  onNav,
  initialVertical,
  tweaks
}) => {
  const [active, setActive] = useState(initialVertical || 'security');
  const contentHeadingRef = useRef(null);
  useEffect(() => {
    if (initialVertical) setActive(initialVertical);
  }, [initialVertical]);
  const handleSwitch = key => {
    if (key === active) return;
    setActive(key);
    setTimeout(() => contentHeadingRef.current?.focus?.(), 320);
  };
  const v = VERTICAL_DATA[active];
  return /*#__PURE__*/React.createElement("div", {
    className: "page services-page",
    "data-vertical": active
  }, /*#__PURE__*/React.createElement("div", {
    className: "services-glow",
    style: {
      background: `radial-gradient(circle, rgba(${v.rgb}, ${0.18 * tweaks.glow}) 0%, transparent 60%)`
    }
  }), /*#__PURE__*/React.createElement("section", {
    className: "services-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "SERVICES"), /*#__PURE__*/React.createElement("h1", {
    className: "services-h1"
  }, "What we do", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-brand)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 640
    }
  }, "Three verticals. Three distinct ways of working. Switch between them with the cuboid below.")))), /*#__PURE__*/React.createElement("div", {
    className: "services-content-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: `vertical-content ${active === 'security' ? 'active' : ''}`,
    role: "tabpanel",
    "aria-hidden": active !== 'security'
  }, /*#__PURE__*/React.createElement(SecurityPanel, {
    onNav: onNav,
    contentHeadingRef: active === 'security' ? contentHeadingRef : null
  })), /*#__PURE__*/React.createElement("div", {
    className: `vertical-content ${active === 'software' ? 'active' : ''}`,
    role: "tabpanel",
    "aria-hidden": active !== 'software'
  }, /*#__PURE__*/React.createElement(SoftwarePanel, {
    onNav: onNav,
    contentHeadingRef: active === 'software' ? contentHeadingRef : null
  })), /*#__PURE__*/React.createElement("div", {
    className: `vertical-content ${active === 'education' ? 'active' : ''}`,
    role: "tabpanel",
    "aria-hidden": active !== 'education'
  }, /*#__PURE__*/React.createElement(EducationPanel, {
    onNav: onNav,
    contentHeadingRef: active === 'education' ? contentHeadingRef : null
  }))), /*#__PURE__*/React.createElement(CuboidNavigator, {
    active: active,
    onChange: handleSwitch,
    style: tweaks.cuboidStyle
  }));
};

// ─── 3D Wireframe rotating cube (interactive) ──────────
const RotatingShape = ({
  shape = 'cube',
  accent
}) => {
  const ref = useRef(null);
  const [rot, setRot] = useState({
    x: 25,
    y: 0
  });
  const auto = useRef(true);
  useEffect(() => {
    let raf,
      last = performance.now();
    const tick = now => {
      const dt = (now - last) / 1000;
      last = now;
      if (auto.current) setRot(r => ({
        ...r,
        y: r.y + dt * 18
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const onMove = e => {
    auto.current = false;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 60;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -40;
    setRot({
      x: 25 + y,
      y: rot.y + x * 0.05
    });
  };
  const onLeave = () => {
    auto.current = true;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "rotshape-scene",
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave
  }, /*#__PURE__*/React.createElement("div", {
    className: "rotshape",
    style: {
      transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`
    }
  }, shape === 'cube' && ['front', 'back', 'right', 'left', 'top', 'bottom'].map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    className: `rs-face rs-${f}`,
    style: {
      borderColor: accent
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rs-grid",
    style: {
      background: `linear-gradient(${accent}11, transparent), linear-gradient(90deg, ${accent}22 1px, transparent 1px) 0 0/16px 16px, linear-gradient(${accent}22 1px, transparent 1px) 0 0/16px 16px`
    }
  }))), shape === 'octa' && [...Array(8)].map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "octa-tri",
    style: {
      borderColor: accent,
      transform: `rotateY(${i * 45}deg) rotateZ(54.7deg) translateY(-50%)`
    }
  }))));
};

// ════════════════════════════════════════════════════
// SECURITY — Interactive Kill Chain + 3D Cube
// ════════════════════════════════════════════════════
const SecurityPanel = ({
  onNav,
  contentHeadingRef
}) => {
  const v = VERTICAL_DATA.security;
  const [activeStage, setActiveStage] = useState(0);
  const killChain = [{
    stage: 'RECON',
    name: 'Penetration Testing',
    desc: 'External, internal, and web app assessments scoped to your real threat model — not a checklist.',
    metric: '142',
    metricLabel: 'avg attack surface mapped'
  }, {
    stage: 'INITIAL',
    name: 'Red Team Engagements',
    desc: 'Multi-week adversarial simulations with full kill-chain reporting and detection-engineering feedback.',
    metric: '6 wks',
    metricLabel: 'typical engagement length'
  }, {
    stage: 'PERSIST',
    name: 'Vulnerability Assessment',
    desc: 'Continuous scanning, triage, and prioritization across cloud, AD, and application layers.',
    metric: '24 hr',
    metricLabel: 'critical triage SLA'
  }, {
    stage: 'IMPACT',
    name: 'Incident Response',
    desc: 'On-call IR retainer + post-breach forensics and a 90-day remediation roadmap your team will actually finish.',
    metric: '15 min',
    metricLabel: 'avg pickup time'
  }, {
    stage: 'HARDEN',
    name: 'Security Training',
    desc: 'Hands-on labs for blue and red team workflows — built around your stack and your runbooks.',
    metric: '∞',
    metricLabel: 'replays in your lab'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "container sec-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-hero-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      color: v.color,
      borderColor: `rgba(${v.rgb}, 0.4)`,
      background: `rgba(${v.rgb}, 0.08)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "BUILT FOR BREAK IN"), /*#__PURE__*/React.createElement("h2", {
    ref: contentHeadingRef,
    tabIndex: "-1",
    className: "vc-headline",
    style: {
      outline: 'none'
    }
  }, "We break in so you can ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "build better.")), /*#__PURE__*/React.createElement("p", {
    className: "lead vc-desc"
  }, "Adversarial security testing from operators who think like attackers. Every engagement maps to how real intrusions actually unfold."), /*#__PURE__*/React.createElement("div", {
    className: "sec-stats"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sec-stat-num"
  }, "120", /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "sec-stat-label mono"
  }, "ENGAGEMENTS")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sec-stat-num"
  }, "3.2", /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "sec-stat-label mono"
  }, "FINDINGS VS PEERS")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sec-stat-num"
  }, "98", /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "sec-stat-label mono"
  }, "RETENTION")))), /*#__PURE__*/React.createElement("div", {
    className: "sec-hero-right"
  }, /*#__PURE__*/React.createElement(RotatingShape, {
    shape: "cube",
    accent: v.color
  }), /*#__PURE__*/React.createElement("div", {
    className: "sec-hero-tag mono"
  }, "DRAG TO ROTATE"))), /*#__PURE__*/React.createElement("div", {
    className: "sec-killchain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-kc-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "THE KILL CHAIN \u2014 OUR SERVICES MAPPED"), /*#__PURE__*/React.createElement("p", {
    className: "text-secondary",
    style: {
      fontSize: 14,
      fontFamily: 'var(--font-mono)'
    }
  }, "Hover or tap a stage")), /*#__PURE__*/React.createElement("div", {
    className: "kc-stages"
  }, killChain.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `kc-stage ${i === activeStage ? 'active' : ''}`,
    onMouseEnter: () => setActiveStage(i),
    onClick: () => setActiveStage(i),
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kc-stage-num mono"
  }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "kc-stage-tag mono"
  }, s.stage), /*#__PURE__*/React.createElement("div", {
    className: "kc-stage-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kc-stage-fill"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "kc-detail glass",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kc-detail-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kc-detail-tag mono",
    style: {
      color: v.color
    }
  }, killChain[activeStage].stage), /*#__PURE__*/React.createElement("h3", {
    className: "kc-detail-name"
  }, killChain[activeStage].name), /*#__PURE__*/React.createElement("p", {
    className: "kc-detail-desc"
  }, killChain[activeStage].desc), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => onNav('quote', {
      vertical: 'security'
    })
  }, "Scope this engagement \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "kc-detail-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kc-metric-num",
    style: {
      color: v.color
    }
  }, killChain[activeStage].metric), /*#__PURE__*/React.createElement("div", {
    className: "kc-metric-label mono"
  }, killChain[activeStage].metricLabel)))), /*#__PURE__*/React.createElement("div", {
    className: "sec-proof"
  }, /*#__PURE__*/React.createElement("blockquote", null, "\"They found three critical paths our previous vendor missed in two years.\""), /*#__PURE__*/React.createElement("cite", {
    className: "mono"
  }, "\u2014 Sequoia FinTech \xB7 Red Team, 6 weeks \xB7 3 critical, 11 high")), /*#__PURE__*/React.createElement("div", {
    className: "sec-skills"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vc-skills-label"
  }, "ARSENAL"), /*#__PURE__*/React.createElement("div", {
    className: "skill-chip-row",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, (window.SKILL_CHIPS?.security || []).map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "skill-chip"
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "sec-compliance"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "COMPLIANCE & FRAMEWORKS"), /*#__PURE__*/React.createElement("div", {
    className: "sec-comp-row"
  }, ['ISO 27001', 'SOC 2 Type II', 'PCI-DSS', 'HIPAA', 'DPDPA 2023', 'RBI ITF', 'CERT-In', 'OWASP ASVS', 'MITRE ATT&CK'].map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    className: "sec-comp-chip"
  }, f)))), /*#__PURE__*/React.createElement("div", {
    className: "sec-deliverables"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "WHAT YOU GET"), /*#__PURE__*/React.createElement("div", {
    className: "sec-deliv-grid"
  }, [{
    t: 'Executive summary',
    d: 'One page, board-ready. No CVSS jargon.'
  }, {
    t: 'Technical findings',
    d: 'Reproducible PoC, severity, fix, and re-test plan.'
  }, {
    t: 'Detection feedback',
    d: 'What your SOC saw vs what we did. Tuning notes included.'
  }, {
    t: 'Remediation roadmap',
    d: '90-day prioritized plan your team will actually finish.'
  }].map(d => /*#__PURE__*/React.createElement("div", {
    key: d.t,
    className: "sec-deliv",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-deliv-t"
  }, d.t), /*#__PURE__*/React.createElement("div", {
    className: "sec-deliv-d"
  }, d.d))))));
};

// ════════════════════════════════════════════════════
// SOFTWARE — Code editor + module grid
// ════════════════════════════════════════════════════
const SoftwarePanel = ({
  onNav,
  contentHeadingRef
}) => {
  const v = VERTICAL_DATA.software;
  const modules = [{
    name: 'Custom Software',
    icon: 'box',
    desc: 'Greenfield builds with security baked into architecture, not bolted on.',
    tag: 'BUILD'
  }, {
    name: 'Web & Mobile Apps',
    icon: 'screen',
    desc: 'Production-grade apps with hardened auth, sane defaults, and audit trails.',
    tag: 'SHIP'
  }, {
    name: 'API Development',
    icon: 'plug',
    desc: 'Authenticated, rate-limited, observable APIs your partners can trust.',
    tag: 'INTEGRATE'
  }, {
    name: 'Code Review & SDLC',
    icon: 'eye',
    desc: 'Threat-model-driven reviews and CI/CD pipelines that catch regressions.',
    tag: 'AUDIT'
  }, {
    name: 'DevSecOps',
    icon: 'gear',
    desc: 'Shift left without slowing delivery — practical guardrails, not theatre.',
    tag: 'AUTOMATE'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "container sw-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sw-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sw-hero-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      color: v.color,
      borderColor: `rgba(${v.rgb}, 0.4)`,
      background: `rgba(${v.rgb}, 0.08)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "SECURE BY DEFAULT"), /*#__PURE__*/React.createElement("h2", {
    ref: contentHeadingRef,
    tabIndex: "-1",
    className: "vc-headline",
    style: {
      outline: 'none'
    }
  }, "Software shipped with ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "attackers in mind.")), /*#__PURE__*/React.createElement("p", {
    className: "lead vc-desc"
  }, "Custom development from a team that's spent years exploiting other people's code. Every line we write assumes it will be attacked \u2014 because we know exactly how.")), /*#__PURE__*/React.createElement("div", {
    className: "sw-editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sw-editor-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot-r"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot-y"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot-g"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sw-tabs mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sw-tab active"
  }, "auth.ts"), /*#__PURE__*/React.createElement("span", {
    className: "sw-tab"
  }, "middleware.ts"), /*#__PURE__*/React.createElement("span", {
    className: "sw-tab"
  }, "+"))), /*#__PURE__*/React.createElement("div", {
    className: "sw-editor-body mono"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "1"), /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "import"), " ", '{', " verifyJWT, rateLimit ", '}', " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "from"), " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-str"
  }, "'./security'")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "2"), /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "import"), " ", '{', " z ", '}', " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "from"), " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-str"
  }, "'zod'")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "3")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "4"), /*#__PURE__*/React.createElement("span", {
    className: "sw-com"
  }, "// auth assumes the worst")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "5"), /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "export const"), " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-fn"
  }, "login"), " = ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "async"), " (req) => ", '{'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "6"), "  ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "await"), " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-fn"
  }, "rateLimit"), "(req.ip, ", /*#__PURE__*/React.createElement("span", {
    className: "sw-num"
  }, "5"), ")"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "7"), "  ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "const"), " body = Schema.", /*#__PURE__*/React.createElement("span", {
    className: "sw-fn"
  }, "parse"), "(req.body)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "8"), "  ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "const"), " user = ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "await"), " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-fn"
  }, "findUser"), "(body.email)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "9"), "  ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "if"), " (!user) ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "return"), " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-fn"
  }, "timingSafeFail"), "()"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "10"), "  ", /*#__PURE__*/React.createElement("span", {
    className: "sw-kw"
  }, "return"), " ", /*#__PURE__*/React.createElement("span", {
    className: "sw-fn"
  }, "issueShortToken"), "(user)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sw-ln"
  }, "11"), '}', /*#__PURE__*/React.createElement("span", {
    className: "sw-cur"
  }, "\u2588"))), /*#__PURE__*/React.createElement("div", {
    className: "sw-editor-status mono"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "\u25CF"), " 0 vulns \xB7 ASVS L2 \xB7 124ms p99"))), /*#__PURE__*/React.createElement("div", {
    className: "sw-modules"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "MODULES"), /*#__PURE__*/React.createElement("div", {
    className: "sw-mod-grid"
  }, modules.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    className: "sw-mod",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sw-mod-tag mono"
  }, m.tag), /*#__PURE__*/React.createElement("h4", {
    className: "sw-mod-name"
  }, m.name), /*#__PURE__*/React.createElement("p", {
    className: "sw-mod-desc"
  }, m.desc), /*#__PURE__*/React.createElement("div", {
    className: "sw-mod-meta mono"
  }, "/", i + 1, /*#__PURE__*/React.createElement("span", null, "\xB7"), "module"))))), /*#__PURE__*/React.createElement("div", {
    className: "sw-stack"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vc-skills-label"
  }, "STACK"), /*#__PURE__*/React.createElement("div", {
    className: "skill-chip-row",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, (window.SKILL_CHIPS?.software || []).map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "skill-chip"
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "sw-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onNav('quote', {
      vertical: 'software'
    })
  }, "Scope a build \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "sw-process"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "HOW WE BUILD"), /*#__PURE__*/React.createElement("div", {
    className: "sw-proc-grid"
  }, [{
    n: '01',
    t: 'Threat Model',
    d: 'Before a line of code, we map abuse cases against your data and users.'
  }, {
    n: '02',
    t: 'Architect',
    d: 'Auth, secrets, and trust boundaries are designed in — not added later.'
  }, {
    n: '03',
    t: 'Build & Review',
    d: 'Two-pair review on every PR; SAST/DAST in CI; threat-model gates per release.'
  }, {
    n: '04',
    t: 'Hand Off',
    d: 'Runbooks, alerting, and a 30-day pairing window so your team owns it.'
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.n,
    className: "sw-proc",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sw-proc-num mono"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "sw-proc-t"
  }, p.t), /*#__PURE__*/React.createElement("div", {
    className: "sw-proc-d"
  }, p.d))))), /*#__PURE__*/React.createElement("div", {
    className: "sw-case glass",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sw-case-tag mono",
    style: {
      color: v.color
    }
  }, "CASE STUDY \xB7 NORDIC HEALTH CO."), /*#__PURE__*/React.createElement("blockquote", {
    className: "sw-case-q"
  }, "\"Their team shipped our patient portal in 14 weeks. Zero criticals in our first external audit.\""), /*#__PURE__*/React.createElement("div", {
    className: "sw-case-meta mono"
  }, "\u2014 Head of Engineering \xB7 HIPAA + ISO 27001 + SOC 2")));
};

// ════════════════════════════════════════════════════
// EDUCATION — Cohort timeline + leaderboard
// ════════════════════════════════════════════════════
const EducationPanel = ({
  onNav,
  contentHeadingRef
}) => {
  const v = VERTICAL_DATA.education;
  const cohort = [{
    week: 'Wk 1',
    title: 'Foundations',
    detail: 'Linux, networking, threat models'
  }, {
    week: 'Wk 2',
    title: 'Web Exploitation',
    detail: 'OWASP Top 10, hands-on Burp labs'
  }, {
    week: 'Wk 3',
    title: 'AD & Internals',
    detail: 'BloodHound, Kerberoasting, lateral movement'
  }, {
    week: 'Wk 4',
    title: 'Cloud Pen Test',
    detail: 'AWS/GCP misconfig, IAM abuse'
  }, {
    week: 'Wk 5',
    title: 'Reporting',
    detail: 'Writing findings the dev team will fix'
  }, {
    week: 'Wk 6',
    title: 'Live CTF',
    detail: 'Capstone — real targets, real time'
  }];
  const board = [{
    rank: 1,
    handle: 'r00t_eve',
    score: 4280,
    college: 'IIT Hyd'
  }, {
    rank: 2,
    handle: 'nullbyte',
    score: 4100,
    college: 'BITS Goa'
  }, {
    rank: 3,
    handle: 'shellz',
    score: 3960,
    college: 'IIIT-B'
  }, {
    rank: 4,
    handle: 'pwn_kid',
    score: 3780,
    college: 'NIT Trichy'
  }, {
    rank: 5,
    handle: 'sudo_em',
    score: 3640,
    college: 'VIT'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "container ed-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-hero"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      color: v.color,
      borderColor: `rgba(${v.rgb}, 0.4)`,
      background: `rgba(${v.rgb}, 0.08)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "BUILT FOR BREAK IN"), /*#__PURE__*/React.createElement("h2", {
    ref: contentHeadingRef,
    tabIndex: "-1",
    className: "vc-headline",
    style: {
      outline: 'none'
    }
  }, "Train the next generation", /*#__PURE__*/React.createElement("br", null), "of ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "breakers.")), /*#__PURE__*/React.createElement("p", {
    className: "lead vc-desc"
  }, "College workshops, CTFs, and bootcamps run by practitioners \u2014 not slide-deck consultants. We teach how attacks actually work, then how to build systems that survive them."), /*#__PURE__*/React.createElement("div", {
    className: "ed-stats"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-stat-num"
  }, "2.4K", /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "ed-stat-label mono"
  }, "STUDENTS TRAINED")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-stat-num"
  }, "30", /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "ed-stat-label mono"
  }, "CTFS HOSTED")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-stat-num"
  }, "12"), /*#__PURE__*/React.createElement("div", {
    className: "ed-stat-label mono"
  }, "COLLEGE PARTNERS")))), /*#__PURE__*/React.createElement("div", {
    className: "ed-shape"
  }, /*#__PURE__*/React.createElement(RotatingShape, {
    shape: "cube",
    accent: v.color
  }), /*#__PURE__*/React.createElement("div", {
    className: "ed-shape-tag mono"
  }, "800 CONCURRENT"))), /*#__PURE__*/React.createElement("div", {
    className: "ed-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-cohort glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-cohort-head"
  }, /*#__PURE__*/React.createElement("h3", null, "The 6-Week Bootcamp"), /*#__PURE__*/React.createElement("span", {
    className: "mono ed-cohort-meta"
  }, "cohort_07 \xB7 32 students \xB7 live")), /*#__PURE__*/React.createElement("div", {
    className: "ed-timeline"
  }, cohort.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "ed-week",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-week-bullet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ed-week-tag mono"
  }, c.week), /*#__PURE__*/React.createElement("div", {
    className: "ed-week-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-week-title"
  }, c.title), /*#__PURE__*/React.createElement("div", {
    className: "ed-week-detail"
  }, c.detail)))))), /*#__PURE__*/React.createElement("div", {
    className: "ed-board glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-board-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Live CTF Leaderboard"), /*#__PURE__*/React.createElement("span", {
    className: "mono ed-board-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ed-pulse"
  }), "autumn_invitational \xB7 47:22 left")), /*#__PURE__*/React.createElement("div", {
    className: "ed-board-list"
  }, board.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.rank,
    className: `ed-board-row ${p.rank === 1 ? 'leader' : ''}`,
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-rank mono"
  }, "#", p.rank), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-handle"
  }, p.handle), /*#__PURE__*/React.createElement("div", {
    className: "ed-college mono"
  }, p.college)), /*#__PURE__*/React.createElement("div", {
    className: "ed-score",
    style: {
      color: p.rank === 1 ? v.color : undefined
    }
  }, p.score.toLocaleString())))), /*#__PURE__*/React.createElement("div", {
    className: "ed-board-foot mono"
  }, "view full board \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "ed-services"
  }, VERTICAL_DATA.education.services.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    className: "ed-svc",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-svc-num mono"
  }, "/0", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "ed-svc-name"
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "ed-svc-desc"
  }, s.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "ed-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onNav('quote', {
      vertical: 'education'
    })
  }, "Host us at your campus \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => onNav('contact')
  }, "Apply to a cohort \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "ed-partners"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vc-skills-label"
  }, "COLLEGE PARTNERS"), /*#__PURE__*/React.createElement("div", {
    className: "ed-part-row"
  }, ['IIT Hyderabad', 'BITS Goa', 'IIIT-B', 'NIT Trichy', 'VIT Vellore', 'PES University', 'Manipal', 'SRM Chennai'].map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    className: "ed-part-chip"
  }, c))), /*#__PURE__*/React.createElement("blockquote", {
    className: "ed-part-q"
  }, "\"Their CTF infra ran flawlessly for 800 of our students. The mentorship after was even better.\"", /*#__PURE__*/React.createElement("cite", {
    className: "mono"
  }, "\u2014 Prof. Anand \xB7 IIT Hyderabad"))), /*#__PURE__*/React.createElement("div", {
    className: "ed-cohort-cta glass",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-cohort-tag mono",
    style: {
      color: v.color
    }
  }, "NEXT COHORT \xB7 12 SEATS LEFT"), /*#__PURE__*/React.createElement("div", {
    className: "ed-cohort-when"
  }, "Cohort 08 \xB7 starts June 17, 2026 \xB7 6 weeks \xB7 live online")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => onNav('contact')
  }, "Apply now \u2192")));
};

// ─── Cuboid Navigator ─────────────────────────────
const CuboidNavigator = ({
  active,
  onChange,
  style
}) => {
  const tabsRef = useRef(null);
  const keys = Object.keys(VERTICAL_DATA);
  const handleKey = (e, key) => {
    const idx = keys.indexOf(key);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = keys[(idx + 1) % keys.length];
      onChange(next);
      tabsRef.current?.querySelector(`[data-key="${next}"]`)?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = keys[(idx - 1 + keys.length) % keys.length];
      onChange(prev);
      tabsRef.current?.querySelector(`[data-key="${prev}"]`)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(keys[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(keys[keys.length - 1]);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `cuboid-navigator cuboid-style-${style}`,
    role: "tablist",
    "aria-label": "Service verticals",
    ref: tabsRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "cuboid-platform",
    "aria-hidden": true
  }), /*#__PURE__*/React.createElement("div", {
    className: "cuboid"
  }, keys.map(key => {
    const v = VERTICAL_DATA[key];
    const isActive = key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      "data-key": key,
      role: "tab",
      id: `tab-${key}`,
      "aria-selected": isActive,
      "aria-controls": `panel-${key}`,
      tabIndex: isActive ? 0 : -1,
      className: `cuboid-face ${isActive ? 'active' : ''}`,
      onClick: () => onChange(key),
      onKeyDown: e => handleKey(e, key),
      style: {
        '--face-accent': v.color,
        '--face-rgb': v.rgb
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "cuboid-face-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cuboid-face-icon"
    }, /*#__PURE__*/React.createElement(VerticalIcon, {
      vertical: key,
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      className: "cuboid-face-label"
    }, v.name)), isActive && /*#__PURE__*/React.createElement("div", {
      className: "cuboid-face-glow",
      "aria-hidden": true
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "cuboid-hint mono",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("span", {
    className: "cuboid-hint-key"
  }, "\u2190"), /*#__PURE__*/React.createElement("span", {
    className: "cuboid-hint-key"
  }, "\u2192"), " switch vertical"));
};
const SKILL_CHIPS = {
  security: ['Burp Suite Pro', 'Nuclei', 'Metasploit', 'BloodHound', 'OSCP-aligned', 'MITRE ATT&CK', 'Active Directory', 'Cloud Pen Test', 'Web App / API', 'Mobile (iOS/Android)', 'Source Code Review', 'CVE Research'],
  software: ['React / Next.js', 'TypeScript', 'Go', 'Rust', 'Node.js', 'PostgreSQL', 'Kubernetes', 'AWS / GCP', 'Threat Modeling', 'OWASP ASVS', 'CI/CD Hardening', 'Zero Trust'],
  education: ['Custom Curriculum', 'CTF Infrastructure', 'OSCP Prep', 'CEH Prep', 'CompTIA Sec+', 'Hands-on Labs', 'Phishing Sims', 'College Workshops', 'Bootcamp Cohorts', 'Mentorship']
};
Object.assign(window, {
  ServicesPage,
  SKILL_CHIPS
});