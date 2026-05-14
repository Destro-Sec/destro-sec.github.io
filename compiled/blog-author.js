// blog-author.jsx — Author page with rich data + interactions

const BlogAuthorPage = ({
  onNav,
  authorId
}) => {
  const [prefs, setPrefs] = window.useReadingPrefs();
  const a = window.getAuthor(authorId) || window.BLOG_AUTHORS[0];
  const allPosts = window.postsByAuthor(a.id);
  const h = window.HUE_DATA[a.vertical];
  const [filter, setFilter] = useState({
    tag: null,
    year: null,
    format: null
  });
  const filtered = allPosts.filter(p => (!filter.tag || p.tags.includes(filter.tag)) && (!filter.year || new Date(p.date).getFullYear() === filter.year) && (!filter.format || p.format === filter.format));
  const tags = Array.from(new Set(allPosts.flatMap(p => p.tags))).sort();
  const years = Array.from(new Set(allPosts.map(p => new Date(p.date).getFullYear()))).sort((x, y) => y - x);
  const formats = Array.from(new Set(allPosts.map(p => p.format)));
  return /*#__PURE__*/React.createElement("div", {
    className: "page blog-author",
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-glow",
    style: {
      background: `radial-gradient(circle at 30% 0%, rgba(${h.rgb}, 0.15) 0%, transparent 50%)`
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
  })), "All authors"), /*#__PURE__*/React.createElement(window.ReadingControls, {
    prefs: prefs,
    setPrefs: setPrefs
  })), /*#__PURE__*/React.createElement("div", {
    className: "container ba-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ba-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-sticky"
  }, /*#__PURE__*/React.createElement(AuthorAvatar, {
    author: a,
    size: 140
  }), /*#__PURE__*/React.createElement("div", {
    className: "ba-name"
  }, a.name), /*#__PURE__*/React.createElement("div", {
    className: "ba-role mono"
  }, a.role), a.type === 'guest' && /*#__PURE__*/React.createElement("div", {
    className: "ba-guest mono"
  }, "GUEST CONTRIBUTOR"), /*#__PURE__*/React.createElement("p", {
    className: "ba-bio"
  }, a.bio), /*#__PURE__*/React.createElement("div", {
    className: "ba-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "PRONOUNS"), /*#__PURE__*/React.createElement("span", null, a.pronouns)), /*#__PURE__*/React.createElement("div", {
    className: "ba-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "BASED IN"), /*#__PURE__*/React.createElement("span", null, a.location)), /*#__PURE__*/React.createElement("div", {
    className: "ba-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "JOINED"), /*#__PURE__*/React.createElement("span", null, a.joined)), /*#__PURE__*/React.createElement("div", {
    className: "ba-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "SITE"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, a.site))), /*#__PURE__*/React.createElement("div", {
    className: "ba-stats"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ba-stat-n"
  }, allPosts.length), /*#__PURE__*/React.createElement("div", {
    className: "ba-stat-l mono"
  }, "posts")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ba-stat-n"
  }, a.talks.length), /*#__PURE__*/React.createElement("div", {
    className: "ba-stat-l mono"
  }, "talks")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ba-stat-n"
  }, a.projects.length), /*#__PURE__*/React.createElement("div", {
    className: "ba-stat-l mono"
  }, "projects"))), a.type !== 'guest' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      width: '100%',
      marginTop: 16
    },
    onClick: () => onNav('team', {
      id: a.id
    })
  }, "Full team profile \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "ba-main"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ba-row-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-card-head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ba-card-title"
  }, "Writing activity"), /*#__PURE__*/React.createElement("span", {
    className: "mono ba-card-meta"
  }, "last 12 months")), /*#__PURE__*/React.createElement(ActivityHeatmap, {
    posts: allPosts,
    hue: a.vertical
  })), /*#__PURE__*/React.createElement("div", {
    className: "ba-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-card-head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ba-card-title"
  }, "Topic distribution"), /*#__PURE__*/React.createElement("span", {
    className: "mono ba-card-meta"
  }, allPosts.length, " posts")), /*#__PURE__*/React.createElement(TopicDonut, {
    topics: a.topics
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ba-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-section-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ba-section-title"
  }, "Posts"), /*#__PURE__*/React.createElement("span", {
    className: "mono ba-section-count"
  }, filtered.length, " of ", allPosts.length)), /*#__PURE__*/React.createElement("div", {
    className: "ba-filters"
  }, /*#__PURE__*/React.createElement(FilterGroup, {
    label: "YEAR",
    options: years.map(y => ({
      v: y,
      l: y
    })),
    value: filter.year,
    onChange: v => setFilter(f => ({
      ...f,
      year: v
    }))
  }), /*#__PURE__*/React.createElement(FilterGroup, {
    label: "FORMAT",
    options: formats.map(f => ({
      v: f,
      l: f
    })),
    value: filter.format,
    onChange: v => setFilter(f => ({
      ...f,
      format: v
    }))
  }), /*#__PURE__*/React.createElement(FilterGroup, {
    label: "TAG",
    options: tags.map(t => ({
      v: t,
      l: '#' + t
    })),
    value: filter.tag,
    onChange: v => setFilter(f => ({
      ...f,
      tag: v
    }))
  })), /*#__PURE__*/React.createElement(Timeline, {
    posts: filtered,
    onNav: onNav
  })), a.talks.length > 0 && /*#__PURE__*/React.createElement("section", {
    className: "ba-section"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ba-section-title"
  }, "Talks & conferences"), /*#__PURE__*/React.createElement("div", {
    className: "ba-talks"
  }, a.talks.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "ba-talk",
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-talk-y mono"
  }, t.year), /*#__PURE__*/React.createElement("div", {
    className: "ba-talk-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-talk-event mono",
    style: {
      color: h.color
    }
  }, t.event), /*#__PURE__*/React.createElement("div", {
    className: "ba-talk-title"
  }, t.title)))))), a.projects.length > 0 && /*#__PURE__*/React.createElement("section", {
    className: "ba-section"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ba-section-title"
  }, "Tools & projects"), /*#__PURE__*/React.createElement("div", {
    className: "ba-projects"
  }, a.projects.map(p => /*#__PURE__*/React.createElement("a", {
    key: p.name,
    href: "#",
    onClick: e => e.preventDefault(),
    className: "ba-project",
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-proj-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ba-proj-icon mono",
    style: {
      color: h.color
    }
  }, "\u25C7"), /*#__PURE__*/React.createElement("span", {
    className: "ba-proj-name mono"
  }, p.name)), /*#__PURE__*/React.createElement("p", {
    className: "ba-proj-desc"
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "ba-proj-meta mono"
  }, /*#__PURE__*/React.createElement("span", null, p.lang), /*#__PURE__*/React.createElement("span", null, "\u2605 ", p.stars)))))))), /*#__PURE__*/React.createElement("section", {
    className: "container ba-others"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ba-section-title"
  }, "Others writing here"), /*#__PURE__*/React.createElement("div", {
    className: "ba-others-grid"
  }, window.BLOG_AUTHORS.filter(o => o.id !== a.id).slice(0, 5).map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    className: "ba-other",
    onClick: () => onNav('blog-author', {
      id: o.id
    }),
    style: {
      '--h': window.HUE_DATA[o.vertical].color,
      '--hr': window.HUE_DATA[o.vertical].rgb
    }
  }, /*#__PURE__*/React.createElement(AuthorAvatar, {
    author: o,
    size: 48
  }), /*#__PURE__*/React.createElement("div", {
    className: "ba-other-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-other-name"
  }, o.name), /*#__PURE__*/React.createElement("div", {
    className: "ba-other-role mono"
  }, o.role)), /*#__PURE__*/React.createElement("div", {
    className: "ba-other-count mono"
  }, window.postsByAuthor(o.id).length, " posts"))))));
};

