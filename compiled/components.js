// components.jsx — Shared components for Destro Sec V2.0

const {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} = React;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Logo ─────────────────────────────────────────
// width/height set to original asset dimensions (733×163) so browser
// can reserve the correct aspect-ratio space before the image loads (prevents CLS).
const Logo = ({
  size = 28
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement("img", {
  src: "/assets/logo.png",
  alt: "Destro Sec",
  width: 733,
  height: 163,
  style: {
    height: size + 6,
    width: 'auto',
    display: 'block'
  }
}));

// ─── Navigation ────────────────────────────────────
const Nav = ({
  current,
  onNav
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const burgerRef = useRef(null);
  const drawerRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Focus trap + Escape key for mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = drawerRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (first) first.focus();
    const onKeyDown = e => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);
  const closeDrawer = () => {
    setMobileOpen(false);
    burgerRef.current?.focus();
  };
  const links = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'services',
    label: 'Services'
  }, {
    id: 'about',
    label: 'About'
  }, {
    id: 'blog',
    label: 'Blog'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: "#main-content",
    className: "skip-link"
  }, "Skip to main content"), /*#__PURE__*/React.createElement("nav", {
    className: `nav ${scrolled ? 'scrolled' : ''}`,
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner container"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('home'),
    className: "nav-logo",
    "aria-label": "Destro Sec home"
  }, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => onNav(l.id),
    className: `nav-link ${current === l.id ? 'active' : ''}`,
    "aria-current": current === l.id ? 'page' : undefined
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onNav('quote')
  }, "Get a Quote")), /*#__PURE__*/React.createElement("button", {
    ref: burgerRef,
    className: "nav-burger",
    onClick: () => setMobileOpen(true),
    "aria-label": "Open menu",
    "aria-expanded": mobileOpen,
    "aria-controls": "mobile-drawer"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h14M3 10h14M3 14h14",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))))), mobileOpen && /*#__PURE__*/React.createElement("div", {
    className: "mobile-drawer",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Site navigation",
    id: "mobile-drawer",
    onClick: closeDrawer
  }, /*#__PURE__*/React.createElement("div", {
    ref: drawerRef,
    className: "mobile-drawer-panel glass",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "mobile-close",
    onClick: closeDrawer,
    "aria-label": "Close menu"
  }, "\xD7"), links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => {
      onNav(l.id);
      closeDrawer();
    },
    className: "mobile-link",
    "aria-current": current === l.id ? 'page' : undefined
  }, l.label)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginTop: 16
    },
    onClick: () => {
      onNav('quote');
      closeDrawer();
    }
  }, "Get a Quote"))));
};

// ─── Footer ────────────────────────────────────────
const Footer = ({
  onNav
}) => /*#__PURE__*/React.createElement("footer", {
  className: "footer"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "footer-grid"
}, /*#__PURE__*/React.createElement("div", {
  className: "footer-brand"
}, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("p", {
  style: {
    marginTop: 16,
    color: 'var(--color-text-secondary)',
    fontSize: 14,
    maxWidth: 320
  }
}, "Built by breakers. Trusted by builders. Security consulting, software, and education from a community that thinks like attackers."), /*#__PURE__*/React.createElement("div", {
  className: "footer-mono"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--color-brand)'
  }
}, "$"), " ./destrosec --since 2023")), /*#__PURE__*/React.createElement("div", {
  className: "footer-col"
}, /*#__PURE__*/React.createElement("h5", null, "Pages"), /*#__PURE__*/React.createElement("button", {
  onClick: () => onNav('home')
}, "Home"), /*#__PURE__*/React.createElement("button", {
  onClick: () => onNav('services')
}, "Services"), /*#__PURE__*/React.createElement("button", {
  onClick: () => onNav('about')
}, "About"), /*#__PURE__*/React.createElement("button", {
  onClick: () => onNav('contact')
}, "Contact"), /*#__PURE__*/React.createElement("button", {
  onClick: () => onNav('quote')
}, "Get a Quote")), /*#__PURE__*/React.createElement("div", {
  className: "footer-col"
}, /*#__PURE__*/React.createElement("h5", null, "Verticals"), /*#__PURE__*/React.createElement("button", {
  onClick: () => onNav('services', {
    vertical: 'security'
  })
}, "Security"), /*#__PURE__*/React.createElement("button", {
  onClick: () => onNav('services', {
    vertical: 'software'
  })
}, "Software"), /*#__PURE__*/React.createElement("button", {
  onClick: () => onNav('services', {
    vertical: 'education'
  })
}, "Education")), /*#__PURE__*/React.createElement("div", {
  className: "footer-col"
}, /*#__PURE__*/React.createElement("h5", null, "Connect"), /*#__PURE__*/React.createElement("a", {
  href: "mailto:info@destrosec.com"
}, "info@destrosec.com"), /*#__PURE__*/React.createElement("a", {
  href: "https://linkedin.com/company/destro-sec",
  target: "_blank",
  rel: "noopener noreferrer"
}, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
  href: "https://instagram.com/destro_sec",
  target: "_blank",
  rel: "noopener noreferrer"
}, "Instagram"), /*#__PURE__*/React.createElement("a", {
  href: "https://github.com/destrosec",
  target: "_blank",
  rel: "noopener noreferrer"
}, "GitHub"))), /*#__PURE__*/React.createElement("div", {
  className: "footer-bottom"
}, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Destro Sec. All rights reserved."), /*#__PURE__*/React.createElement("span", {
  className: "mono",
  style: {
    color: 'var(--color-text-muted)',
    fontSize: 12
  }
}, "v2.0 \u2014 built for break in"))));

