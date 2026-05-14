// about.jsx — About page + team profile

const AboutPage = ({
  onNav
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "page about-page"
  }, /*#__PURE__*/React.createElement("section", {
    className: "about-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "ABOUT"), /*#__PURE__*/React.createElement("h1", {
    className: "about-h1"
  }, "Built by people who", /*#__PURE__*/React.createElement("br", null), "broke things first.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead about-lead"
  }, "Destro Sec was founded in 2023 in Bangalore by four practitioners who'd spent years on offensive security teams, infrastructure, and education \u2014 and were tired of those three worlds being run by separate vendors who didn't talk to each other.")))), /*#__PURE__*/React.createElement("section", {
    className: "origin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "origin-grid"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "origin-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "ORIGIN"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2"
  }, "A vendor we wished existed."), /*#__PURE__*/React.createElement("p", null, "The four of us kept ending up on the same engagements from different angles. One running the red team. One reviewing the auth code. One training the junior analysts. One running the war room."), /*#__PURE__*/React.createElement("p", null, "Every time, the handoffs leaked. The red team report sat in a Slack channel. The dev team rebuilt the bug a quarter later. The analysts learned mitigations from a vendor that didn't know the codebase."), /*#__PURE__*/React.createElement("p", null, "Destro Sec is the vendor we wished existed: one team, three disciplines, a single thread running through every engagement."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "origin-quote glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quote-mark mono"
  }, "\""), /*#__PURE__*/React.createElement("blockquote", null, "Security is best taught by people who've broken things on purpose. Software is best built by people who know how it'll be attacked. Education is best run by both."), /*#__PURE__*/React.createElement("cite", {
    className: "mono"
  }, "\u2014 Founding principle, May 2023")))))), /*#__PURE__*/React.createElement("section", {
    className: "mvv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "MISSION \xB7 VISION \xB7 VALUES"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2"
  }, "What we work toward.")), /*#__PURE__*/React.createElement("div", {
    className: "mvv-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "mvv-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mvv-tag mono"
  }, "MISSION"), /*#__PURE__*/React.createElement("h3", null, "Make excellent security work accessible to teams of every size."), /*#__PURE__*/React.createElement("p", null, "From a 12-person startup to a 12,000-person bank. The discipline is the same; only the scope changes."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "mvv-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mvv-tag mono"
  }, "VISION"), /*#__PURE__*/React.createElement("h3", null, "An industry where defenders learn from the people who broke in."), /*#__PURE__*/React.createElement("p", null, "We're building the practitioner-to-student pipeline our own careers needed and never had."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    className: "mvv-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mvv-tag mono"
  }, "VALUES"), /*#__PURE__*/React.createElement("div", {
    className: "mvv-chips"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip-soft"
  }, "Show, don't slide"), /*#__PURE__*/React.createElement("span", {
    className: "chip-soft"
  }, "Builders first"), /*#__PURE__*/React.createElement("span", {
    className: "chip-soft"
  }, "Plain language"), /*#__PURE__*/React.createElement("span", {
    className: "chip-soft"
  }, "No theatre"), /*#__PURE__*/React.createElement("span", {
    className: "chip-soft"
  }, "Teach what you know"))))))), /*#__PURE__*/React.createElement("section", {
    className: "bearers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "OFFICE BEARERS"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2"
  }, "The four people in charge."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Each owns a vertical and runs it end-to-end. No matrix, no handoffs, no \u201Caccount managers\u201D in between.")), /*#__PURE__*/React.createElement("div", {
    className: "bearers-grid"
  }, TEAM.map((m, i) => {
    const v = VERTICAL_DATA[m.vertical];
    return /*#__PURE__*/React.createElement(Reveal, {
      key: m.id,
      delay: i * 80
    }, /*#__PURE__*/React.createElement("button", {
      className: "bearer-card",
      onClick: () => onNav('team', {
        id: m.id
      }),
      style: {
        '--accent': v.color,
        '--accent-rgb': v.rgb
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "bearer-photo"
    }, /*#__PURE__*/React.createElement(ProfilePlaceholder, {
      name: m.name,
      accent: v.color
    }), /*#__PURE__*/React.createElement("div", {
      className: "bearer-photo-ring"
    })), /*#__PURE__*/React.createElement("div", {
      className: "bearer-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bearer-tag-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip",
      style: {
        color: v.color,
        borderColor: `rgba(${v.rgb}, 0.4)`,
        background: `rgba(${v.rgb}, 0.08)`
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), v.name)), /*#__PURE__*/React.createElement("h3", {
      className: "bearer-name"
    }, m.name), /*#__PURE__*/React.createElement("div", {
      className: "bearer-role"
    }, m.role), /*#__PURE__*/React.createElement("p", {
      className: "bearer-bio"
    }, m.bioShort), /*#__PURE__*/React.createElement("div", {
      className: "bearer-cta mono"
    }, "View profile", /*#__PURE__*/React.createElement("svg", {
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
    }))))));
  })))), /*#__PURE__*/React.createElement("section", {
    className: "milestones"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "MILESTONES"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2"
  }, "Three years, one thread.")), /*#__PURE__*/React.createElement("div", {
    className: "ms-rail"
  }, [{
    y: '2023',
    t: 'Founded in Bangalore',
    d: 'Four practitioners, one shared frustration. Office One opens.'
  }, {
    y: '2023',
    t: 'First enterprise red team',
    d: 'Sequoia FinTech engagement closes — three criticals their previous vendor missed.'
  }, {
    y: '2024',
    t: 'Education arm launches',
    d: 'IIT Hyderabad CTF for 800 students. Cohort 01 runs in autumn.'
  }, {
    y: '2024',
    t: 'Software practice begins',
    d: 'Nordic Health Co. ships their patient portal. Zero criticals at audit.'
  }, {
    y: '2025',
    t: '12 college partnerships',
    d: 'Bootcamp grads land at Microsoft, Razorpay, CRED, and three Big-4 SOCs.'
  }, {
    y: '2026',
    t: 'Cohort 08 · today',
    d: 'Now operating across India, Singapore, and the Nordics.'
  }].map((m, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 50
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-y mono"
  }, m.y), /*#__PURE__*/React.createElement("div", {
    className: "ms-bullet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ms-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-t"
  }, m.t), /*#__PURE__*/React.createElement("div", {
    className: "ms-d"
  }, m.d)))))))), /*#__PURE__*/React.createElement("section", {
    className: "join"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "join-card glass"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "join-headline"
  }, "We're hiring builders who break things."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Senior pen testers, security-minded engineers, and curriculum designers. Remote-first across India.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onNav('contact')
  }, "See open roles"))))));
};

