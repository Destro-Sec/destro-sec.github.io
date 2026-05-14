// blog-post.jsx — Post page with 4 template variants

const BlogPostPage = ({
  onNav,
  postId
}) => {
  const [prefs, setPrefs] = window.useReadingPrefs();
  const post = window.getPost(postId) || window.BLOG_POSTS[0];
  const author = window.getAuthor(post.author);
  const coAuthors = (post.coAuthors || []).map(window.getAuthor).filter(Boolean);
  const h = window.HUE_DATA[post.hue];

  // Related: same category, not this post
  const related = window.BLOG_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  // Reading progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, window.scrollY / max * 100) : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [post.id]);
  return /*#__PURE__*/React.createElement("div", {
    className: "page blog-post",
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-progress",
    style: {
      width: `${progress}%`,
      background: h.color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container bp-toolbar-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "back-link",
    onClick: () => onNav('blog')
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
  })), "All posts"), /*#__PURE__*/React.createElement(window.ReadingControls, {
    prefs: prefs,
    setPrefs: setPrefs
  })), post.format === 'technical' && /*#__PURE__*/React.createElement(TechnicalPost, {
    post: post,
    author: author,
    coAuthors: coAuthors,
    onNav: onNav
  }), post.format === 'launch' && /*#__PURE__*/React.createElement(LaunchPost, {
    post: post,
    author: author,
    coAuthors: coAuthors,
    onNav: onNav
  }), post.format === 'event' && /*#__PURE__*/React.createElement(EventPost, {
    post: post,
    author: author,
    coAuthors: coAuthors,
    onNav: onNav
  }), post.format === 'manifesto' && /*#__PURE__*/React.createElement(ManifestoPost, {
    post: post,
    author: author,
    coAuthors: coAuthors,
    onNav: onNav
  }), post.format === 'listicle' && /*#__PURE__*/React.createElement(TechnicalPost, {
    post: post,
    author: author,
    coAuthors: coAuthors,
    onNav: onNav
  }), /*#__PURE__*/React.createElement(RelatedPosts, {
    posts: related,
    onNav: onNav
  }));
};

