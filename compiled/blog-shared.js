// blog-shared.jsx — cover art generators, hover preview card, post card

// ─── Cover art ────────────────────────────────────
// Stylised SVG generative art per cover shape × hue.
const BlogCover = ({
  shape = 'terminal',
  hue = 'security',
  size = 'md'
}) => {
  const h = window.HUE_DATA[hue];
  const c = h.color;
  const w = size === 'lg' ? 800 : size === 'sm' ? 280 : 480;
  const ht = size === 'lg' ? 360 : size === 'sm' ? 160 : 220;
  const dim = `0 0 ${w} ${ht}`;
  const wrapStyle = {
    background: `linear-gradient(135deg, rgba(${h.rgb},0.18), rgba(${h.rgb},0.04))`,
    border: `1px solid rgba(${h.rgb},0.25)`,
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
    aspectRatio: `${w}/${ht}`,
    width: '100%'
  };
  const renderShape = () => {
    if (shape === 'terminal') {
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: dim,
        style: {
          width: '100%',
          height: '100%'
        },
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
        id: `grid-${hue}`,
        width: "20",
        height: "20",
        patternUnits: "userSpaceOnUse"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M 20 0 L 0 0 0 20",
        fill: "none",
        stroke: c,
        strokeOpacity: "0.08",
        strokeWidth: "0.5"
      }))), /*#__PURE__*/React.createElement("rect", {
        width: "100%",
        height: "100%",
        fill: `url(#grid-${hue})`
      }), /*#__PURE__*/React.createElement("g", {
        fontFamily: "ui-monospace, monospace",
        fontSize: "13",
        fill: c
      }, /*#__PURE__*/React.createElement("text", {
        x: "24",
        y: "34"
      }, "$ ./react2shell.sh --target prod"), /*#__PURE__*/React.createElement("text", {
        x: "24",
        y: "58",
        fill: "rgba(255,255,255,0.55)"
      }, "[+] poisoning prop in render tree"), /*#__PURE__*/React.createElement("text", {
        x: "24",
        y: "78",
        fill: "rgba(255,255,255,0.55)"
      }, "[+] deserialiser confused"), /*#__PURE__*/React.createElement("text", {
        x: "24",
        y: "98",
        fill: "rgba(255,255,255,0.55)"
      }, "[+] /admin/preview reachable"), /*#__PURE__*/React.createElement("text", {
        x: "24",
        y: "122",
        fill: c
      }, "[!] shell @ web-prod-04 :: uid=33(www-data)")), /*#__PURE__*/React.createElement("rect", {
        x: w - 150,
        y: ht - 32,
        width: "130",
        height: "20",
        fill: "none",
        stroke: c,
        strokeOpacity: "0.4",
        strokeWidth: "1",
        rx: "4"
      }), /*#__PURE__*/React.createElement("text", {
        x: w - 140,
        y: ht - 18,
        fontFamily: "ui-monospace",
        fontSize: "11",
        fill: c,
        opacity: "0.75"
      }, "CVE-2025-XXXXX"));
    }
    if (shape === 'editor') {
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: dim,
        style: {
          width: '100%',
          height: '100%'
        },
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("rect", {
        width: "100%",
        height: "28",
        fill: c,
        fillOpacity: "0.12"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "14",
        cy: "14",
        r: "4",
        fill: "#ff6b6b"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "28",
        cy: "14",
        r: "4",
        fill: "#ffd166"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "42",
        cy: "14",
        r: "4",
        fill: "#06d6a0"
      }), /*#__PURE__*/React.createElement("text", {
        x: "64",
        y: "18",
        fontFamily: "ui-monospace",
        fontSize: "11",
        fill: "rgba(255,255,255,0.55)"
      }, "m-dash \xB7 src/dashboard.tsx"), Array.from({
        length: 8
      }).map((_, i) => {
        const widths = [60, 130, 90, 200, 110, 160, 80, 140];
        return /*#__PURE__*/React.createElement("rect", {
          key: i,
          x: "24",
          y: 56 + i * 18,
          width: widths[i],
          height: "6",
          fill: c,
          opacity: 0.15 + i % 3 * 0.15,
          rx: "2"
        });
      }), /*#__PURE__*/React.createElement("rect", {
        x: "220",
        y: "56",
        width: "80",
        height: "6",
        fill: c,
        opacity: "0.5",
        rx: "2"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "280",
        y: "92",
        width: "60",
        height: "6",
        fill: c,
        opacity: "0.7",
        rx: "2"
      }));
    }
    if (shape === 'lock') {
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: dim,
        style: {
          width: '100%',
          height: '100%'
        },
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("g", {
        transform: `translate(${w / 2 - 60}, ${ht / 2 - 60})`
      }, /*#__PURE__*/React.createElement("rect", {
        x: "20",
        y: "50",
        width: "80",
        height: "60",
        fill: "none",
        stroke: c,
        strokeWidth: "2",
        rx: "6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M35 50 V35 a25 25 0 0 1 50 0 V50",
        fill: "none",
        stroke: c,
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "60",
        cy: "80",
        r: "6",
        fill: c
      }), /*#__PURE__*/React.createElement("line", {
        x1: "60",
        y1: "86",
        x2: "60",
        y2: "98",
        stroke: c,
        strokeWidth: "2"
      })), /*#__PURE__*/React.createElement("line", {
        x1: w / 2 + 20,
        y1: ht / 2 - 40,
        x2: w / 2 + 80,
        y2: ht / 2 + 40,
        stroke: c,
        strokeWidth: "3",
        strokeLinecap: "round",
        opacity: "0.85"
      }));
    }
    if (shape === 'shield') {
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: dim,
        style: {
          width: '100%',
          height: '100%'
        },
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("g", {
        transform: `translate(${w / 2 - 50}, ${ht / 2 - 60}) scale(1)`
      }, /*#__PURE__*/React.createElement("path", {
        d: "M50 5 L95 25 V60 Q95 95 50 115 Q5 95 5 60 V25 Z",
        fill: "none",
        stroke: c,
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M50 25 L75 38 V62 Q75 82 50 95 Q25 82 25 62 V38 Z",
        fill: c,
        fillOpacity: "0.12"
      }), /*#__PURE__*/React.createElement("text", {
        x: "50",
        y: "68",
        fontFamily: "ui-monospace",
        fontSize: "13",
        fill: c,
        textAnchor: "middle"
      }, "DPDPA")));
    }
    if (shape === 'grid') {
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: dim,
        style: {
          width: '100%',
          height: '100%'
        },
        "aria-hidden": true
      }, Array.from({
        length: 11
      }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
        key: i,
        x: 20 + i % 6 * 72,
        y: 20 + Math.floor(i / 6) * 90,
        width: "60",
        height: "78",
        fill: c,
        fillOpacity: 0.08 + i % 3 * 0.1,
        stroke: c,
        strokeOpacity: "0.3",
        strokeWidth: "1",
        rx: "4"
      })), Array.from({
        length: 11
      }).map((_, i) => /*#__PURE__*/React.createElement("text", {
        key: `t-${i}`,
        x: 50 + i % 6 * 72,
        y: 62 + Math.floor(i / 6) * 90,
        fontFamily: "ui-monospace",
        fontSize: "9",
        fill: c,
        textAnchor: "middle"
      }, "CVE")));
    }
    if (shape === 'badge') {
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: dim,
        style: {
          width: '100%',
          height: '100%'
        },
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("g", {
        transform: `translate(${w / 2 - 70}, ${ht / 2 - 70})`
      }, /*#__PURE__*/React.createElement("polygon", {
        points: "70,10 130,40 130,100 70,130 10,100 10,40",
        fill: "none",
        stroke: c,
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "70,30 110,50 110,90 70,110 30,90 30,50",
        fill: c,
        fillOpacity: "0.12"
      }), /*#__PURE__*/React.createElement("text", {
        x: "70",
        y: "68",
        fontFamily: "ui-monospace",
        fontSize: "13",
        fill: c,
        textAnchor: "middle",
        fontWeight: "600"
      }, "NULLCON"), /*#__PURE__*/React.createElement("text", {
        x: "70",
        y: "86",
        fontFamily: "ui-monospace",
        fontSize: "10",
        fill: c,
        textAnchor: "middle",
        opacity: "0.7"
      }, "2026")));
    }
    if (shape === 'flag') {
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: dim,
        style: {
          width: '100%',
          height: '100%'
        },
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("line", {
        x1: "40",
        y1: "20",
        x2: "40",
        y2: ht - 20,
        stroke: c,
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: `M40 30 L${w - 60} 30 L${w - 90} 60 L${w - 60} 90 L40 90 Z`,
        fill: c,
        fillOpacity: "0.18",
        stroke: c,
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("text", {
        x: "60",
        y: "68",
        fontFamily: "ui-monospace",
        fontSize: "14",
        fill: c
      }, "raise / build / teach"));
    }
    return null;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bc-wrap",
    style: wrapStyle
  }, renderShape());
};

