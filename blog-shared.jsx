// blog-shared.jsx — cover art generators, hover preview card, post card

// ─── Cover art ────────────────────────────────────
// Stylised SVG generative art per cover shape × hue.
const BlogCover = ({ shape = 'terminal', hue = 'security', size = 'md' }) => {
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
      return (
        <svg viewBox={dim} style={{ width: '100%', height: '100%' }} aria-hidden>
          <defs>
            <pattern id={`grid-${hue}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c} strokeOpacity="0.08" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${hue})`}/>
          <g fontFamily="ui-monospace, monospace" fontSize="13" fill={c}>
            <text x="24" y="34">$ ./react2shell.sh --target prod</text>
            <text x="24" y="58" fill="rgba(255,255,255,0.55)">[+] poisoning prop in render tree</text>
            <text x="24" y="78" fill="rgba(255,255,255,0.55)">[+] deserialiser confused</text>
            <text x="24" y="98" fill="rgba(255,255,255,0.55)">[+] /admin/preview reachable</text>
            <text x="24" y="122" fill={c}>[!] shell @ web-prod-04 :: uid=33(www-data)</text>
          </g>
          <rect x={w-150} y={ht-32} width="130" height="20" fill="none" stroke={c} strokeOpacity="0.4" strokeWidth="1" rx="4"/>
          <text x={w-140} y={ht-18} fontFamily="ui-monospace" fontSize="11" fill={c} opacity="0.75">CVE-2025-XXXXX</text>
        </svg>
      );
    }
    if (shape === 'editor') {
      return (
        <svg viewBox={dim} style={{ width: '100%', height: '100%' }} aria-hidden>
          <rect width="100%" height="28" fill={c} fillOpacity="0.12"/>
          <circle cx="14" cy="14" r="4" fill="#ff6b6b"/>
          <circle cx="28" cy="14" r="4" fill="#ffd166"/>
          <circle cx="42" cy="14" r="4" fill="#06d6a0"/>
          <text x="64" y="18" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.55)">m-dash · src/dashboard.tsx</text>
          {Array.from({ length: 8 }).map((_, i) => {
            const widths = [60, 130, 90, 200, 110, 160, 80, 140];
            return <rect key={i} x="24" y={56 + i*18} width={widths[i]} height="6" fill={c} opacity={0.15 + (i%3)*0.15} rx="2"/>
          })}
          <rect x="220" y="56" width="80" height="6" fill={c} opacity="0.5" rx="2"/>
          <rect x="280" y="92" width="60" height="6" fill={c} opacity="0.7" rx="2"/>
        </svg>
      );
    }
    if (shape === 'lock') {
      return (
        <svg viewBox={dim} style={{ width: '100%', height: '100%' }} aria-hidden>
          <g transform={`translate(${w/2 - 60}, ${ht/2 - 60})`}>
            <rect x="20" y="50" width="80" height="60" fill="none" stroke={c} strokeWidth="2" rx="6"/>
            <path d="M35 50 V35 a25 25 0 0 1 50 0 V50" fill="none" stroke={c} strokeWidth="2"/>
            <circle cx="60" cy="80" r="6" fill={c}/>
            <line x1="60" y1="86" x2="60" y2="98" stroke={c} strokeWidth="2"/>
          </g>
          <line x1={w/2 + 20} y1={ht/2 - 40} x2={w/2 + 80} y2={ht/2 + 40} stroke={c} strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
        </svg>
      );
    }
    if (shape === 'shield') {
      return (
        <svg viewBox={dim} style={{ width: '100%', height: '100%' }} aria-hidden>
          <g transform={`translate(${w/2 - 50}, ${ht/2 - 60}) scale(1)`}>
            <path d="M50 5 L95 25 V60 Q95 95 50 115 Q5 95 5 60 V25 Z" fill="none" stroke={c} strokeWidth="2"/>
            <path d="M50 25 L75 38 V62 Q75 82 50 95 Q25 82 25 62 V38 Z" fill={c} fillOpacity="0.12"/>
            <text x="50" y="68" fontFamily="ui-monospace" fontSize="13" fill={c} textAnchor="middle">DPDPA</text>
          </g>
        </svg>
      );
    }
    if (shape === 'grid') {
      return (
        <svg viewBox={dim} style={{ width: '100%', height: '100%' }} aria-hidden>
          {Array.from({ length: 11 }).map((_, i) => (
            <rect key={i} x={20 + (i%6)*72} y={20 + Math.floor(i/6)*90} width="60" height="78"
                  fill={c} fillOpacity={0.08 + (i%3)*0.1} stroke={c} strokeOpacity="0.3" strokeWidth="1" rx="4"/>
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <text key={`t-${i}`} x={50 + (i%6)*72} y={62 + Math.floor(i/6)*90}
                  fontFamily="ui-monospace" fontSize="9" fill={c} textAnchor="middle">CVE</text>
          ))}
        </svg>
      );
    }
    if (shape === 'badge') {
      return (
        <svg viewBox={dim} style={{ width: '100%', height: '100%' }} aria-hidden>
          <g transform={`translate(${w/2 - 70}, ${ht/2 - 70})`}>
            <polygon points="70,10 130,40 130,100 70,130 10,100 10,40" fill="none" stroke={c} strokeWidth="2"/>
            <polygon points="70,30 110,50 110,90 70,110 30,90 30,50" fill={c} fillOpacity="0.12"/>
            <text x="70" y="68" fontFamily="ui-monospace" fontSize="13" fill={c} textAnchor="middle" fontWeight="600">NULLCON</text>
            <text x="70" y="86" fontFamily="ui-monospace" fontSize="10" fill={c} textAnchor="middle" opacity="0.7">2026</text>
          </g>
        </svg>
      );
    }
    if (shape === 'flag') {
      return (
        <svg viewBox={dim} style={{ width: '100%', height: '100%' }} aria-hidden>
          <line x1="40" y1="20" x2="40" y2={ht-20} stroke={c} strokeWidth="2"/>
          <path d={`M40 30 L${w-60} 30 L${w-90} 60 L${w-60} 90 L40 90 Z`} fill={c} fillOpacity="0.18" stroke={c} strokeWidth="2"/>
          <text x="60" y="68" fontFamily="ui-monospace" fontSize="14" fill={c}>raise / build / teach</text>
        </svg>
      );
    }
    return null;
  };

  return <div className="bc-wrap" style={wrapStyle}>{renderShape()}</div>;
};

