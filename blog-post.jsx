// blog-post.jsx — Post page with 4 template variants

const BlogPostPage = ({ onNav, postId }) => {
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
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [post.id]);

  return (
    <div className="page blog-post" style={{ '--h': h.color, '--hr': h.rgb }}>
      <div className="bp-progress" style={{ width: `${progress}%`, background: h.color }}/>

      <div className="container bp-toolbar-row">
        <button className="back-link" onClick={() => onNav('blog')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          All posts
        </button>
        <window.ReadingControls prefs={prefs} setPrefs={setPrefs}/>
      </div>

      {/* Variant dispatch */}
      {post.format === 'technical' && <TechnicalPost post={post} author={author} coAuthors={coAuthors} onNav={onNav}/>}
      {post.format === 'launch'    && <LaunchPost    post={post} author={author} coAuthors={coAuthors} onNav={onNav}/>}
      {post.format === 'event'     && <EventPost     post={post} author={author} coAuthors={coAuthors} onNav={onNav}/>}
      {post.format === 'manifesto' && <ManifestoPost post={post} author={author} coAuthors={coAuthors} onNav={onNav}/>}
      {post.format === 'listicle'  && <TechnicalPost post={post} author={author} coAuthors={coAuthors} onNav={onNav}/>}

      <RelatedPosts posts={related} onNav={onNav}/>
    </div>
  );
};