// ─── Tag chip ─────────────────────────────────────
// Uses <button> when interactive (onClick) so keyboard users can activate it.
const TagChip = ({
  tag,
  hue = 'security',
  sm = false,
  onClick
}) => {
  const h = window.HUE_DATA[hue] || window.HUE_DATA.security;
  if (onClick) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `tag-chip ${sm ? 'sm' : ''}`,
      onClick: onClick,
      style: {
        '--h': h.color,
        '--hr': h.rgb
      }
    }, tag);
  }
  return /*#__PURE__*/React.createElement("span", {
    className: `tag-chip ${sm ? 'sm' : ''}`,
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, tag);
};

// ─── Author chip + hover preview card ─────────────
const AuthorByline = ({
  authorId,
  onNav,
  withDate,
  date,
  mini
}) => {
  const a = window.getAuthor(authorId);
  if (!a) return null;
  const h = window.HUE_DATA[a.vertical];
  const initials = a.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("button", {
    className: `author-byline ${mini ? 'mini' : ''}`,
    onClick: e => {
      e.stopPropagation();
      onNav('blog-author', {
        id: a.id
      });
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ab-avatar",
    style: {
      background: `linear-gradient(135deg, ${h.color}40, var(--color-bg-elevated))`,
      color: h.color
    }
  }, initials), /*#__PURE__*/React.createElement("span", {
    className: "ab-name"
  }, a.name), a.type === 'guest' && /*#__PURE__*/React.createElement("span", {
    className: "ab-guest mono"
  }, "GUEST"), withDate && date && /*#__PURE__*/React.createElement("span", {
    className: "ab-date mono"
  }, window.formatDate(date), " \xB7 ", window.fromNow(date)));
};