// ════════════════════════════════════════════════════
// Variant 1 — TECHNICAL (long-form writeup, listicle)
// ════════════════════════════════════════════════════
const TechnicalPost = ({
  post,
  author,
  coAuthors,
  onNav
}) => {
  const h = window.HUE_DATA[post.hue];
  const sections = [{
    id: 'tldr',
    label: 'TL;DR'
  }, {
    id: 'context',
    label: 'Context'
  }, {
    id: 'discovery',
    label: 'Discovery'
  }, {
    id: 'exploit',
    label: 'Exploitation'
  }, {
    id: 'impact',
    label: 'Impact'
  }, {
    id: 'fix',
    label: 'Mitigation'
  }, {
    id: 'timeline',
    label: 'Disclosure timeline'
  }];
  const [active, setActive] = useState('tldr');
  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: '-30% 0px -60% 0px'
    });
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [post.id]);
  return /*#__PURE__*/React.createElement("article", {
    className: "container bp-tech"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bp-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-cat-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      color: h.color,
      borderColor: `rgba(${h.rgb},0.4)`,
      background: `rgba(${h.rgb},0.08)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), h.name, " \xB7 ", post.format.toUpperCase()), post.tags.slice(0, 3).map(t => /*#__PURE__*/React.createElement(window.TagChip, {
    key: t,
    tag: t,
    hue: post.hue
  }))), /*#__PURE__*/React.createElement("h1", {
    className: "bp-h1"
  }, post.title), /*#__PURE__*/React.createElement("p", {
    className: "bp-deck"
  }, post.deck), /*#__PURE__*/React.createElement("div", {
    className: "bp-byline-row"
  }, /*#__PURE__*/React.createElement(window.AuthorByline, {
    authorId: author.id,
    onNav: onNav,
    withDate: true,
    date: post.date
  }), coAuthors.map(c => /*#__PURE__*/React.createElement(window.AuthorByline, {
    key: c.id,
    authorId: c.id,
    onNav: onNav
  })), /*#__PURE__*/React.createElement("span", {
    className: "bp-read mono"
  }, post.readMin, " min read"))), /*#__PURE__*/React.createElement(window.BlogCover, {
    shape: post.coverShape,
    hue: post.hue,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bp-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "bp-toc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-toc-label mono"
  }, "CONTENTS"), /*#__PURE__*/React.createElement("ol", {
    className: "bp-toc-list"
  }, sections.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.id,
    className: active === s.id ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: `#${s.id}`
  }, s.label))))), /*#__PURE__*/React.createElement("div", {
    className: "bp-prose"
  }, /*#__PURE__*/React.createElement("section", {
    id: "tldr"
  }, /*#__PURE__*/React.createElement("h2", null, "TL;DR"), /*#__PURE__*/React.createElement("p", null, "A benign-looking SSR helper trusted server-supplied props verbatim. The deserialiser, fed JSON the helper rendered, accepted Buffer-wrapped values. A forgotten ", /*#__PURE__*/React.createElement("code", null, "/admin/preview"), " endpoint chained the two without auth. Three nothings became one shell.")), /*#__PURE__*/React.createElement("section", {
    id: "context"
  }, /*#__PURE__*/React.createElement("h2", null, "Context"), /*#__PURE__*/React.createElement("p", null, "The target was the customer-portal of a Fortune 500 SaaS \u2014 a Next.js app with a custom SSR helper that ", /*#__PURE__*/React.createElement("em", null, "everyone"), " was using because it was the only way to pass auth context cleanly between the BFF and the page renderer.", /*#__PURE__*/React.createElement("sup", null, /*#__PURE__*/React.createElement("a", {
    href: "#fn-1"
  }, "1"))), /*#__PURE__*/React.createElement("p", null, "Engagement scope: full-coverage web app pen test, 4 weeks. Their previous vendor had cleared this app twice.")), /*#__PURE__*/React.createElement("section", {
    id: "discovery"
  }, /*#__PURE__*/React.createElement("h2", null, "Discovery"), /*#__PURE__*/React.createElement("p", null, "The first thing we noticed was an unusual prop on every server-rendered page: ", /*#__PURE__*/React.createElement("code", null, "__ssrCtx"), ". It was a base64-encoded blob the BFF passed in."), /*#__PURE__*/React.createElement(CodeBlock, {
    title: "curl probe",
    lang: "bash"
  }, `$ curl -s https://target/admin/preview \\
    -H "Cookie: session=guest" \\
    -d '{"slug":"home"}' | jq '.props.__ssrCtx' | head -c 80
"eyJ1aWQiOjEsInJvbGUiOiJndWVzdCIsImNzcmYiOiI..."`), /*#__PURE__*/React.createElement("p", null, "That was odd. ", /*#__PURE__*/React.createElement("code", null, "/admin/preview"), " shouldn't have been reachable as ", /*#__PURE__*/React.createElement("code", null, "guest"), ". It also shouldn't have been echoing back full SSR context. We had two findings before lunch.")), /*#__PURE__*/React.createElement("section", {
    id: "exploit"
  }, /*#__PURE__*/React.createElement("h2", null, "Exploitation"), /*#__PURE__*/React.createElement("p", null, "Chaining the three:"), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, "Poison the prop with a Buffer-wrapped serialised object: ", /*#__PURE__*/React.createElement("code", null, `{"$$buffer": "..."}`)), /*#__PURE__*/React.createElement("li", null, "The deserialiser, looking for ", /*#__PURE__*/React.createElement("code", null, "$$buffer"), ", calls ", /*#__PURE__*/React.createElement("code", null, "Buffer.from(value, 'base64')"), " on attacker input."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("code", null, "/admin/preview"), " renders the page server-side \u2014 and the rendered output triggers a downstream require chain that hits a vulnerable ", /*#__PURE__*/React.createElement("code", null, "vm"), " sandbox.")), /*#__PURE__*/React.createElement(PullQuote, {
    color: h.color,
    text: post.pull || 'If you can poison a prop, you can poison a render.'
  }), /*#__PURE__*/React.createElement(CodeBlock, {
    title: "weaponised payload",
    lang: "javascript"
  }, `// payload.js — drops a webshell as www-data
const payload = {
  __ssrCtx: Buffer.from(JSON.stringify({
    "$$buffer": "<encoded require('child_process').exec(...)>"
  })).toString('base64')
};
fetch('/admin/preview', {
  method: 'POST',
  body: JSON.stringify({ slug: 'home', ctx: payload })
});`)), /*#__PURE__*/React.createElement("section", {
    id: "impact"
  }, /*#__PURE__*/React.createElement("h2", null, "Impact"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "RCE as ", /*#__PURE__*/React.createElement("code", null, "www-data"), " on the production web tier"), /*#__PURE__*/React.createElement("li", null, "Lateral movement to the BFF via shared Redis (auth tokens cached cleartext)"), /*#__PURE__*/React.createElement("li", null, "Read access to all customer support tickets and a sample of payment metadata"))), /*#__PURE__*/React.createElement("section", {
    id: "fix"
  }, /*#__PURE__*/React.createElement("h2", null, "Mitigation"), /*#__PURE__*/React.createElement("p", null, "The vendor patched in 11 days. The fix:"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Block ", /*#__PURE__*/React.createElement("code", null, "$$"), "-prefixed keys at the deserialiser boundary"), /*#__PURE__*/React.createElement("li", null, "Move ", /*#__PURE__*/React.createElement("code", null, "/admin/preview"), " behind the standard auth middleware"), /*#__PURE__*/React.createElement("li", null, "Stop cacheing decoded auth tokens in Redis \u2014 issue per-request"))), /*#__PURE__*/React.createElement("section", {
    id: "timeline"
  }, /*#__PURE__*/React.createElement("h2", null, "Disclosure timeline"), /*#__PURE__*/React.createElement("table", {
    className: "bp-timeline-table"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, "D+0"), /*#__PURE__*/React.createElement("td", null, "Initial report to security@")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, "D+2"), /*#__PURE__*/React.createElement("td", null, "Triage call \xB7 confirmed")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, "D+11"), /*#__PURE__*/React.createElement("td", null, "Patch shipped")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, "D+45"), /*#__PURE__*/React.createElement("td", null, "CVE assigned, public writeup approved"))))), /*#__PURE__*/React.createElement("hr", {
    className: "bp-rule"
  }), /*#__PURE__*/React.createElement("ol", {
    className: "bp-footnotes"
  }, /*#__PURE__*/React.createElement("li", {
    id: "fn-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "1."), " The \"everyone uses it\" anti-pattern is a leading indicator of a blast radius surprise. We have a separate post on this.")))));
};