// ─── Tag chip ─────────────────────────────────────
const TagChip = ({ tag, hue = 'security', sm = false, onClick }) => {
  const h = window.HUE_DATA[hue] || window.HUE_DATA.security;
  return (
    <span className={`tag-chip ${sm ? 'sm' : ''}`} onClick={onClick}
      style={{ '--h': h.color, '--hr': h.rgb }}>{tag}</span>
  );
};

// ─── Author chip + hover preview card ─────────────
const AuthorByline = ({ authorId, onNav, withDate, date, mini }) => {
  const a = window.getAuthor(authorId);
  if (!a) return null;
  const h = window.HUE_DATA[a.vertical];
  const initials = a.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  return (
    <button className={`author-byline ${mini ? 'mini' : ''}`} onClick={(e) => { e.stopPropagation(); onNav('blog-author', { id: a.id }); }}>
      <span className="ab-avatar" style={{ background: `linear-gradient(135deg, ${h.color}40, var(--color-bg-elevated))`, color: h.color }}>{initials}</span>
      <span className="ab-name">{a.name}</span>
      {a.type === 'guest' && <span className="ab-guest mono">GUEST</span>}
      {withDate && date && <span className="ab-date mono">{window.formatDate(date)} \u00b7 {window.fromNow(date)}</span>}
    </button>
  );
};