// ════════════════════════════════════════════════════
// Variant 1 — TECHNICAL (long-form writeup, listicle)
// ════════════════════════════════════════════════════
const TechnicalPost = ({ post, author, coAuthors, onNav }) => {
  const h = window.HUE_DATA[post.hue];
  const sections = [
    { id: 'tldr', label: 'TL;DR' },
    { id: 'context', label: 'Context' },
    { id: 'discovery', label: 'Discovery' },
    { id: 'exploit', label: 'Exploitation' },
    { id: 'impact', label: 'Impact' },
    { id: 'fix', label: 'Mitigation' },
    { id: 'timeline', label: 'Disclosure timeline' }
  ];
  const [active, setActive] = useState('tldr');
  useEffect(() => {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [post.id]);

  return (
    <article className="container bp-tech">
      <header className="bp-head">
        <div className="bp-cat-row">
          <span className="chip" style={{ color: h.color, borderColor: `rgba(${h.rgb},0.4)`, background: `rgba(${h.rgb},0.08)` }}>
            <span className="dot"/>{h.name} \u00b7 {post.format.toUpperCase()}
          </span>
          {post.tags.slice(0, 3).map(t => <window.TagChip key={t} tag={t} hue={post.hue}/>)}
        </div>
        <h1 className="bp-h1">{post.title}</h1>
        <p className="bp-deck">{post.deck}</p>
        <div className="bp-byline-row">
          <window.AuthorByline authorId={author.id} onNav={onNav} withDate date={post.date}/>
          {coAuthors.map(c => <window.AuthorByline key={c.id} authorId={c.id} onNav={onNav}/>)}
          <span className="bp-read mono">{post.readMin} min read</span>
        </div>
      </header>

      <window.BlogCover shape={post.coverShape} hue={post.hue} size="lg"/>

      <div className="bp-layout">
        <aside className="bp-toc">
          <div className="bp-toc-label mono">CONTENTS</div>
          <ol className="bp-toc-list">
            {sections.map(s => (
              <li key={s.id} className={active === s.id ? 'active' : ''}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="bp-prose">
          <section id="tldr">
            <h2>TL;DR</h2>
            <p>A benign-looking SSR helper trusted server-supplied props verbatim. The deserialiser, fed JSON the helper rendered, accepted Buffer-wrapped values. A forgotten <code>/admin/preview</code> endpoint chained the two without auth. Three nothings became one shell.</p>
          </section>

          <section id="context">
            <h2>Context</h2>
            <p>The target was the customer-portal of a Fortune 500 SaaS — a Next.js app with a custom SSR helper that <em>everyone</em> was using because it was the only way to pass auth context cleanly between the BFF and the page renderer.<sup><a href="#fn-1">1</a></sup></p>
            <p>Engagement scope: full-coverage web app pen test, 4 weeks. Their previous vendor had cleared this app twice.</p>
          </section>

          <section id="discovery">
            <h2>Discovery</h2>
            <p>The first thing we noticed was an unusual prop on every server-rendered page: <code>__ssrCtx</code>. It was a base64-encoded blob the BFF passed in.</p>
            <CodeBlock title="curl probe" lang="bash">{`$ curl -s https://target/admin/preview \\
    -H "Cookie: session=guest" \\
    -d '{"slug":"home"}' | jq '.props.__ssrCtx' | head -c 80
"eyJ1aWQiOjEsInJvbGUiOiJndWVzdCIsImNzcmYiOiI..."`}</CodeBlock>
            <p>That was odd. <code>/admin/preview</code> shouldn't have been reachable as <code>guest</code>. It also shouldn't have been echoing back full SSR context. We had two findings before lunch.</p>
          </section>

          <section id="exploit">
            <h2>Exploitation</h2>
            <p>Chaining the three:</p>
            <ol>
              <li>Poison the prop with a Buffer-wrapped serialised object: <code>{`{"$$buffer": "..."}`}</code></li>
              <li>The deserialiser, looking for <code>$$buffer</code>, calls <code>Buffer.from(value, 'base64')</code> on attacker input.</li>
              <li><code>/admin/preview</code> renders the page server-side — and the rendered output triggers a downstream require chain that hits a vulnerable <code>vm</code> sandbox.</li>
            </ol>

            <PullQuote color={h.color} text={post.pull || 'If you can poison a prop, you can poison a render.'}/>

            <CodeBlock title="weaponised payload" lang="javascript">{`// payload.js — drops a webshell as www-data
const payload = {
  __ssrCtx: Buffer.from(JSON.stringify({
    "$$buffer": "<encoded require('child_process').exec(...)>"
  })).toString('base64')
};
fetch('/admin/preview', {
  method: 'POST',
  body: JSON.stringify({ slug: 'home', ctx: payload })
});`}</CodeBlock>
          </section>

          <section id="impact">
            <h2>Impact</h2>
            <ul>
              <li>RCE as <code>www-data</code> on the production web tier</li>
              <li>Lateral movement to the BFF via shared Redis (auth tokens cached cleartext)</li>
              <li>Read access to all customer support tickets and a sample of payment metadata</li>
            </ul>
          </section>

          <section id="fix">
            <h2>Mitigation</h2>
            <p>The vendor patched in 11 days. The fix:</p>
            <ul>
              <li>Block <code>$$</code>-prefixed keys at the deserialiser boundary</li>
              <li>Move <code>/admin/preview</code> behind the standard auth middleware</li>
              <li>Stop cacheing decoded auth tokens in Redis — issue per-request</li>
            </ul>
          </section>

          <section id="timeline">
            <h2>Disclosure timeline</h2>
            <table className="bp-timeline-table">
              <tbody>
                <tr><td className="mono">D+0</td><td>Initial report to security@</td></tr>
                <tr><td className="mono">D+2</td><td>Triage call \u00b7 confirmed</td></tr>
                <tr><td className="mono">D+11</td><td>Patch shipped</td></tr>
                <tr><td className="mono">D+45</td><td>CVE assigned, public writeup approved</td></tr>
              </tbody>
            </table>
          </section>

          <hr className="bp-rule"/>

          <ol className="bp-footnotes">
            <li id="fn-1"><span className="mono">1.</span> The "everyone uses it" anti-pattern is a leading indicator of a blast radius surprise. We have a separate post on this.</li>
          </ol>
        </div>
      </div>
    </article>
  );
};

// ════════════════════════════════════════════════════
// Variant 2 — LAUNCH (product/case study)
// ════════════════════════════════════════════════════
const LaunchPost = ({ post, author, coAuthors, onNav }) => {
  const h = window.HUE_DATA[post.hue];
  return (
    <article className="container bp-launch">
      <header className="bp-launch-head">
        <div className="bp-cat-row">
          <span className="chip" style={{ color: h.color, borderColor: `rgba(${h.rgb},0.4)`, background: `rgba(${h.rgb},0.08)` }}><span className="dot"/>LAUNCH \u00b7 {h.name.toUpperCase()}</span>
          {post.tags.slice(0, 3).map(t => <window.TagChip key={t} tag={t} hue={post.hue}/>)}
        </div>
        <h1 className="bp-h1 bp-launch-h1">{post.title}</h1>
        <p className="bp-deck">{post.deck}</p>
        <div className="bp-byline-row">
          <window.AuthorByline authorId={author.id} onNav={onNav} withDate date={post.date}/>
          {coAuthors.map(c => <window.AuthorByline key={c.id} authorId={c.id} onNav={onNav}/>)}
          <span className="bp-read mono">{post.readMin} min read</span>
        </div>
      </header>

      <div className="bp-launch-hero">
        <window.BlogCover shape={post.coverShape} hue={post.hue} size="lg"/>
        <div className="bp-launch-stats">
          {[
            { n: '4,200', l: 'GitHub stars · day one' },
            { n: '14', l: 'integrations included' },
            { n: '< 5min', l: 'self-host setup' },
            { n: 'MIT', l: 'license' }
          ].map(s => (
            <div key={s.l} className="bp-stat">
              <div className="bp-stat-n" style={{ color: h.color }}>{s.n}</div>
              <div className="bp-stat-l mono">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bp-prose bp-launch-prose">
        <h2>Why we built it</h2>
        <p>Internal tools are the dark matter of every company. Most of the work happens in dashboards and runbooks nobody outside the team sees — and most of those dashboards are stitched together from three SaaS subscriptions and a forgotten Notion page.</p>
        <p>We tried n8n. We tried Appsmith. We tried Retool. They each solved 60% of what we needed. M-Dash is the 100%, but it isn't a new product — it's how to wire the existing ones together so they stop fighting.</p>

        <PullQuote color={h.color} text={post.pull}/>

        <h2>What's in the box</h2>
        <FeatureGrid hue={post.hue} items={[
          { t: 'n8n at the back', d: 'All workflows, scheduled jobs, and webhooks. The work happens here.' },
          { t: 'Appsmith at the front', d: 'Dashboards, forms, and CRUD. The humans live here.' },
          { t: 'A thin glue layer', d: 'Auth, secrets, audit. The boring-but-critical stuff is ours.' },
          { t: 'Self-hosted by default', d: 'Docker compose, K8s helm chart, or one-line install. Your data, your box.' }
        ]}/>

        <h2>The first three integrations we shipped</h2>
        <ol>
          <li><strong>On-call rotation builder</strong> — pulls from PagerDuty + your calendar; flags conflicts.</li>
          <li><strong>Engagement tracker</strong> — pen-test scoping → SOW → invoice in one timeline.</li>
          <li><strong>Cohort dashboard</strong> — student progress across the 6-week bootcamp, filtered by week.</li>
        </ol>

        <h2>What's next</h2>
        <p>Roadmap is public. We're shipping the SSO module in May, and a CTF-platform integration before NullCon.</p>

        <div className="bp-cta-row">
          <a className="btn btn-primary btn-lg" href="#" onClick={e => e.preventDefault()}>Star on GitHub →</a>
          <a className="btn btn-secondary" href="#" onClick={e => e.preventDefault()}>Read the docs</a>
        </div>
      </div>
    </article>
  );
};

// ════════════════════════════════════════════════════
// Variant 3 — EVENT (photo essay / recap)
// ════════════════════════════════════════════════════
const EventPost = ({ post, author, coAuthors, onNav }) => {
  const h = window.HUE_DATA[post.hue];
  const photos = [
    { caption: 'The village setup, two hours before doors.', tag: 'D-1 · 06:00', shape: 'badge' },
    { caption: 'First wave of attendees. Network held.', tag: 'D+0 · 09:14', shape: 'grid' },
    { caption: 'Capture-the-flag finals. Three teams within 20 points.', tag: 'D+1 · 16:42', shape: 'terminal' },
    { caption: 'The accidental power outage. The CTF kept running on UPS.', tag: 'D+1 · 19:08', shape: 'lock' },
    { caption: 'Closing keynote, full house.', tag: 'D+2 · 17:30', shape: 'flag' },
    { caption: 'The cleanup crew. One of these is the founder.', tag: 'D+2 · 23:52', shape: 'shield' }
  ];
  return (
    <article className="container bp-event">
      <header className="bp-event-head">
        <div className="bp-cat-row">
          <span className="chip" style={{ color: h.color, borderColor: `rgba(${h.rgb},0.4)`, background: `rgba(${h.rgb},0.08)` }}><span className="dot"/>EVENT RECAP</span>
          {post.tags.slice(0, 3).map(t => <window.TagChip key={t} tag={t} hue={post.hue}/>)}
        </div>
        <h1 className="bp-h1">{post.title}</h1>
        <p className="bp-deck">{post.deck}</p>
        <div className="bp-byline-row">
          <window.AuthorByline authorId={author.id} onNav={onNav} withDate date={post.date}/>
          {coAuthors.map(c => <window.AuthorByline key={c.id} authorId={c.id} onNav={onNav}/>)}
          <span className="bp-read mono">{post.readMin} min read</span>
        </div>
        {post.series && <div className="bp-series mono" style={{ color: h.color }}>SERIES · {post.series}</div>}
      </header>

      <div className="bp-event-stats">
        {[
          { n: '800', l: 'attendees' },
          { n: '14', l: 'talks' },
          { n: '4', l: 'CTF teams' },
          { n: '1', l: 'unscheduled outage' }
        ].map(s => (
          <div key={s.l} className="bp-stat">
            <div className="bp-stat-n" style={{ color: h.color }}>{s.n}</div>
            <div className="bp-stat-l mono">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bp-prose bp-event-prose">
        <p>NullCon 2026 ran from March 28 to 30 in Goa. We powered the village this year — meaning we ran the network, the CTF infrastructure, and the badge auth. Here's how it went, with photos.</p>
        <PullQuote color={h.color} text={post.pull}/>
      </div>

      <div className="bp-photo-grid">
        {photos.map((p, i) => (
          <figure key={i} className="bp-photo">
            <window.BlogCover shape={p.shape} hue={post.hue} size="md"/>
            <figcaption>
              <span className="bp-photo-tag mono" style={{ color: h.color }}>{p.tag}</span>
              <span>{p.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="bp-prose bp-event-prose">
        <h2>The schedule, in one image</h2>
        <div className="bp-schedule">
          {[
            { d: 'Day 0', items: ['Setup', 'Opening keynote', 'Track A · Web', 'Track B · AD'] },
            { d: 'Day 1', items: ['Track A · Cloud', 'Track B · Mobile', 'CTF qualifiers', 'Lightning talks'] },
            { d: 'Day 2', items: ['Track A · IR', 'Track B · OT/ICS', 'CTF finals', 'Closing keynote'] }
          ].map(d => (
            <div key={d.d} className="bp-day">
              <div className="bp-day-h mono" style={{ color: h.color }}>{d.d}</div>
              {d.items.map(it => <div key={it} className="bp-day-row">{it}</div>)}
            </div>
          ))}
        </div>

        <h2>What we'd do differently</h2>
        <ul>
          <li>Run the UPS test the day before, not three weeks before.</li>
          <li>One more network engineer. The wifi melted at 14:00 on day one.</li>
          <li>Keep the CTF scoreboard out of the keynote room — it became more interesting than the keynote.</li>
        </ul>
      </div>
    </article>
  );
};

// ════════════════════════════════════════════════════
// Variant 4 — MANIFESTO (typographic, minimal)
// ════════════════════════════════════════════════════
const ManifestoPost = ({ post, author, coAuthors, onNav }) => {
  const h = window.HUE_DATA[post.hue];
  return (
    <article className="container bp-manifesto" style={{ '--h': h.color, '--hr': h.rgb }}>
      <header className="bp-mf-head">
        <div className="bp-mf-meta mono">
          <span style={{ color: h.color }}>★</span>
          <span>MANIFESTO</span>
          <span>·</span>
          <span>{window.formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readMin} min</span>
        </div>
        <h1 className="bp-mf-h1">{post.title}</h1>
      </header>

      <div className="bp-mf-body">
        <p className="bp-mf-lede">{post.deck}</p>

        <p>Three years ago, four of us started Destro Sec because the security industry was structured around vendors who couldn't talk to each other. The red team didn't read the codebase. The dev shop didn't know how it'd be attacked. The educators were a different vendor entirely.</p>

        <p>We bootstrapped through year one. Year two, we paid ourselves. Year three, we hit profitability and a waitlist. Now we're raising — a small seed, $1.8M — to do <em>more</em> of what's working, not to pivot into something else.</p>

        <PullQuote color={h.color} text={post.pull} large/>

        <h2 className="bp-mf-h2">Where it goes</h2>
        <ul className="bp-mf-list">
          <li><strong>60%</strong> — education. Free CTFs in 12 more cities. Scholarships that cover laptops, not just tuition.</li>
          <li><strong>25%</strong> — research. We want to publish four CVEs a year out of the team's own time, paid.</li>
          <li><strong>10%</strong> — better tooling. The internal stuff that lets two engineers do the work of five.</li>
          <li><strong>5%</strong> — operations. One more person on contracts so engineers stop reading SOWs.</li>
        </ul>

        <h2 className="bp-mf-h2">Where it doesn't go</h2>
        <ul className="bp-mf-list">
          <li>SDRs. We've never had one and we never will.</li>
          <li>"AI-powered" anything we don't build ourselves.</li>
          <li>A bigger office. The current one is fine.</li>
          <li>Booth swag.</li>
        </ul>

        <p className="bp-mf-sign">
          <span className="mono">— Meera, Aarav, Priya, Rohan</span>
        </p>

        <div className="bp-mf-cta">
          <button className="btn btn-primary btn-lg" onClick={() => onNav('contact')}>Talk to us about the round →</button>
        </div>
      </div>
    </article>
  );
};

// ─── Shared bits ───────────────────────────────
const CodeBlock = ({ title, lang, children }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div className="bp-code">
      <div className="bp-code-bar">
        <span className="bp-code-title mono">{title}</span>
        <span className="bp-code-lang mono">{lang}</span>
        <button className="bp-code-copy" onClick={copy}>{copied ? 'copied' : 'copy'}</button>
      </div>
      <pre className="mono"><code>{children}</code></pre>
    </div>
  );
};

const PullQuote = ({ text, color, large }) => (
  <blockquote className={`bp-pull ${large ? 'lg' : ''}`} style={{ borderLeftColor: color }}>
    <span className="bp-pull-mark" style={{ color }}>"</span>
    {text}
  </blockquote>
);

const FeatureGrid = ({ items, hue }) => {
  const h = window.HUE_DATA[hue];
  return (
    <div className="bp-fg" style={{ '--h': h.color, '--hr': h.rgb }}>
      {items.map(it => (
        <div key={it.t} className="bp-fg-item">
          <div className="bp-fg-t">{it.t}</div>
          <div className="bp-fg-d">{it.d}</div>
        </div>
      ))}
    </div>
  );
};

const RelatedPosts = ({ posts, onNav }) => (
  <section className="container bp-related">
    <h2 className="bh-shelf-title"><span className="mono">RELATED</span></h2>
    <div className="bh-grid">
      {posts.map(p => <window.PostCard key={p.id} post={p} onNav={onNav}/>)}
    </div>
  </section>
);

window.BlogPostPage = BlogPostPage;