// ════════════════════════════════════════════════════
// Variant 2 — LAUNCH (product/case study)
// ════════════════════════════════════════════════════
const LaunchPost = ({
  post,
  author,
  coAuthors,
  onNav
}) => {
  const h = window.HUE_DATA[post.hue];
  return /*#__PURE__*/React.createElement("article", {
    className: "container bp-launch"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bp-launch-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-cat-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      color: h.color,
      borderColor: `rgba(${h.rgb},0.4)`,
      background: `rgba(${h.rgb},0.08)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "LAUNCH \xB7 ", h.name.toUpperCase()), post.tags.slice(0, 3).map(t => /*#__PURE__*/React.createElement(window.TagChip, {
    key: t,
    tag: t,
    hue: post.hue
  }))), /*#__PURE__*/React.createElement("h1", {
    className: "bp-h1 bp-launch-h1"
  }, post.title), /*#__PURE__*/React.createElement("p", {
    className: "bp-deck"
  }, post.deck), /*#__PURE__*/React.createElement("div", {
    className: "bp-byline-row"
  }, /*#__PURE__*/React.createElement(window.AuthorByline, {
    authorId: author.id,
    onNav: onNav,
    withDate: true,
    date: post.date
  }), coAuthors.map(c => /*#__PURE__*/React.createElement(window.AuthorByline, {
    key: c.id,
    authorId: c.id,
    onNav: onNav
  })), /*#__PURE__*/React.createElement("span", {
    className: "bp-read mono"
  }, post.readMin, " min read"))), /*#__PURE__*/React.createElement("div", {
    className: "bp-launch-hero"
  }, /*#__PURE__*/React.createElement(window.BlogCover, {
    shape: post.coverShape,
    hue: post.hue,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bp-launch-stats"
  }, [{
    n: '4,200',
    l: 'GitHub stars · day one'
  }, {
    n: '14',
    l: 'integrations included'
  }, {
    n: '< 5min',
    l: 'self-host setup'
  }, {
    n: 'MIT',
    l: 'license'
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    className: "bp-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-stat-n",
    style: {
      color: h.color
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    className: "bp-stat-l mono"
  }, s.l))))), /*#__PURE__*/React.createElement("div", {
    className: "bp-prose bp-launch-prose"
  }, /*#__PURE__*/React.createElement("h2", null, "Why we built it"), /*#__PURE__*/React.createElement("p", null, "Internal tools are the dark matter of every company. Most of the work happens in dashboards and runbooks nobody outside the team sees \u2014 and most of those dashboards are stitched together from three SaaS subscriptions and a forgotten Notion page."), /*#__PURE__*/React.createElement("p", null, "We tried n8n. We tried Appsmith. We tried Retool. They each solved 60% of what we needed. M-Dash is the 100%, but it isn't a new product \u2014 it's how to wire the existing ones together so they stop fighting."), /*#__PURE__*/React.createElement(PullQuote, {
    color: h.color,
    text: post.pull
  }), /*#__PURE__*/React.createElement("h2", null, "What's in the box"), /*#__PURE__*/React.createElement(FeatureGrid, {
    hue: post.hue,
    items: [{
      t: 'n8n at the back',
      d: 'All workflows, scheduled jobs, and webhooks. The work happens here.'
    }, {
      t: 'Appsmith at the front',
      d: 'Dashboards, forms, and CRUD. The humans live here.'
    }, {
      t: 'A thin glue layer',
      d: 'Auth, secrets, audit. The boring-but-critical stuff is ours.'
    }, {
      t: 'Self-hosted by default',
      d: 'Docker compose, K8s helm chart, or one-line install. Your data, your box.'
    }]
  }), /*#__PURE__*/React.createElement("h2", null, "The first three integrations we shipped"), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "On-call rotation builder"), " \u2014 pulls from PagerDuty + your calendar; flags conflicts."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Engagement tracker"), " \u2014 pen-test scoping \u2192 SOW \u2192 invoice in one timeline."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cohort dashboard"), " \u2014 student progress across the 6-week bootcamp, filtered by week.")), /*#__PURE__*/React.createElement("h2", null, "What's next"), /*#__PURE__*/React.createElement("p", null, "Roadmap is public. We're shipping the SSO module in May, and a CTF-platform integration before NullCon."), /*#__PURE__*/React.createElement("div", {
    className: "bp-cta-row"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-lg",
    href: "#",
    onClick: e => e.preventDefault()
  }, "Star on GitHub \u2192"), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-secondary",
    href: "#",
    onClick: e => e.preventDefault()
  }, "Read the docs"))));
};

// ════════════════════════════════════════════════════
// Variant 3 — EVENT (photo essay / recap)
// ════════════════════════════════════════════════════
const EventPost = ({
  post,
  author,
  coAuthors,
  onNav
}) => {
  const h = window.HUE_DATA[post.hue];
  const photos = [{
    caption: 'The village setup, two hours before doors.',
    tag: 'D-1 · 06:00',
    shape: 'badge'
  }, {
    caption: 'First wave of attendees. Network held.',
    tag: 'D+0 · 09:14',
    shape: 'grid'
  }, {
    caption: 'Capture-the-flag finals. Three teams within 20 points.',
    tag: 'D+1 · 16:42',
    shape: 'terminal'
  }, {
    caption: 'The accidental power outage. The CTF kept running on UPS.',
    tag: 'D+1 · 19:08',
    shape: 'lock'
  }, {
    caption: 'Closing keynote, full house.',
    tag: 'D+2 · 17:30',
    shape: 'flag'
  }, {
    caption: 'The cleanup crew. One of these is the founder.',
    tag: 'D+2 · 23:52',
    shape: 'shield'
  }];
  return /*#__PURE__*/React.createElement("article", {
    className: "container bp-event"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bp-event-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-cat-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      color: h.color,
      borderColor: `rgba(${h.rgb},0.4)`,
      background: `rgba(${h.rgb},0.08)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "EVENT RECAP"), post.tags.slice(0, 3).map(t => /*#__PURE__*/React.createElement(window.TagChip, {
    key: t,
    tag: t,
    hue: post.hue
  }))), /*#__PURE__*/React.createElement("h1", {
    className: "bp-h1"
  }, post.title), /*#__PURE__*/React.createElement("p", {
    className: "bp-deck"
  }, post.deck), /*#__PURE__*/React.createElement("div", {
    className: "bp-byline-row"
  }, /*#__PURE__*/React.createElement(window.AuthorByline, {
    authorId: author.id,
    onNav: onNav,
    withDate: true,
    date: post.date
  }), coAuthors.map(c => /*#__PURE__*/React.createElement(window.AuthorByline, {
    key: c.id,
    authorId: c.id,
    onNav: onNav
  })), /*#__PURE__*/React.createElement("span", {
    className: "bp-read mono"
  }, post.readMin, " min read")), post.series && /*#__PURE__*/React.createElement("div", {
    className: "bp-series mono",
    style: {
      color: h.color
    }
  }, "SERIES \xB7 ", post.series)), /*#__PURE__*/React.createElement("div", {
    className: "bp-event-stats"
  }, [{
    n: '800',
    l: 'attendees'
  }, {
    n: '14',
    l: 'talks'
  }, {
    n: '4',
    l: 'CTF teams'
  }, {
    n: '1',
    l: 'unscheduled outage'
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    className: "bp-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-stat-n",
    style: {
      color: h.color
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    className: "bp-stat-l mono"
  }, s.l)))), /*#__PURE__*/React.createElement("div", {
    className: "bp-prose bp-event-prose"
  }, /*#__PURE__*/React.createElement("p", null, "NullCon 2026 ran from March 28 to 30 in Goa. We powered the village this year \u2014 meaning we ran the network, the CTF infrastructure, and the badge auth. Here's how it went, with photos."), /*#__PURE__*/React.createElement(PullQuote, {
    color: h.color,
    text: post.pull
  })), /*#__PURE__*/React.createElement("div", {
    className: "bp-photo-grid"
  }, photos.map((p, i) => /*#__PURE__*/React.createElement("figure", {
    key: i,
    className: "bp-photo"
  }, /*#__PURE__*/React.createElement(window.BlogCover, {
    shape: p.shape,
    hue: post.hue,
    size: "md"
  }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("span", {
    className: "bp-photo-tag mono",
    style: {
      color: h.color
    }
  }, p.tag), /*#__PURE__*/React.createElement("span", null, p.caption))))), /*#__PURE__*/React.createElement("div", {
    className: "bp-prose bp-event-prose"
  }, /*#__PURE__*/React.createElement("h2", null, "The schedule, in one image"), /*#__PURE__*/React.createElement("div", {
    className: "bp-schedule"
  }, [{
    d: 'Day 0',
    items: ['Setup', 'Opening keynote', 'Track A · Web', 'Track B · AD']
  }, {
    d: 'Day 1',
    items: ['Track A · Cloud', 'Track B · Mobile', 'CTF qualifiers', 'Lightning talks']
  }, {
    d: 'Day 2',
    items: ['Track A · IR', 'Track B · OT/ICS', 'CTF finals', 'Closing keynote']
  }].map(d => /*#__PURE__*/React.createElement("div", {
    key: d.d,
    className: "bp-day"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-day-h mono",
    style: {
      color: h.color
    }
  }, d.d), d.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it,
    className: "bp-day-row"
  }, it))))), /*#__PURE__*/React.createElement("h2", null, "What we'd do differently"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Run the UPS test the day before, not three weeks before."), /*#__PURE__*/React.createElement("li", null, "One more network engineer. The wifi melted at 14:00 on day one."), /*#__PURE__*/React.createElement("li", null, "Keep the CTF scoreboard out of the keynote room \u2014 it became more interesting than the keynote."))));
};