// ─── Hover-preview post link ──────────────────────
// Wraps any content; on hover, shows a compact post preview floating beside the cursor.
const PostHoverLink = ({
  postId,
  onNav,
  children,
  className = ''
}) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({
    x: 0,
    y: 0
  });
  const ref = useRef(null);
  const p = window.getPost(postId);
  const h = p ? window.HUE_DATA[p.hue] : null;
  const a = p ? window.getAuthor(p.author) : null;
  const onEnter = e => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: r.left,
      y: r.bottom + 6
    });
    setShow(true);
  };
  if (!p) return /*#__PURE__*/React.createElement("span", {
    className: className
  }, children);
  return /*#__PURE__*/React.createElement("span", {
    className: `post-hover-link ${className}`,
    ref: ref,
    onMouseEnter: onEnter,
    onMouseLeave: () => setShow(false),
    onClick: () => onNav('blog-post', {
      id: postId
    })
  }, children, show && /*#__PURE__*/React.createElement("span", {
    className: "post-hover-card",
    style: {
      left: pos.x,
      top: pos.y,
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "phc-cover"
  }, /*#__PURE__*/React.createElement(BlogCover, {
    shape: p.coverShape,
    hue: p.hue,
    size: "sm"
  })), /*#__PURE__*/React.createElement("span", {
    className: "phc-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "phc-cat mono"
  }, window.HUE_DATA[p.hue].name.toUpperCase(), " \xB7 ", p.format.toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "phc-title"
  }, p.title), /*#__PURE__*/React.createElement("span", {
    className: "phc-meta mono"
  }, a?.name, " \xB7 ", p.readMin, " min read"))));
};

