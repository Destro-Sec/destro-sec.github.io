// blog-author.jsx — Author page with rich data + interactions

const BlogAuthorPage = ({ onNav, authorId }) => {
  const [prefs, setPrefs] = window.useReadingPrefs();
  const a = window.getAuthor(authorId) || window.BLOG_AUTHORS[0];
  const allPosts = window.postsByAuthor(a.id);
  const h = window.HUE_DATA[a.vertical];

  const [filter, setFilter] = useState({ tag: null, year: null, format: null });
  const filtered = allPosts.filter(p =>
    (!filter.tag || p.tags.includes(filter.tag)) &&
    (!filter.year || new Date(p.date).getFullYear() === filter.year) &&
    (!filter.format || p.format === filter.format)
  );

  const tags = Array.from(new Set(allPosts.flatMap(p => p.tags))).sort();
  const years = Array.from(new Set(allPosts.map(p => new Date(p.date).getFullYear()))).sort((x,y) => y-x);
  const formats = Array.from(new Set(allPosts.map(p => p.format)));

  return (
    <div className="page blog-author" style={{ '--h': h.color, '--hr': h.rgb }}>
      <div className="ba-glow" style={{ background: `radial-gradient(circle at 30% 0%, rgba(${h.rgb}, 0.15) 0%, transparent 50%)` }}/>

      <div className="container bp-toolbar-row">
        <button className="back-link" onClick={() => onNav('blog')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          All authors
        </button>
        <window.ReadingControls prefs={prefs} setPrefs={setPrefs}/>
      </div>

      <div className="container ba-layout">
        {/* ── Sticky bio sidebar ─── */}
        <aside className="ba-sidebar">
          <div className="ba-sticky">
            <AuthorAvatar author={a} size={140}/>
            <div className="ba-name">{a.name}</div>
            <div className="ba-role mono">{a.role}</div>
            {a.type === 'guest' && <div className="ba-guest mono">GUEST CONTRIBUTOR</div>}
            <p className="ba-bio">{a.bio}</p>

            <div className="ba-meta">
              <div className="ba-meta-row"><span className="mono">PRONOUNS</span><span>{a.pronouns}</span></div>
              <div className="ba-meta-row"><span className="mono">BASED IN</span><span>{a.location}</span></div>
              <div className="ba-meta-row"><span className="mono">JOINED</span><span>{a.joined}</span></div>
              <div className="ba-meta-row"><span className="mono">SITE</span><a href="#" onClick={e => e.preventDefault()}>{a.site}</a></div>
            </div>

            <div className="ba-stats">
              <div><div className="ba-stat-n">{allPosts.length}</div><div className="ba-stat-l mono">posts</div></div>
              <div><div className="ba-stat-n">{a.talks.length}</div><div className="ba-stat-l mono">talks</div></div>
              <div><div className="ba-stat-n">{a.projects.length}</div><div className="ba-stat-l mono">projects</div></div>
            </div>

            {a.type !== 'guest' && (
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={() => onNav('team', { id: a.id })}>
                Full team profile →
              </button>
            )}
          </div>
        </aside>

        {/* ── Main content ─── */}
        <div className="ba-main">
          {/* Heatmap + topic donut */}
          <section className="ba-row-stats">
            <div className="ba-card glass">
              <div className="ba-card-head">
                <h3 className="ba-card-title">Writing activity</h3>
                <span className="mono ba-card-meta">last 12 months</span>
              </div>
              <ActivityHeatmap posts={allPosts} hue={a.vertical}/>
            </div>
            <div className="ba-card glass">
              <div className="ba-card-head">
                <h3 className="ba-card-title">Topic distribution</h3>
                <span className="mono ba-card-meta">{allPosts.length} posts</span>
              </div>
              <TopicDonut topics={a.topics}/>
            </div>
          </section>

          {/* Posts with filters */}
          <section className="ba-section">
            <div className="ba-section-head">
              <h2 className="ba-section-title">Posts</h2>
              <span className="mono ba-section-count">{filtered.length} of {allPosts.length}</span>
            </div>

            <div className="ba-filters">
              <FilterGroup label="YEAR" options={years.map(y => ({ v: y, l: y }))} value={filter.year}
                onChange={v => setFilter(f => ({ ...f, year: v }))}/>
              <FilterGroup label="FORMAT" options={formats.map(f => ({ v: f, l: f }))} value={filter.format}
                onChange={v => setFilter(f => ({ ...f, format: v }))}/>
              <FilterGroup label="TAG" options={tags.map(t => ({ v: t, l: '#' + t }))} value={filter.tag}
                onChange={v => setFilter(f => ({ ...f, tag: v }))}/>
            </div>

            <Timeline posts={filtered} onNav={onNav}/>
          </section>

          {/* Talks */}
          {a.talks.length > 0 && (
            <section className="ba-section">
              <h2 className="ba-section-title">Talks & conferences</h2>
              <div className="ba-talks">
                {a.talks.map((t, i) => (
                  <div key={i} className="ba-talk" style={{ '--h': h.color, '--hr': h.rgb }}>
                    <div className="ba-talk-y mono">{t.year}</div>
                    <div className="ba-talk-body">
                      <div className="ba-talk-event mono" style={{ color: h.color }}>{t.event}</div>
                      <div className="ba-talk-title">{t.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {a.projects.length > 0 && (
            <section className="ba-section">
              <h2 className="ba-section-title">Tools & projects</h2>
              <div className="ba-projects">
                {a.projects.map(p => (
                  <a key={p.name} href="#" onClick={e => e.preventDefault()} className="ba-project" style={{ '--h': h.color, '--hr': h.rgb }}>
                    <div className="ba-proj-head">
                      <span className="ba-proj-icon mono" style={{ color: h.color }}>◇</span>
                      <span className="ba-proj-name mono">{p.name}</span>
                    </div>
                    <p className="ba-proj-desc">{p.desc}</p>
                    <div className="ba-proj-meta mono">
                      <span>{p.lang}</span>
                      <span>★ {p.stars}</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Other authors */}
      <section className="container ba-others">
        <h2 className="ba-section-title">Others writing here</h2>
        <div className="ba-others-grid">
          {window.BLOG_AUTHORS.filter(o => o.id !== a.id).slice(0, 5).map(o => (
            <button key={o.id} className="ba-other" onClick={() => onNav('blog-author', { id: o.id })}
              style={{ '--h': window.HUE_DATA[o.vertical].color, '--hr': window.HUE_DATA[o.vertical].rgb }}>
              <AuthorAvatar author={o} size={48}/>
              <div className="ba-other-info">
                <div className="ba-other-name">{o.name}</div>
                <div className="ba-other-role mono">{o.role}</div>
              </div>
              <div className="ba-other-count mono">{window.postsByAuthor(o.id).length} posts</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

// ─── Avatar ────────────────────────────────────
const AuthorAvatar = ({ author, size = 80 }) => {
  const h = window.HUE_DATA[author.vertical];
  const initials = author.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  return (
    <div className="ba-avatar" style={{
      width: size, height: size,
      background: `linear-gradient(135deg, ${h.color}40, var(--color-bg-elevated))`,
      color: h.color,
      fontSize: size * 0.32
    }}>
      <div className="ba-avatar-grid"/>
      {initials}
    </div>
  );
};

// ─── Activity heatmap (GitHub-style) ──────────
const ActivityHeatmap = ({ posts, hue }) => {
  const h = window.HUE_DATA[hue];
  const today = new Date();
  // 52 weeks × 7 days
  const cells = [];
  for (let w = 51; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      cells.push({ date, count: 0, posts: [] });
    }
  }
  // Seed activity: post days = 4, ±3 days = 1-2 (drafting)
  posts.forEach(p => {
    const pd = new Date(p.date);
    cells.forEach(c => {
      const diff = Math.abs((c.date - pd) / 86400000);
      if (diff < 1) { c.count = Math.max(c.count, 4); c.posts.push(p); }
      else if (diff < 4) c.count = Math.max(c.count, 2);
      else if (diff < 8) c.count = Math.max(c.count, 1);
    });
  });
  // Sprinkle some baseline noise so the heatmap looks alive
  cells.forEach((c, i) => { if (c.count === 0 && (i * 7919) % 23 < 3) c.count = 1; });

  const monthLabels = [];
  let lastMonth = -1;
  cells.forEach((c, i) => {
    if (i % 7 === 0) {
      const m = c.date.getMonth();
      if (m !== lastMonth && c.date.getDate() <= 7) {
        monthLabels.push({ idx: i / 7, label: c.date.toLocaleString('en', { month: 'short' }) });
        lastMonth = m;
      }
    }
  });

  return (
    <div className="ah-wrap">
      <div className="ah-months mono">
        {monthLabels.map(m => (
          <span key={m.idx} style={{ left: `${m.idx * 14 + 2}px` }}>{m.label}</span>
        ))}
      </div>
      <div className="ah-grid">
        {Array.from({ length: 52 }).map((_, w) => (
          <div key={w} className="ah-col">
            {Array.from({ length: 7 }).map((_, d) => {
              const cell = cells[w * 7 + d];
              const count = cell.count;
              const op = count === 0 ? 0.06 : 0.18 + count * 0.18;
              const title = `${cell.date.toDateString()} — ${count === 4 ? 'published' : count >= 2 ? 'drafting' : count === 1 ? 'editing' : 'no activity'}`;
              return (
                <div key={d} className="ah-cell" title={title}
                  style={{ background: count === 0 ? `rgba(255,255,255,${op})` : `rgba(${h.rgb}, ${op})`,
                           border: cell.posts.length ? `1px solid ${h.color}` : 'none' }}/>
              );
            })}
          </div>
        ))}
      </div>
      <div className="ah-legend mono">
        <span>Less</span>
        {[0.06, 0.36, 0.54, 0.72, 0.9].map((op, i) => (
          <div key={i} className="ah-cell" style={{ background: i === 0 ? `rgba(255,255,255,${op})` : `rgba(${h.rgb}, ${op})` }}/>
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

// ─── Topic donut ────────────────────────────
const TopicDonut = ({ topics }) => {
  const entries = Object.entries(topics).filter(([, v]) => v > 0);
  const r = 60;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="td-wrap">
      <svg width="160" height="160" viewBox="-80 -80 160 160" className="td-svg">
        <circle r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20"/>
        {entries.map(([k, v]) => {
          const len = (v / 100) * C;
          const dasharray = `${len} ${C - len}`;
          const dashoffset = -acc;
          acc += len;
          const color = window.HUE_DATA[k]?.color || '#888';
          return (
            <circle key={k} r={r} fill="none" stroke={color} strokeWidth="20"
              strokeDasharray={dasharray} strokeDashoffset={dashoffset}
              transform="rotate(-90)"/>
          );
        })}
        <text textAnchor="middle" y="-6" className="td-num" fontFamily="var(--font-display)" fontSize="22" fill="currentColor" fontWeight="600">{entries.length}</text>
        <text textAnchor="middle" y="14" fontFamily="var(--font-mono)" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="0.1em">TOPICS</text>
      </svg>
      <div className="td-legend">
        {entries.map(([k, v]) => (
          <div key={k} className="td-row">
            <span className="td-dot" style={{ background: window.HUE_DATA[k]?.color }}/>
            <span className="td-k">{window.HUE_DATA[k]?.name || k}</span>
            <span className="td-v mono">{v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Filter group ────────────────────────────
const FilterGroup = ({ label, options, value, onChange }) => (
  <div className="ba-fg">
    <span className="ba-fg-l mono">{label}</span>
    <button className={`ba-fg-opt ${value === null ? 'on' : ''}`} onClick={() => onChange(null)}>all</button>
    {options.map(o => (
      <button key={o.v} className={`ba-fg-opt ${value === o.v ? 'on' : ''}`} onClick={() => onChange(value === o.v ? null : o.v)}>{o.l}</button>
    ))}
  </div>
);

// ─── Timeline of posts ────────────────────────
const Timeline = ({ posts, onNav }) => {
  if (posts.length === 0) {
    return <div className="ba-empty mono">No posts match these filters.</div>;
  }
  // Group by year
  const grouped = posts.reduce((acc, p) => {
    const y = new Date(p.date).getFullYear();
    (acc[y] = acc[y] || []).push(p);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a,b) => b - a);
  return (
    <div className="ba-timeline">
      {years.map(y => (
        <div key={y} className="ba-tl-year">
          <div className="ba-tl-y-label mono">{y}</div>
          <div className="ba-tl-posts">
            {grouped[y].map(p => {
              const ph = window.HUE_DATA[p.hue];
              return (
                <button key={p.id} className="ba-tl-post" onClick={() => onNav('blog-post', { id: p.id })}
                  style={{ '--h': ph.color, '--hr': ph.rgb }}>
                  <div className="ba-tl-date mono">{new Date(p.date).toLocaleString('en', { month: 'short', day: 'numeric' })}</div>
                  <div className="ba-tl-bullet" style={{ background: ph.color }}/>
                  <div className="ba-tl-body">
                    <div className="ba-tl-row">
                      <span className="mono ba-tl-cat" style={{ color: ph.color }}>{ph.name.toUpperCase()}</span>
                      <span className="mono ba-tl-fmt">{p.format}</span>
                      <span className="mono ba-tl-read">{p.readMin} min</span>
                    </div>
                    <div className="ba-tl-title">{p.title}</div>
                    <div className="ba-tl-tags">
                      {p.tags.slice(0, 4).map(t => <window.TagChip key={t} tag={t} hue={p.hue} sm/>)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

window.BlogAuthorPage = BlogAuthorPage;