// ════════════════════════════════════════════════════
// Variant 4 — MANIFESTO (typographic, minimal)
// ════════════════════════════════════════════════════
const ManifestoPost = ({
  post,
  author,
  coAuthors,
  onNav
}) => {
  const h = window.HUE_DATA[post.hue];
  return /*#__PURE__*/React.createElement("article", {
    className: "container bp-manifesto",
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("header", {
    className: "bp-mf-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-mf-meta mono"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: h.color
    }
  }, "\u2605"), /*#__PURE__*/React.createElement("span", null, "MANIFESTO"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, window.formatDate(post.date)), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, post.readMin, " min")), /*#__PURE__*/React.createElement("h1", {
    className: "bp-mf-h1"
  }, post.title)), /*#__PURE__*/React.createElement("div", {
    className: "bp-mf-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "bp-mf-lede"
  }, post.deck), /*#__PURE__*/React.createElement("p", null, "Three years ago, four of us started Destro Sec because the security industry was structured around vendors who couldn't talk to each other. The red team didn't read the codebase. The dev shop didn't know how it'd be attacked. The educators were a different vendor entirely."), /*#__PURE__*/React.createElement("p", null, "We bootstrapped through year one. Year two, we paid ourselves. Year three, we hit profitability and a waitlist. Now we're raising \u2014 a small seed, $1.8M \u2014 to do ", /*#__PURE__*/React.createElement("em", null, "more"), " of what's working, not to pivot into something else."), /*#__PURE__*/React.createElement(PullQuote, {
    color: h.color,
    text: post.pull,
    large: true
  }), /*#__PURE__*/React.createElement("h2", {
    className: "bp-mf-h2"
  }, "Where it goes"), /*#__PURE__*/React.createElement("ul", {
    className: "bp-mf-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "60%"), " \u2014 education. Free CTFs in 12 more cities. Scholarships that cover laptops, not just tuition."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "25%"), " \u2014 research. We want to publish four CVEs a year out of the team's own time, paid."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "10%"), " \u2014 better tooling. The internal stuff that lets two engineers do the work of five."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "5%"), " \u2014 operations. One more person on contracts so engineers stop reading SOWs.")), /*#__PURE__*/React.createElement("h2", {
    className: "bp-mf-h2"
  }, "Where it doesn't go"), /*#__PURE__*/React.createElement("ul", {
    className: "bp-mf-list"
  }, /*#__PURE__*/React.createElement("li", null, "SDRs. We've never had one and we never will."), /*#__PURE__*/React.createElement("li", null, "\"AI-powered\" anything we don't build ourselves."), /*#__PURE__*/React.createElement("li", null, "A bigger office. The current one is fine."), /*#__PURE__*/React.createElement("li", null, "Booth swag.")), /*#__PURE__*/React.createElement("p", {
    className: "bp-mf-sign"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "\u2014 Meera, Aarav, Priya, Rohan")), /*#__PURE__*/React.createElement("div", {
    className: "bp-mf-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => onNav('contact')
  }, "Talk to us about the round \u2192"))));
};