// ─── Reveal hook ──────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.hasAttribute('data-no-scroll-anim') || prefersReducedMotion()) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ─── Reveal wrapper ────────────────────────────────
const Reveal = ({
  children,
  delay = 0,
  as: Tag = 'div',
  ...props
}) => {
  const ref = useReveal();
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: `reveal ${props.className || ''}`,
    style: {
      ...props.style,
      transitionDelay: `${delay}ms`
    }
  }, children);
};

// ─── Vertical icons ────────────────────────────────
const VerticalIcon = ({
  vertical,
  size = 24
}) => {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  if (vertical === 'security') return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
    d: "M12 2 L4 5 V11 C4 16 7.5 20 12 22 C16.5 20 20 16 20 11 V5 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "11",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 13 V16"
  }));
  if (vertical === 'software') return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
    d: "M8 6 L3 12 L8 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 6 L21 12 L16 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 4 L10 20"
  }));
  if (vertical === 'education') return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
    d: "M2 9 L12 4 L22 9 L12 14 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 11 V16 C6 17 8.5 19 12 19 C15.5 19 18 17 18 16 V11"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 9 V14"
  }));
  return null;
};

// ─── Wireframe Cube (decorative) ─────────────────────────────────────────────
// Pauses RAF when off-screen and respects prefers-reduced-motion.
const WireframeCube = ({
  size = 600,
  intensity = 1
}) => {
  const [t, setT] = useState(0);
  const sceneRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    if (document.documentElement.hasAttribute('data-no-scroll-anim') || prefersReducedMotion()) return;
    let raf;
    const start = performance.now();
    const tick = now => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);
  const rotY = t * 8 % 360;
  const rotX = 25 + Math.sin(t * 0.3) * 5;
  const op = 0.18 * intensity;
  return /*#__PURE__*/React.createElement("div", {
    ref: sceneRef,
    className: "wireframe-cube-scene",
    style: {
      width: size,
      height: size
    },
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "wireframe-cube",
    style: {
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`
    }
  }, ['front', 'back', 'right', 'left', 'top', 'bottom'].map(face => /*#__PURE__*/React.createElement("div", {
    key: face,
    className: `wf-face wf-${face}`,
    style: {
      borderColor: `rgba(255,107,53,${op})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wf-grid",
    style: {
      opacity: op * 1.6
    }
  })))));
};

// ─── Stat ──────────────────────────────────────────
const Stat = ({
  value,
  label,
  accent
}) => /*#__PURE__*/React.createElement("div", {
  className: "stat"
}, /*#__PURE__*/React.createElement("div", {
  className: "stat-value",
  style: accent ? {
    color: `var(--color-${accent})`
  } : null
}, value), /*#__PURE__*/React.createElement("div", {
  className: "stat-label"
}, label));

