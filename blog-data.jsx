// blog-data.jsx — posts, authors, helpers

const BLOG_AUTHORS = [
  // The 4 office bearers reused (slugs match TEAM)
  { id: 'aarav-mehta',  type: 'core',  name: 'Aarav Mehta',  vertical: 'security',  role: 'Founder & CEO',
    bio: "Ex-red-team lead. Believes the best defenders started as attackers. Writes mostly about adversary emulation and the gap between what auditors check and what attackers actually do.",
    pronouns: 'he/him', location: 'Bangalore, IN', joined: '2023', site: 'aarav.sh',
    topics: { security: 70, software: 10, education: 15, opinion: 5 },
    talks: [
      { event: 'Nullcon Goa', year: 2024, title: 'How we got domain admin in 11 minutes' },
      { event: 'BSides Bangalore', year: 2024, title: 'Adversary emulation, properly scoped' },
      { event: 'OWASP Bangalore', year: 2025, title: 'The pen test report nobody reads' }
    ],
    projects: [
      { name: 'kerb-roast', desc: 'Faster Kerberoasting with smarter wordlist seeding', stars: '1.4k', lang: 'Go' },
      { name: 'redteam-notes', desc: 'Public playbook for scoped red team engagements', stars: '780', lang: 'Markdown' }
    ]
  },
  { id: 'priya-iyer',   type: 'core',  name: 'Priya Iyer',   vertical: 'software', role: 'CTO & Co-founder',
    bio: "Staff engineer with a security mindset. Builds systems that assume the worst. Writes about secure architecture, threat modelling, and the politics of shipping fast.",
    pronouns: 'she/her', location: 'Bangalore, IN', joined: '2023', site: 'priya.dev',
    topics: { security: 25, software: 60, education: 10, opinion: 5 },
    talks: [
      { event: 'GopherCon India', year: 2024, title: 'Auth that doesn\u2019t leak' },
      { event: 'KubeCon EU', year: 2025, title: 'CKS, but for real systems' }
    ],
    projects: [
      { name: 'm-dash', desc: 'Self-hosted internal tooling, n8n + Appsmith stitched right', stars: '4.2k', lang: 'TypeScript' },
      { name: 'verifyjwt-tiny', desc: '1.2KB JWT verifier with timing-safe defaults', stars: '910', lang: 'TypeScript' }
    ]
  },
  { id: 'rohan-kapoor', type: 'core',  name: 'Rohan Kapoor', vertical: 'education', role: 'Head of Education',
    bio: "Runs the cohorts and CTFs. Cares about the next generation of breakers more than anyone in the room. Writes long event recaps and short angry essays.",
    pronouns: 'he/him', location: 'Bangalore, IN', joined: '2023', site: 'rohan.edu',
    topics: { security: 20, software: 5, education: 65, opinion: 10 },
    talks: [
      { event: 'IIT Hyderabad', year: 2025, title: 'Teaching offense before defense' },
      { event: 'BITS Goa', year: 2024, title: 'Why your CTF infra always falls over' }
    ],
    projects: [
      { name: 'ctf-loadgen', desc: 'Load-test your CTF before 800 students log in at once', stars: '620', lang: 'Python' }
    ]
  },
  { id: 'meera-nair',   type: 'core',  name: 'Meera Nair',   vertical: 'security', role: 'Head of Operations',
    bio: "Keeps the engagements honest, the contracts boring, and the fundraising decks tight. Writes about how the business of security actually works.",
    pronouns: 'she/her', location: 'Bangalore, IN', joined: '2023', site: 'meera.co',
    topics: { security: 30, software: 15, education: 25, opinion: 30 },
    talks: [
      { event: 'TiE Bangalore', year: 2025, title: 'Bootstrapping a security firm in India' }
    ],
    projects: []
  },
  // Guest contributors
  { id: 'noor-rashid',  type: 'guest', name: 'Noor Rashid',  vertical: 'security', role: 'Guest \u00b7 Independent researcher',
    bio: "Independent vuln researcher. Reverse engineers things she shouldn\u2019t and writes them up clearly. Cohort 04 alum.",
    pronouns: 'she/her', location: 'Hyderabad, IN', joined: '2024', site: 'noor.cx',
    topics: { security: 95, software: 0, education: 0, opinion: 5 },
    talks: [{ event: 'Nullcon Goa', year: 2025, title: 'React-to-shell: a chain of three nothings' }],
    projects: [{ name: 'react2shell', desc: 'PoC + writeup for CVE-2025-XXXXX', stars: '2.1k', lang: 'JavaScript' }]
  },
  { id: 'devansh-rai',  type: 'guest', name: 'Devansh Rai',  vertical: 'education', role: 'Guest \u00b7 Cohort 06 alum',
    bio: "Cohort 06 grad turned junior pen tester. Documents what it\u2019s like learning offense from zero.",
    pronouns: 'he/him', location: 'Pune, IN', joined: '2025', site: 'devansh.io',
    topics: { security: 40, software: 5, education: 50, opinion: 5 },
    talks: [],
    projects: []
  }
];