// ─── Avatar ────────────────────────────────────
const AuthorAvatar = ({
  author,
  size = 80
}) => {
  const h = window.HUE_DATA[author.vertical];
  const initials = author.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("div", {
    className: "ba-avatar",
    style: {
      width: size,
      height: size,
      background: `linear-gradient(135deg, ${h.color}40, var(--color-bg-elevated))`,
      color: h.color,
      fontSize: size * 0.32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-avatar-grid"
  }), initials);
};

// ─── Activity heatmap (GitHub-style) ──────────
const ActivityHeatmap = ({
  posts,
  hue
}) => {
  const h = window.HUE_DATA[hue];
  const today = new Date();
  // 52 weeks × 7 days
  const cells = [];
  for (let w = 51; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      cells.push({
        date,
        count: 0,
        posts: []
      });
    }
  }
  // Seed activity: post days = 4, ±3 days = 1-2 (drafting)
  posts.forEach(p => {
    const pd = new Date(p.date);
    cells.forEach(c => {
      const diff = Math.abs((c.date - pd) / 86400000);
      if (diff < 1) {
        c.count = Math.max(c.count, 4);
        c.posts.push(p);
      } else if (diff < 4) c.count = Math.max(c.count, 2);else if (diff < 8) c.count = Math.max(c.count, 1);
    });
  });
  // Sprinkle some baseline noise so the heatmap looks alive
  cells.forEach((c, i) => {
    if (c.count === 0 && i * 7919 % 23 < 3) c.count = 1;
  });
  const monthLabels = [];
  let lastMonth = -1;
  cells.forEach((c, i) => {
    if (i % 7 === 0) {
      const m = c.date.getMonth();
      if (m !== lastMonth && c.date.getDate() <= 7) {
        monthLabels.push({
          idx: i / 7,
          label: c.date.toLocaleString('en', {
            month: 'short'
          })
        });
        lastMonth = m;
      }
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "ah-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ah-months mono"
  }, monthLabels.map(m => /*#__PURE__*/React.createElement("span", {
    key: m.idx,
    style: {
      left: `${m.idx * 14 + 2}px`
    }
  }, m.label))), /*#__PURE__*/React.createElement("div", {
    className: "ah-grid"
  }, Array.from({
    length: 52
  }).map((_, w) => /*#__PURE__*/React.createElement("div", {
    key: w,
    className: "ah-col"
  }, Array.from({
    length: 7
  }).map((_, d) => {
    const cell = cells[w * 7 + d];
    const count = cell.count;
    const op = count === 0 ? 0.06 : 0.18 + count * 0.18;
    const title = `${cell.date.toDateString()} — ${count === 4 ? 'published' : count >= 2 ? 'drafting' : count === 1 ? 'editing' : 'no activity'}`;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      className: "ah-cell",
      title: title,
      style: {
        background: count === 0 ? `rgba(255,255,255,${op})` : `rgba(${h.rgb}, ${op})`,
        border: cell.posts.length ? `1px solid ${h.color}` : 'none'
      }
    });
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ah-legend mono"
  }, /*#__PURE__*/React.createElement("span", null, "Less"), [0.06, 0.36, 0.54, 0.72, 0.9].map((op, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "ah-cell",
    style: {
      background: i === 0 ? `rgba(255,255,255,${op})` : `rgba(${h.rgb}, ${op})`
    }
  })), /*#__PURE__*/React.createElement("span", null, "More")));
};