// ─── Post card (used in rails + grids) ─────────────
const PostCard = ({
  post,
  onNav,
  layout = 'std'
}) => {
  const h = window.HUE_DATA[post.hue];
  const a = window.getAuthor(post.author);
  return /*#__PURE__*/React.createElement("article", {
    className: `post-card pc-${layout}`,
    onClick: () => onNav('blog-post', {
      id: post.id
    }),
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-cover-wrap"
  }, /*#__PURE__*/React.createElement(BlogCover, {
    shape: post.coverShape,
    hue: post.hue,
    size: layout === 'feature' ? 'lg' : 'md'
  }), /*#__PURE__*/React.createElement("div", {
    className: "pc-format mono"
  }, post.format)), /*#__PURE__*/React.createElement("div", {
    className: "pc-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-meta mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pc-cat",
    style: {
      color: h.color
    }
  }, h.name.toUpperCase()), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, post.readMin, " min"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, window.fromNow(post.date))), /*#__PURE__*/React.createElement("h3", {
    className: "pc-title"
  }, post.title), layout !== 'mini' && /*#__PURE__*/React.createElement("p", {
    className: "pc-deck"
  }, post.deck), /*#__PURE__*/React.createElement("div", {
    className: "pc-foot"
  }, /*#__PURE__*/React.createElement(AuthorByline, {
    authorId: post.author,
    onNav: onNav,
    mini: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "pc-tags"
  }, post.tags.slice(0, 2).map(t => /*#__PURE__*/React.createElement(TagChip, {
    key: t,
    tag: t,
    hue: post.hue,
    sm: true
  }))))));
};

// ─── Reading-config tweaks (in-blog only) ────────────
// Reads from sessionStorage so toggling persists across pages but is blog-scoped.
const useReadingPrefs = () => {
  const [prefs, setPrefs] = useState(() => {
    try {
      const saved = sessionStorage.getItem('blog-prefs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      theme: 'dark',
      width: 'narrow'
    };
  });
  useEffect(() => {
    try {
      sessionStorage.setItem('blog-prefs', JSON.stringify(prefs));
    } catch (e) {}
    document.documentElement.setAttribute('data-blog-theme', prefs.theme);
    document.documentElement.setAttribute('data-blog-width', prefs.width);
    return () => {
      document.documentElement.removeAttribute('data-blog-theme');
      document.documentElement.removeAttribute('data-blog-width');
    };
  }, [prefs.theme, prefs.width]);
  return [prefs, setPrefs];
};
const ReadingControls = ({
  prefs,
  setPrefs
}) => /*#__PURE__*/React.createElement("div", {
  className: "reading-controls",
  role: "group",
  "aria-label": "Reading preferences"
}, /*#__PURE__*/React.createElement("button", {
  className: `rc-btn ${prefs.theme === 'dark' ? 'on' : ''}`,
  onClick: () => setPrefs(p => ({
    ...p,
    theme: 'dark'
  })),
  title: "Dark theme"
}, "\u25D1"), /*#__PURE__*/React.createElement("button", {
  className: `rc-btn ${prefs.theme === 'light' ? 'on' : ''}`,
  onClick: () => setPrefs(p => ({
    ...p,
    theme: 'light'
  })),
  title: "Light theme"
}, "\u2600"), /*#__PURE__*/React.createElement("span", {
  className: "rc-sep",
  "aria-hidden": true
}), /*#__PURE__*/React.createElement("button", {
  className: `rc-btn rc-text ${prefs.width === 'narrow' ? 'on' : ''}`,
  onClick: () => setPrefs(p => ({
    ...p,
    width: 'narrow'
  })),
  title: "Narrow column"
}, "narrow"), /*#__PURE__*/React.createElement("button", {
  className: `rc-btn rc-text ${prefs.width === 'wide' ? 'on' : ''}`,
  onClick: () => setPrefs(p => ({
    ...p,
    width: 'wide'
  })),
  title: "Wide column"
}, "wide"));
Object.assign(window, {
  BlogCover,
  TagChip,
  AuthorByline,
  PostHoverLink,
  PostCard,
  useReadingPrefs,
  ReadingControls
});