// ─── Service data ──────────────────────────────────
const VERTICAL_DATA = {
  security: {
    name: 'Security',
    color: '#e63946',
    rgb: '230, 57, 70',
    eyebrow: 'BUILT FOR BREAK IN',
    headline: 'We break in so you can build better.',
    description: 'Adversarial security testing from operators who think like attackers. Pen tests, red team engagements, and incident response that map to the way real intrusions actually happen.',
    services: [{
      name: 'Penetration Testing',
      desc: 'External, internal, and web app assessments scoped to your threat model.'
    }, {
      name: 'Red Team Engagements',
      desc: 'Multi-week adversarial simulations with full kill-chain reporting.'
    }, {
      name: 'Vulnerability Assessment',
      desc: 'Continuous scanning, triage, and prioritization across your infra.'
    }, {
      name: 'Incident Response',
      desc: 'On-call IR retainer + post-breach forensics and remediation roadmap.'
    }, {
      name: 'Security Training',
      desc: 'Hands-on labs for blue and red team workflows — built for your stack.'
    }],
    proof: {
      metric: '120+',
      label: 'engagements delivered',
      client: 'Sequoia FinTech',
      quote: 'They found three critical paths our previous vendor missed in two years.'
    }
  },
  software: {
    name: 'Software',
    color: '#3a86ff',
    rgb: '58, 134, 255',
    eyebrow: 'SECURE BY DEFAULT',
    headline: 'Software shipped with attackers in mind.',
    description: 'Custom development from a team that has spent years exploiting other people\'s code. Every line we write assumes it will be attacked — because we know exactly how.',
    services: [{
      name: 'Custom Software Development',
      desc: 'Greenfield builds with security baked into architecture, not bolted on.'
    }, {
      name: 'Web & Mobile Applications',
      desc: 'Production-grade apps with hardened auth, sane defaults, audit trails.'
    }, {
      name: 'API Development & Integration',
      desc: 'Authenticated, rate-limited, observable APIs your partners can trust.'
    }, {
      name: 'Code Review & Secure SDLC',
      desc: 'Threat-model-driven reviews and CI/CD pipelines that catch regressions.'
    }, {
      name: 'DevSecOps Implementation',
      desc: 'Shift left without slowing delivery — practical guardrails, not theatre.'
    }],
    proof: {
      metric: '40+',
      label: 'production systems shipped',
      client: 'Nordic Health Co.',
      quote: 'They rewrote our auth layer in six weeks. Audit passed first try.'
    }
  },
  education: {
    name: 'Education',
    color: '#ffbe0b',
    rgb: '255, 190, 11',
    eyebrow: 'BUILT FOR BREAK IN',
    headline: 'Train the next generation of breakers.',
    description: 'College workshops, CTFs, and bootcamps run by practitioners — not slide-deck consultants. We teach how attacks actually work, then how to build systems that survive them.',
    services: [{
      name: 'College & Institution Workshops',
      desc: 'Multi-day technical workshops mapped to your curriculum and lab capacity.'
    }, {
      name: 'Certification Prep Programs',
      desc: 'OSCP, CEH, CompTIA Security+ structured prep with hands-on labs.'
    }, {
      name: 'CTF Hosting',
      desc: 'End-to-end CTF design and infra for institutions and corporate events.'
    }, {
      name: 'Community Bootcamps',
      desc: 'Six-week intensive cohorts for students breaking into security careers.'
    }, {
      name: 'Corporate Security Awareness',
      desc: 'Phishing simulations + role-specific training that actually changes behavior.'
    }],
    proof: {
      metric: '2,400+',
      label: 'students trained',
      client: 'IIT Hyderabad',
      quote: 'The CTF infrastructure they built handled 800 concurrent students without a hiccup.'
    }
  }
};