// ─── Topic donut ────────────────────────────
const TopicDonut = ({
  topics
}) => {
  const entries = Object.entries(topics).filter(([, v]) => v > 0);
  const r = 60;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "td-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "160",
    height: "160",
    viewBox: "-80 -80 160 160",
    className: "td-svg"
  }, /*#__PURE__*/React.createElement("circle", {
    r: r,
    fill: "none",
    stroke: "rgba(255,255,255,0.05)",
    strokeWidth: "20"
  }), entries.map(([k, v]) => {
    const len = v / 100 * C;
    const dasharray = `${len} ${C - len}`;
    const dashoffset = -acc;
    acc += len;
    const color = window.HUE_DATA[k]?.color || '#888';
    return /*#__PURE__*/React.createElement("circle", {
      key: k,
      r: r,
      fill: "none",
      stroke: color,
      strokeWidth: "20",
      strokeDasharray: dasharray,
      strokeDashoffset: dashoffset,
      transform: "rotate(-90)"
    });
  }), /*#__PURE__*/React.createElement("text", {
    textAnchor: "middle",
    y: "-6",
    className: "td-num",
    fontFamily: "var(--font-display)",
    fontSize: "22",
    fill: "currentColor",
    fontWeight: "600"
  }, entries.length), /*#__PURE__*/React.createElement("text", {
    textAnchor: "middle",
    y: "14",
    fontFamily: "var(--font-mono)",
    fontSize: "9",
    fill: "rgba(255,255,255,0.5)",
    letterSpacing: "0.1em"
  }, "TOPICS")), /*#__PURE__*/React.createElement("div", {
    className: "td-legend"
  }, entries.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "td-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "td-dot",
    style: {
      background: window.HUE_DATA[k]?.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "td-k"
  }, window.HUE_DATA[k]?.name || k), /*#__PURE__*/React.createElement("span", {
    className: "td-v mono"
  }, v, "%")))));
};