// Pretty placeholder for profile photos (initials on accent gradient)
const ProfilePlaceholder = ({
  name,
  accent,
  size = '100%'
}) => {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-placeholder",
    style: {
      width: size,
      height: size,
      background: `linear-gradient(135deg, ${accent}30, var(--color-bg-elevated))`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pp-initials",
    style: {
      color: accent
    }
  }, initials));
};

// ─── Team Profile Page ─────────────────────────
const TeamProfilePage = ({
  onNav,
  memberId
}) => {
  const m = TEAM.find(t => t.id === memberId) || TEAM[0];
  const v = VERTICAL_DATA[m.vertical];
  const others = TEAM.filter(t => t.id !== m.id).slice(0, 3);
  return /*#__PURE__*/React.createElement("div", {
    className: "page profile-page",
    style: {
      '--accent': v.color,
      '--accent-rgb': v.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-glow",
    style: {
      background: `radial-gradient(circle, rgba(${v.rgb}, 0.12) 0%, transparent 60%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "back-link",
    onClick: () => onNav('about')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 7H3M7 3L3 7l4 4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), "Back to team"), /*#__PURE__*/React.createElement("div", {
    className: "profile-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-photo"
  }, /*#__PURE__*/React.createElement(ProfilePlaceholder, {
    name: m.name,
    accent: v.color
  }), /*#__PURE__*/React.createElement("div", {
    className: "profile-photo-ring"
  })), /*#__PURE__*/React.createElement("div", {
    className: "profile-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      color: v.color,
      borderColor: `rgba(${v.rgb}, 0.4)`,
      background: `rgba(${v.rgb}, 0.08)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), v.name, " \xB7 ", m.boardRole), /*#__PURE__*/React.createElement("h1", {
    className: "profile-name"
  }, m.name), /*#__PURE__*/React.createElement("div", {
    className: "profile-role"
  }, m.role), /*#__PURE__*/React.createElement("div", {
    className: "profile-socials"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    "aria-label": "LinkedIn"
  }, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    "aria-label": "GitHub"
  }, "GitHub"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    "aria-label": "Email"
  }, m.id.split('-').join('.'), "@destrosec.com")))), /*#__PURE__*/React.createElement("div", {
    className: "profile-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-bio"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "profile-section-title mono"
  }, "ABOUT"), m.bioLong.split('\n\n').map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, p)), /*#__PURE__*/React.createElement("h3", {
    className: "profile-section-title mono",
    style: {
      marginTop: 48
    }
  }, "ACHIEVEMENTS"), /*#__PURE__*/React.createElement("ul", {
    className: "achievements"
  }, m.achievements.map((a, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ach-bullet",
    style: {
      background: v.color
    }
  }), a))), /*#__PURE__*/React.createElement("div", {
    className: "profile-quote glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quote-mark mono",
    style: {
      color: v.color
    }
  }, "\""), /*#__PURE__*/React.createElement("blockquote", null, m.quote))), /*#__PURE__*/React.createElement("aside", {
    className: "profile-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-side-card glass"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mono"
  }, "SKILLS"), /*#__PURE__*/React.createElement("div", {
    className: "skill-chips"
  }, m.skills.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "chip-soft"
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "profile-side-card glass"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mono"
  }, "CERTIFICATIONS"), /*#__PURE__*/React.createElement("div", {
    className: "cert-list"
  }, m.certs.map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    className: "cert-badge",
    style: {
      borderColor: `rgba(${v.rgb}, 0.4)`,
      color: v.color
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "profile-side-card glass"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mono"
  }, "JOINED"), /*#__PURE__*/React.createElement("div", {
    className: "profile-joined"
  }, m.joinedYear)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => onNav('quote', {
      vertical: m.vertical
    }),
    style: {
      width: '100%'
    }
  }, "Work with ", m.name.split(' ')[0]))), /*#__PURE__*/React.createElement("section", {
    className: "profile-others"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "profile-section-title mono"
  }, "OTHERS YOU MIGHT WORK WITH"), /*#__PURE__*/React.createElement("div", {
    className: "others-grid"
  }, others.map(o => {
    const ov = VERTICAL_DATA[o.vertical];
    return /*#__PURE__*/React.createElement("button", {
      key: o.id,
      className: "other-card",
      onClick: () => onNav('team', {
        id: o.id
      }),
      style: {
        '--accent': ov.color,
        '--accent-rgb': ov.rgb
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "other-photo"
    }, /*#__PURE__*/React.createElement(ProfilePlaceholder, {
      name: o.name,
      accent: ov.color
    })), /*#__PURE__*/React.createElement("div", {
      className: "other-name"
    }, o.name), /*#__PURE__*/React.createElement("div", {
      className: "other-role"
    }, o.role));
  })))));
};
window.AboutPage = AboutPage;
window.TeamProfilePage = TeamProfilePage;
window.ProfilePlaceholder = ProfilePlaceholder;