// Format → template variant. We deliberately collapsed 6 candidates → 4 template engines:
//   'technical'  → long-form writeup (CVE, exploit, walkthrough). Code blocks, terminal, TOC, footnotes.
//   'launch'     → product/launch/case-study (M-Dash, fundraise updates). Hero with mock UI + metrics.
//   'event'      → photo essay / event recap (Nullcon, CTF). Image-heavy, captions, schedule.
//   'manifesto'  → opinion / call-to-action. Big typographic, minimal, pull-quote heavy.
const BLOG_POSTS = [
  // ── Security shelf ───────────────────────────────
  { id: 'react2shell-cve', title: "React2Shell: chaining three nothings into a remote shell",
    deck: "How a benign-looking SSR helper, an over-permissive deserialiser, and a forgotten admin endpoint added up to RCE on a Fortune 500 portal.",
    format: 'technical', category: 'security', tags: ['CVE','RCE','React','SSR','Writeup'],
    author: 'noor-rashid', coAuthors: ['aarav-mehta'],
    date: '2026-04-22', readMin: 14, hue: 'security', featured: true,
    coverShape: 'terminal',
    pinned: true,
    pull: "If you can poison a prop, you can poison a render. If you can poison a render, you can sometimes poison a runtime.",
    series: null
  },
  { id: 'cve-digest-2026-w17', title: "Weekly CVE digest: week 17, 2026",
    deck: "Eleven CVEs worth your Monday. The Cisco IOS one is the only urgent patch \u2014 here\u2019s why.",
    format: 'listicle', category: 'security', tags: ['CVE','Digest','Weekly'],
    author: 'aarav-mehta', date: '2026-04-27', readMin: 6, hue: 'security',
    coverShape: 'grid', pull: "Eleven CVEs. One emergency. The rest are noise dressed up as news."
  },
  { id: 'red-team-fintech', title: "Anonymised: how we got domain admin at a Series C fintech",
    deck: "Four-week red team engagement. Initial access through a vendor laptop. Eleven minutes from foothold to DA.",
    format: 'launch', category: 'security', tags: ['Red Team','Case Study','Fintech'],
    author: 'aarav-mehta', date: '2026-03-14', readMin: 11, hue: 'security',
    coverShape: 'lock', pull: "The vendor laptop wasn\u2019t in the SOW. It was the entire engagement."
  },
  { id: 'dpdpa-readiness', title: "DPDPA in practice: what your security team actually needs to do",
    deck: "Stripping the regulation back to the technical controls and the documentation that proves them.",
    format: 'technical', category: 'security', tags: ['DPDPA','Compliance','India'],
    author: 'meera-nair', date: '2026-02-08', readMin: 9, hue: 'security',
    coverShape: 'shield', pull: "Compliance is just security with a paper trail. Both should be the same project."
  },

  // ── Software shelf ───────────────────────────────
  { id: 'm-dash-launch', title: "Introducing M-Dash: n8n + Appsmith, stitched right",
    deck: "We got tired of internal tools that lock you in. M-Dash is what we built for ourselves \u2014 and now we're shipping it.",
    format: 'launch', category: 'software', tags: ['Product','Launch','Open Source'],
    author: 'priya-iyer', coAuthors: ['rohan-kapoor'],
    date: '2026-04-30', readMin: 8, hue: 'software', featured: true,
    coverShape: 'editor', pull: "Internal tools are the dark matter of every company. We made ours visible.",
    series: null
  },
  { id: 'auth-that-doesnt-leak', title: "Auth that doesn\u2019t leak: a checklist that actually fits on one screen",
    deck: "Twelve things every login flow should do, ranked by how often we see them missing on engagements.",
    format: 'listicle', category: 'software', tags: ['Auth','Tutorial','Checklist'],
    author: 'priya-iyer', date: '2026-04-02', readMin: 7, hue: 'software',
    coverShape: 'editor', pull: "Half of all auth bugs are the same three patterns. The other half wear different hats."
  },
  { id: 'shipping-fast-without-leaking', title: "Shipping fast without leaking: a tutorial in pre-commit hooks",
    deck: "A 30-minute setup that catches secrets, vulnerable deps, and IaC drift before they hit your remote.",
    format: 'technical', category: 'software', tags: ['Tutorial','DevSecOps','Pre-commit'],
    author: 'priya-iyer', date: '2026-01-27', readMin: 12, hue: 'software',
    coverShape: 'editor', pull: "The cheapest place to fix a leak is on a developer\u2019s laptop, before they hit enter."
  },

  // ── Education shelf ──────────────────────────────
  { id: 'nullcon-2026-recap', title: "Nullcon 2026 \u2014 the recap, with photos",
    deck: "We powered the village this year. Here\u2019s what 800 attendees, 14 talks, and one accidental power outage looked like.",
    format: 'event', category: 'education', tags: ['Event','Conference','Photos'],
    author: 'rohan-kapoor', coAuthors: ['meera-nair'],
    date: '2026-03-30', readMin: 10, hue: 'education', featured: true,
    coverShape: 'badge', pull: "Conferences are infrastructure. Treat them that way.",
    series: 'NullCon \u00b7 powered by Destro Sec'
  },
  { id: 'ctf-cohort-08', title: "Cohort 08 capstone CTF: the writeup",
    deck: "Four teams, one weekend, and a deliberately broken Active Directory. Here\u2019s what they found and what they missed.",
    format: 'event', category: 'education', tags: ['CTF','Writeup','Cohort'],
    author: 'rohan-kapoor', date: '2026-04-12', readMin: 13, hue: 'education',
    coverShape: 'badge', pull: "Every cohort fails the same way until we change the curriculum. Then they fail in new ways."
  },
  { id: 'learning-offense-from-zero', title: "Learning offense from zero: month one as a Cohort 06 student",
    deck: "An honest log of what worked, what broke, and what I wished someone had told me before I joined.",
    format: 'technical', category: 'education', tags: ['Student','Diary','Beginner'],
    author: 'devansh-rai', date: '2026-02-19', readMin: 9, hue: 'education',
    coverShape: 'badge', pull: "The hardest part of learning offense isn\u2019t the tools. It\u2019s the patience to read three layers down."
  },

  // ── Opinion / fundraise / company ────────────────
  { id: 'fundraise-2026', title: "We're raising. Here's what we'll spend it on (and what we won't).",
    deck: "Three years bootstrapped. Now we\u2019re raising a small seed to grow education without compromising the work.",
    format: 'manifesto', category: 'company', tags: ['Company','Fundraise','Manifesto'],
    author: 'meera-nair', coAuthors: ['aarav-mehta'],
    date: '2026-04-25', readMin: 5, hue: 'opinion', featured: true,
    coverShape: 'flag', pull: "Most security firms scale by hiring juniors and selling them as seniors. We\u2019d rather not.",
    sponsor: true
  },
  { id: 'reports-no-one-reads', title: "Stop writing reports nobody reads",
    deck: "A short, opinionated piece about why the 200-page CVSS PDF is a tax on your client and a waste of your team\u2019s talent.",
    format: 'manifesto', category: 'company', tags: ['Opinion','Reporting','Craft'],
    author: 'aarav-mehta', date: '2026-03-02', readMin: 4, hue: 'opinion',
    coverShape: 'flag', pull: "If the dev who has to fix the bug can\u2019t read the finding without three Google searches, the finding is broken."
  }
];

