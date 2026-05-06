// blog-home.jsx — Categorized rails landing page

const BlogHomePage = ({ onNav }) => {
  const [prefs, setPrefs] = window.useReadingPrefs();
  const [tagFilter, setTagFilter] = useState(null);

  const featured = window.BLOG_POSTS.find(p => p.featured && p.category === 'security');
  const sponsorPost = window.BLOG_POSTS.find(p => p.sponsor);

  const allTags = Array.from(new Set(window.BLOG_POSTS.flatMap(p => p.tags))).sort();
  const filteredPosts = tagFilter
    ? window.BLOG_POSTS.filter(p => p.tags.includes(tagFilter))
    : null;

  const shelves = [
    { id: 'security',  label: 'Security',  hue: 'security',  desc: 'Writeups, CVEs, red team field notes.' },
    { id: 'software',  label: 'Software',  hue: 'software',  desc: 'Builds, launches, and architecture posts.' },
    { id: 'education', label: 'Education', hue: 'education', desc: 'Cohort recaps, CTFs, learning logs.' },
    { id: 'company',   label: 'Opinion & Company', hue: 'opinion',   desc: 'Manifestos, fundraises, and craft.' }
  ];

  return (
    <div className="page blog-home">
      <BlogHero onNav={onNav} featured={featured} sponsorPost={sponsorPost}/>

      <div className="container">
        <div className="bh-toolbar">
          <div className="bh-tags">
            <button className={`bh-tag ${tagFilter === null ? 'on' : ''}`} onClick={() => setTagFilter(null)}>All</button>
            {['CVE','Tutorial','Case Study','CTF','Launch','Manifesto'].map(t => (
              <button key={t} className={`bh-tag ${tagFilter === t ? 'on' : ''}`} onClick={() => setTagFilter(tagFilter === t ? null : t)}>#{t}</button>
            ))}
          </div>
          <window.ReadingControls prefs={prefs} setPrefs={setPrefs}/>
        </div>

        {filteredPosts ? (
          <section className="bh-filtered">
            <h2 className="bh-shelf-title">
              <span className="mono">FILTERED · #{tagFilter}</span>
              <span className="bh-count mono">{filteredPosts.length} posts</span>
            </h2>
            <div className="bh-grid">
              {filteredPosts.map(p => <window.PostCard key={p.id} post={p} onNav={onNav}/>)}
            </div>
          </section>
        ) : (
          shelves.map(s => <Shelf key={s.id} shelf={s} onNav={onNav}/>)
        )}

        {!filteredPosts && (
          <section className="bh-archive">
            <h2 className="bh-shelf-title"><span className="mono">ARCHIVE</span></h2>
            <div className="bh-archive-list">
              {window.BLOG_POSTS.map(p => <ArchiveRow key={p.id} post={p} onNav={onNav}/>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// ─── Hero (featured + sponsor card) ────────────
const BlogHero = ({ onNav, featured, sponsorPost }) => {
  const fh = window.HUE_DATA[featured?.hue || 'security'];
  return (
    <section className="bh-hero">
      <div className="container">
        <div className="bh-hero-head">
          <span className="eyebrow">FIELD NOTES</span>
          <h1 className="bh-h1">Things we broke, built,<br/>or learned out loud.</h1>
          <p className="lead bh-lead">Writeups, launches, and recaps from the people running the engagements. Updated when there's something to say — not on a content calendar.</p>
        </div>

        {featured && (
          <div className="bh-featured-grid">
            <article className="bh-feature" onClick={() => onNav('blog-post', { id: featured.id })}
              style={{ '--h': fh.color, '--hr': fh.rgb }}>
              <div className="bh-feature-cover">
                <window.BlogCover shape={featured.coverShape} hue={featured.hue} size="lg"/>
                <div className="bh-feature-pin mono">FEATURED · {fh.name.toUpperCase()}</div>
              </div>
              <div className="bh-feature-body">
                <h2 className="bh-feature-title">{featured.title}</h2>
                <p className="bh-feature-deck">{featured.deck}</p>
                <div className="bh-feature-meta">
                  <window.AuthorByline authorId={featured.author} onNav={onNav} withDate date={featured.date}/>
                  <span className="mono bh-feature-read">{featured.readMin} min read</span>
                </div>
              </div>
            </article>

            {sponsorPost && (
              <aside className="bh-sponsor" style={{ '--h': window.HUE_DATA[sponsorPost.hue].color, '--hr': window.HUE_DATA[sponsorPost.hue].rgb }}>
                <div className="bh-sponsor-tag mono">FROM DESTRO SEC</div>
                <h3 className="bh-sponsor-title" onClick={() => onNav('blog-post', { id: sponsorPost.id })}>{sponsorPost.title}</h3>
                <p className="bh-sponsor-deck">{sponsorPost.deck}</p>
                <button className="btn btn-primary btn-sm" onClick={() => onNav('blog-post', { id: sponsorPost.id })}>Read the manifesto →</button>
                <div className="bh-sponsor-pulse" aria-hidden/>
              </aside>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Category shelf ────────────────────────────
const Shelf = ({ shelf, onNav }) => {
  const posts = shelf.id === 'company'
    ? window.BLOG_POSTS.filter(p => p.category === 'company')
    : window.postsByCategory(shelf.id);
  const h = window.HUE_DATA[shelf.hue];
  if (posts.length === 0) return null;

  return (
    <section className="bh-shelf" style={{ '--h': h.color, '--hr': h.rgb }}>
      <div className="bh-shelf-head">
        <h2 className="bh-shelf-title">
          <span className="bh-shelf-dot" style={{ background: h.color }}/>
          <span className="bh-shelf-label">{shelf.label}</span>
          <span className="bh-shelf-desc">{shelf.desc}</span>
        </h2>
        <span className="mono bh-shelf-count">{posts.length} posts</span>
      </div>
      <div className="bh-shelf-rail">
        {posts.map(p => <window.PostCard key={p.id} post={p} onNav={onNav}/>)}
      </div>
    </section>
  );
};

// ─── Archive row ──────────────────────────────
const ArchiveRow = ({ post, onNav }) => {
  const h = window.HUE_DATA[post.hue];
  const a = window.getAuthor(post.author);
  return (
    <button className="archive-row" onClick={() => onNav('blog-post', { id: post.id })}
      style={{ '--h': h.color, '--hr': h.rgb }}>
      <span className="ar-date mono">{window.formatDate(post.date)}</span>
      <span className="ar-cat mono" style={{ color: h.color }}>{h.name.toUpperCase()}</span>
      <span className="ar-title">{post.title}</span>
      <span className="ar-author mono">{a?.name}</span>
      <span className="ar-read mono">{post.readMin}\u2032</span>
    </button>
  );
};

window.BlogHomePage = BlogHomePage;