// ─── Filter group ────────────────────────────
const FilterGroup = ({
  label,
  options,
  value,
  onChange
}) => /*#__PURE__*/React.createElement("div", {
  className: "ba-fg"
}, /*#__PURE__*/React.createElement("span", {
  className: "ba-fg-l mono"
}, label), /*#__PURE__*/React.createElement("button", {
  className: `ba-fg-opt ${value === null ? 'on' : ''}`,
  onClick: () => onChange(null)
}, "all"), options.map(o => /*#__PURE__*/React.createElement("button", {
  key: o.v,
  className: `ba-fg-opt ${value === o.v ? 'on' : ''}`,
  onClick: () => onChange(value === o.v ? null : o.v)
}, o.l)));

// ─── Timeline of posts ────────────────────────
const Timeline = ({
  posts,
  onNav
}) => {
  if (posts.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ba-empty mono"
    }, "No posts match these filters.");
  }
  // Group by year
  const grouped = posts.reduce((acc, p) => {
    const y = new Date(p.date).getFullYear();
    (acc[y] = acc[y] || []).push(p);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => b - a);
  return /*#__PURE__*/React.createElement("div", {
    className: "ba-timeline"
  }, years.map(y => /*#__PURE__*/React.createElement("div", {
    key: y,
    className: "ba-tl-year"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-tl-y-label mono"
  }, y), /*#__PURE__*/React.createElement("div", {
    className: "ba-tl-posts"
  }, grouped[y].map(p => {
    const ph = window.HUE_DATA[p.hue];
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      className: "ba-tl-post",
      onClick: () => onNav('blog-post', {
        id: p.id
      }),
      style: {
        '--h': ph.color,
        '--hr': ph.rgb
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ba-tl-date mono"
    }, new Date(p.date).toLocaleString('en', {
      month: 'short',
      day: 'numeric'
    })), /*#__PURE__*/React.createElement("div", {
      className: "ba-tl-bullet",
      style: {
        background: ph.color
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "ba-tl-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ba-tl-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mono ba-tl-cat",
      style: {
        color: ph.color
      }
    }, ph.name.toUpperCase()), /*#__PURE__*/React.createElement("span", {
      className: "mono ba-tl-fmt"
    }, p.format), /*#__PURE__*/React.createElement("span", {
      className: "mono ba-tl-read"
    }, p.readMin, " min")), /*#__PURE__*/React.createElement("div", {
      className: "ba-tl-title"
    }, p.title), /*#__PURE__*/React.createElement("div", {
      className: "ba-tl-tags"
    }, p.tags.slice(0, 4).map(t => /*#__PURE__*/React.createElement(window.TagChip, {
      key: t,
      tag: t,
      hue: p.hue,
      sm: true
    })))));
  })))));
};
window.BlogAuthorPage = BlogAuthorPage;