// ── Helpers ─────────────────────────────────
const getAuthor = (id) => BLOG_AUTHORS.find(a => a.id === id);
const getPost = (id) => BLOG_POSTS.find(p => p.id === id);
const postsByAuthor = (id) => BLOG_POSTS.filter(p => p.author === id || (p.coAuthors || []).includes(id));
const postsByCategory = (cat) => BLOG_POSTS.filter(p => p.category === cat);
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};
const fromNow = (iso) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days < 1) return 'today';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days/7)}w ago`;
  if (days < 365) return `${Math.floor(days/30)}mo ago`;
  return `${Math.floor(days/365)}y ago`;
};

const HUE_DATA = {
  security:  { color: '#e63946', rgb: '230, 57, 70',   name: 'Security',  bg: 'rgba(230,57,70,0.08)' },
  software:  { color: '#3a86ff', rgb: '58, 134, 255',  name: 'Software',  bg: 'rgba(58,134,255,0.08)' },
  education: { color: '#ffbe0b', rgb: '255, 190, 11',  name: 'Education', bg: 'rgba(255,190,11,0.08)' },
  opinion:   { color: '#ff6b35', rgb: '255, 107, 53',  name: 'Opinion',   bg: 'rgba(255,107,53,0.08)' }
};

Object.assign(window, {
  BLOG_AUTHORS, BLOG_POSTS, HUE_DATA,
  getAuthor, getPost, postsByAuthor, postsByCategory, formatDate, fromNow
});