// ─── Hover-preview post link ──────────────────────
// Wraps any content; on hover, shows a compact post preview floating beside the cursor.
const PostHoverLink = ({ postId, onNav, children, className = '' }) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const p = window.getPost(postId);
  const h = p ? window.HUE_DATA[p.hue] : null;
  const a = p ? window.getAuthor(p.author) : null;

  const onEnter = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: r.left, y: r.bottom + 6 });
    setShow(true);
  };
  if (!p) return <span className={className}>{children}</span>;

  return (
    <span className={`post-hover-link ${className}`} ref={ref}
          onMouseEnter={onEnter} onMouseLeave={() => setShow(false)}
          onClick={() => onNav('blog-post', { id: postId })}>
      {children}
      {show && (
        <span className="post-hover-card" style={{ left: pos.x, top: pos.y, '--h': h.color, '--hr': h.rgb }}>
          <span className="phc-cover"><BlogCover shape={p.coverShape} hue={p.hue} size="sm"/></span>
          <span className="phc-body">
            <span className="phc-cat mono">{window.HUE_DATA[p.hue].name.toUpperCase()} \u00b7 {p.format.toUpperCase()}</span>
            <span className="phc-title">{p.title}</span>
            <span className="phc-meta mono">{a?.name} \u00b7 {p.readMin} min read</span>
          </span>
        </span>
      )}
    </span>
  );
};

// ─── Post card (used in rails + grids) ─────────────
const PostCard = ({ post, onNav, layout = 'std' }) => {
  const h = window.HUE_DATA[post.hue];
  const a = window.getAuthor(post.author);
  return (
    <article className={`post-card pc-${layout}`} onClick={() => onNav('blog-post', { id: post.id })}
             style={{ '--h': h.color, '--hr': h.rgb }}>
      <div className="pc-cover-wrap">
        <BlogCover shape={post.coverShape} hue={post.hue} size={layout === 'feature' ? 'lg' : 'md'}/>
        <div className="pc-format mono">{post.format}</div>
      </div>
      <div className="pc-body">
        <div className="pc-meta mono">
          <span className="pc-cat" style={{ color: h.color }}>{h.name.toUpperCase()}</span>
          <span>\u00b7</span>
          <span>{post.readMin} min</span>
          <span>\u00b7</span>
          <span>{window.fromNow(post.date)}</span>
        </div>
        <h3 className="pc-title">{post.title}</h3>
        {layout !== 'mini' && <p className="pc-deck">{post.deck}</p>}
        <div className="pc-foot">
          <AuthorByline authorId={post.author} onNav={onNav} mini/>
          <div className="pc-tags">{post.tags.slice(0, 2).map(t => <TagChip key={t} tag={t} hue={post.hue} sm/>)}</div>
        </div>
      </div>
    </article>
  );
};

// ─── Reading-config tweaks (in-blog only) ────────────
// Reads from sessionStorage so toggling persists across pages but is blog-scoped.
const useReadingPrefs = () => {
  const [prefs, setPrefs] = useState(() => {
    try {
      const saved = sessionStorage.getItem('blog-prefs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { theme: 'dark', width: 'narrow' };
  });
  useEffect(() => {
    try { sessionStorage.setItem('blog-prefs', JSON.stringify(prefs)); } catch (e) {}
    document.documentElement.setAttribute('data-blog-theme', prefs.theme);
    document.documentElement.setAttribute('data-blog-width', prefs.width);
    return () => {
      document.documentElement.removeAttribute('data-blog-theme');
      document.documentElement.removeAttribute('data-blog-width');
    };
  }, [prefs.theme, prefs.width]);
  return [prefs, setPrefs];
};

const ReadingControls = ({ prefs, setPrefs }) => (
  <div className="reading-controls" role="group" aria-label="Reading preferences">
    <button className={`rc-btn ${prefs.theme === 'dark' ? 'on' : ''}`} onClick={() => setPrefs(p => ({ ...p, theme: 'dark' }))} title="Dark theme">\u25D1</button>
    <button className={`rc-btn ${prefs.theme === 'light' ? 'on' : ''}`} onClick={() => setPrefs(p => ({ ...p, theme: 'light' }))} title="Light theme">\u2600</button>
    <span className="rc-sep" aria-hidden/>
    <button className={`rc-btn rc-text ${prefs.width === 'narrow' ? 'on' : ''}`} onClick={() => setPrefs(p => ({ ...p, width: 'narrow' }))} title="Narrow column">narrow</button>
    <button className={`rc-btn rc-text ${prefs.width === 'wide' ? 'on' : ''}`} onClick={() => setPrefs(p => ({ ...p, width: 'wide' }))} title="Wide column">wide</button>
  </div>
);

Object.assign(window, { BlogCover, TagChip, AuthorByline, PostHoverLink, PostCard, useReadingPrefs, ReadingControls });