// ─── Office bearers data ──────────────────────────
const TEAM = [{
  id: 'aarav-mehta',
  name: 'Aarav Mehta',
  role: 'Founder & CEO',
  vertical: 'security',
  bioShort: 'Ex-red-team lead turned founder. Believes the best defenders started as attackers.',
  bioLong: 'Aarav spent six years on offensive security teams at two of India\'s largest financial institutions before founding Destro Sec in 2023. He\'s led red team engagements against Fortune 500 companies and trained over 800 students through community CTFs. His philosophy: you can\'t defend what you don\'t understand how to break.\n\nAt Destro Sec he sets the technical direction and personally leads the most adversarial engagements. Outside work he runs a small monthly meetup for early-career security folks in Bangalore.',
  skills: ['Red Teaming', 'Penetration Testing', 'Python', 'Active Directory', 'Cloud Security'],
  certs: ['OSCP', 'OSEP', 'CRTO'],
  achievements: ['Led 50+ red team engagements', 'Speaker at Nullcon 2024', 'Founder of Bangalore Sec Meetup'],
  quote: 'The best defense is built by people who\'ve broken things on purpose.',
  boardRole: 'CEO & Founder',
  joinedYear: 2023
}, {
  id: 'priya-iyer',
  name: 'Priya Iyer',
  role: 'CTO & Co-founder',
  vertical: 'software',
  bioShort: 'Staff engineer with a security mindset. Builds systems that assume the worst.',
  bioLong: 'Priya brings ten years of staff-level engineering experience from infrastructure-heavy startups. She co-founded Destro Sec to bridge the gap between teams that ship fast and teams that ship secure — a gap she watched destroy three companies before deciding to fix it herself.\n\nShe owns the Software vertical and the secure-SDLC practice. Most of her work is unglamorous: reviewing auth flows, hardening CI/CD, writing the playbooks teams reach for at 2am.',
  skills: ['Distributed Systems', 'Go', 'Rust', 'Kubernetes', 'Threat Modeling'],
  certs: ['CKS', 'CISSP'],
  achievements: ['Led infra at three Series-B startups', 'Co-author, Secure SDLC Playbook', 'OSS maintainer'],
  quote: 'Ship fast. Ship safe. The two are not in tension if you build the right scaffolding.',
  boardRole: 'CTO & Co-founder',
  joinedYear: 2023
}, {
  id: 'rohan-das',
  name: 'Rohan Das',
  role: 'Head of Education',
  vertical: 'education',
  bioShort: 'Educator-practitioner running the community programs and college partnerships.',
  bioLong: 'Rohan came to Destro Sec from academia, where he taught applied security at a tier-1 engineering college for four years. He runs the Education vertical end-to-end: curriculum design, college partnerships, CTF infrastructure, and the bootcamp program.\n\nHis north star is simple — every student leaves a Destro Sec workshop able to do something useful, not just nod along to slides.',
  skills: ['Curriculum Design', 'CTF Design', 'Web Exploitation', 'Public Speaking'],
  certs: ['OSCP', 'eWPTX'],
  achievements: ['Designed curriculum for 12 colleges', 'Hosted 30+ CTFs', 'Trained 2,400+ students'],
  quote: 'You learn security the same way you learn music: by playing badly until you don\'t.',
  boardRole: 'Head of Education',
  joinedYear: 2023
}, {
  id: 'sana-kapoor',
  name: 'Sana Kapoor',
  role: 'Head of Operations',
  vertical: 'security',
  bioShort: 'Keeps the engagements on track and the clients informed. Runs a tight ship.',
  bioLong: 'Sana joined as the fourth office bearer in early 2024, bringing program management discipline from a previous life at a Big Four consulting firm. She owns delivery — every engagement, every workshop, every retainer. If you\'ve ever received a status update from Destro Sec, Sana wrote it.\n\nShe also leads the client relationship side: scoping, kickoffs, post-engagement debriefs, and the long-term advisory work that keeps clients coming back.',
  skills: ['Program Management', 'Client Strategy', 'Risk Reporting', 'GRC'],
  certs: ['PMP', 'CISA'],
  achievements: ['Managed 80+ client engagements', 'Built the delivery playbook', 'Zero missed deadlines in 2025'],
  quote: 'Excellent security work means nothing if the client can\'t understand what you delivered.',
  boardRole: 'Head of Operations',
  joinedYear: 2024
}];

// Export to window
Object.assign(window, {
  Logo,
  Nav,
  Footer,
  Reveal,
  useReveal,
  VerticalIcon,
  WireframeCube,
  Stat,
  VERTICAL_DATA,
  TEAM,
  prefersReducedMotion
});