// ─── Shared bits ───────────────────────────────
const CodeBlock = ({
  title,
  lang,
  children
}) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bp-code"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-code-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bp-code-title mono"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "bp-code-lang mono"
  }, lang), /*#__PURE__*/React.createElement("button", {
    className: "bp-code-copy",
    onClick: copy
  }, copied ? 'copied' : 'copy')), /*#__PURE__*/React.createElement("pre", {
    className: "mono"
  }, /*#__PURE__*/React.createElement("code", null, children)));
};
const PullQuote = ({
  text,
  color,
  large
}) => /*#__PURE__*/React.createElement("blockquote", {
  className: `bp-pull ${large ? 'lg' : ''}`,
  style: {
    borderLeftColor: color
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "bp-pull-mark",
  style: {
    color
  }
}, "\""), text);
const FeatureGrid = ({
  items,
  hue
}) => {
  const h = window.HUE_DATA[hue];
  return /*#__PURE__*/React.createElement("div", {
    className: "bp-fg",
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.t,
    className: "bp-fg-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bp-fg-t"
  }, it.t), /*#__PURE__*/React.createElement("div", {
    className: "bp-fg-d"
  }, it.d))));
};
const RelatedPosts = ({
  posts,
  onNav
}) => /*#__PURE__*/React.createElement("section", {
  className: "container bp-related"
}, /*#__PURE__*/React.createElement("h2", {
  className: "bh-shelf-title"
}, /*#__PURE__*/React.createElement("span", {
  className: "mono"
}, "RELATED")), /*#__PURE__*/React.createElement("div", {
  className: "bh-grid"
}, posts.map(p => /*#__PURE__*/React.createElement(window.PostCard, {
  key: p.id,
  post: p,
  onNav: onNav
}))));
window.BlogPostPage = BlogPostPage;