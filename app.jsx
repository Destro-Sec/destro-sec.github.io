// app.jsx — Main app shell, routing, tweaks, SEO

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentIntensity": 1,
  "glowIntensity": 1,
  "scrollAnim": true,
  "cuboidStyle": "depth"
}/*EDITMODE-END*/;

const BASE_URL  = 'https://destrosec.com';
const OG_IMAGE  = `${BASE_URL}/assets/og-image.png`;
const SITE_NAME = 'Destro Sec';

// ─── Meta helpers ────────────────────────────────────────────────────────────
function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function updateMeta({ title, description, url, image = OG_IMAGE, type = 'website' }) {
  document.title = title;
  setMeta('name',     'description',    description);
  setMeta('property', 'og:title',       title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url',         url);
  setMeta('property', 'og:image',       image);
  setMeta('property', 'og:type',        type);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = url;
}

function updateSchema(schema) {
  let el = document.getElementById('page-schema');
  if (!el) {
    el = document.createElement('script');
    el.id   = 'page-schema';
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
}

// ─── Breadcrumb helper ───────────────────────────────────────────────────────
function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, url], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url
    }))
  };
}

// ─── Per-route SEO config ────────────────────────────────────────────────────
function getPageSEO(page, params) {
  const base = BASE_URL;

  switch (page) {
    case 'home':
      return {
        meta: {
          title: 'Destro Sec — Built For Break In',
          description: 'Security consulting, software development, and hands-on education from operators who think like attackers. Pen tests, red team, CTFs — based in Bangalore.',
          url: `${base}/`
        },
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: base,
            name: SITE_NAME,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${base}/blog?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: base,
            logo: `${base}/assets/logo.png`,
            description: 'Security consulting, software development, and hands-on education from operators who think like attackers.',
            foundingDate: '2023',
            address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
            contactPoint: { '@type': 'ContactPoint', email: 'info@destrosec.com', contactType: 'customer service' },
            sameAs: ['https://linkedin.com/company/destro-sec', 'https://github.com/destrosec', 'https://instagram.com/destro_sec']
          }
        ]
      };

    case 'services': {
      const v = params.vertical;
      const vData = { security: VERTICAL_DATA.security, software: VERTICAL_DATA.software, education: VERTICAL_DATA.education };
      const vDescMap = {
        security:  'Penetration testing, red team engagements, vulnerability assessments, and incident response from operators who think like attackers.',
        software:  'Secure-by-default custom software development — web, mobile, APIs, and DevSecOps pipelines built by people who know how code gets broken.',
        education: 'College workshops, CTF hosting, bootcamps, and certification prep run by working practitioners. 2,400+ students trained.'
      };
      const vTitleMap = {
        security:  `Security Services — Pen Testing & Red Team | ${SITE_NAME}`,
        software:  `Software Services — Secure By Default | ${SITE_NAME}`,
        education: `Education Services — CTFs, Bootcamps & Workshops | ${SITE_NAME}`
      };
      const title       = v && vTitleMap[v] ? vTitleMap[v] : `Services — Security, Software & Education | ${SITE_NAME}`;
      const description = v && vDescMap[v]  ? vDescMap[v]  : 'Penetration testing, red team, secure software development, and hands-on security education. Three verticals, one team that thinks like attackers.';
      const url         = v ? `${base}/services/${v}` : `${base}/services`;
      return {
        meta: { title, description, url },
        schema: breadcrumb([
          [SITE_NAME, base],
          ['Services', `${base}/services`],
          ...(v ? [[vData[v]?.name || v, url]] : [])
        ])
      };
    }

    case 'about':
      return {
        meta: {
          title: `About — Who We Are | ${SITE_NAME}`,
          description: 'Four practitioners who spent years on offensive teams, infrastructure, and education — and got tired of those three worlds being run by separate vendors. Founded in Bangalore, 2023.',
          url: `${base}/about`
        },
        schema: breadcrumb([[SITE_NAME, base], ['About', `${base}/about`]])
      };

    case 'team': {
      const member = TEAM.find(t => t.id === params.id) || TEAM[0];
      return {
        meta: {
          title: `${member.name} — ${member.role} | ${SITE_NAME}`,
          description: member.bioShort,
          url: `${base}/team/${member.id}`
        },
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: member.name,
            jobTitle: member.role,
            description: member.bioShort,
            url: `${base}/team/${member.id}`,
            worksFor: { '@type': 'Organization', name: SITE_NAME, url: base },
            knowsAbout: member.skills
          },
          breadcrumb([[SITE_NAME, base], ['About', `${base}/about`], [member.name, `${base}/team/${member.id}`]])
        ]
      };
    }

    case 'contact':
      return {
        meta: {
          title: `Contact — Let's Talk | ${SITE_NAME}`,
          description: 'Got a project, a question, or want to host us at your college? Drop a note — a real human replies within 24 hours.',
          url: `${base}/contact`
        },
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Do you work with teams outside India?', acceptedAnswer: { '@type': 'Answer', text: "Yes. About 30% of our work is with Nordic, SE Asia, and US teams. Remote-first since day one." } },
              { '@type': 'Question', name: 'Can you sign our NDA before scoping?', acceptedAnswer: { '@type': 'Answer', text: "Of course. We sign first, scope second. Send it on the contact form or to legal@destrosec.com." } },
              { '@type': 'Question', name: 'What does an engagement actually cost?', acceptedAnswer: { '@type': 'Answer', text: "Pen tests start around ₹3L for a focused web app. Red teams from ₹15L. Software builds quoted by sprint. Education engagements are bespoke." } },
              { '@type': 'Question', name: 'Do you offer retainers or just one-off work?', acceptedAnswer: { '@type': 'Answer', text: "Both. Retainers come with a real human number on-call and quarterly threat-model reviews." } },
              { '@type': 'Question', name: "I'm a student — can I learn from you for free?", acceptedAnswer: { '@type': 'Answer', text: "Yes. Our community CTFs are free, and we run scholarships for the bootcamp." } }
            ]
          },
          breadcrumb([[SITE_NAME, base], ['Contact', `${base}/contact`]])
        ]
      };

    case 'quote':
      return {
        meta: {
          title: `Get a Quote | ${SITE_NAME}`,
          description: 'Tell us what you\'re working on. We\'ll come back within 24 hours with a real human and a real plan — no bots, no SDRs.',
          url: `${base}/quote`
        },
        schema: breadcrumb([[SITE_NAME, base], ['Get a Quote', `${base}/quote`]])
      };

    case 'blog':
      return {
        meta: {
          title: `Blog — Field Notes | ${SITE_NAME}`,
          description: 'Writeups, CVE deep-dives, launch posts, and event recaps from the people running the engagements. Updated when there\'s something worth saying.',
          url: `${base}/blog`
        },
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${SITE_NAME} Blog`,
            url: `${base}/blog`,
            description: 'Writeups, CVE deep-dives, and field notes from Destro Sec.',
            publisher: { '@type': 'Organization', name: SITE_NAME, url: base }
          },
          breadcrumb([[SITE_NAME, base], ['Blog', `${base}/blog`]])
        ]
      };

    case 'blog-post': {
      const post   = (typeof getPost !== 'undefined') ? getPost(params.id) : null;
      const author = post && (typeof getAuthor !== 'undefined') ? getAuthor(post.author) : null;
      if (!post) return getPageSEO('blog', {});
      const postUrl = `${base}/blog/${post.id}`;
      return {
        meta: {
          title: `${post.title} | ${SITE_NAME}`,
          description: post.deck,
          url: postUrl,
          type: 'article'
        },
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.deck,
            url: postUrl,
            datePublished: post.date,
            image: OG_IMAGE,
            author: author ? { '@type': 'Person', name: author.name, url: `${base}/blog/author/${author.id}` } : undefined,
            publisher: { '@type': 'Organization', name: SITE_NAME, url: base, logo: { '@type': 'ImageObject', url: `${base}/assets/logo.png` } },
            keywords: (post.tags || []).join(', ')
          },
          breadcrumb([[SITE_NAME, base], ['Blog', `${base}/blog`], [post.title, postUrl]])
        ]
      };
    }

    case 'blog-author': {
      const a = (typeof getAuthor !== 'undefined') ? getAuthor(params.id) : null;
      if (!a) return getPageSEO('blog', {});
      const authorUrl = `${base}/blog/author/${a.id}`;
      return {
        meta: {
          title: `${a.name} — Author | ${SITE_NAME}`,
          description: a.bio,
          url: authorUrl
        },
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: a.name,
            jobTitle: a.role,
            description: a.bio,
            url: authorUrl,
            worksFor: { '@type': 'Organization', name: SITE_NAME, url: base }
          },
          breadcrumb([[SITE_NAME, base], ['Blog', `${base}/blog`], [a.name, authorUrl]])
        ]
      };
    }

    default:
      return {
        meta: {
          title: `${SITE_NAME} — Built For Break In`,
          description: 'Security consulting, software development, and hands-on education from operators who think like attackers.',
          url: base
        },
        schema: null
      };
  }
}

// ─── URL ↔ route helpers ─────────────────────────────────────────────────────
function urlFor(page, params = {}) {
  switch (page) {
    case 'home':         return '/';
    case 'services':     return params.vertical ? `/services/${params.vertical}` : '/services';
    case 'about':        return '/about';
    case 'team':         return params.id ? `/team/${params.id}` : '/team';
    case 'contact':      return '/contact';
    case 'quote':        return params.vertical ? `/quote/${params.vertical}` : '/quote';
    case 'blog':         return '/blog';
    case 'blog-post':    return params.id ? `/blog/${params.id}` : '/blog';
    case 'blog-author':  return params.id ? `/blog/author/${params.id}` : '/blog';
    default:             return '/';
  }
}

function parseURL(pathname) {
  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (!parts.length) return { page: 'home', params: {} };
  switch (parts[0]) {
    case 'services':
      return { page: 'services', params: parts[1] ? { vertical: parts[1] } : {} };
    case 'about':
      return { page: 'about', params: {} };
    case 'team':
      return { page: 'team', params: { id: parts[1] || '' } };
    case 'contact':
      return { page: 'contact', params: {} };
    case 'quote':
      return { page: 'quote', params: parts[1] ? { vertical: parts[1] } : {} };
    case 'blog':
      if (parts[1] === 'author') return { page: 'blog-author', params: { id: parts[2] || '' } };
      if (parts[1]) return { page: 'blog-post', params: { id: parts[1] } };
      return { page: 'blog', params: {} };
    default:
      return { page: 'home', params: {} };
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [route, setRoute] = useState(() => {
    const redirected = sessionStorage.getItem('__ds_redirect');
    if (redirected) {
      sessionStorage.removeItem('__ds_redirect');
      window.history.replaceState(null, '', redirected);
      return parseURL(redirected);
    }
    return parseURL(window.location.pathname);
  });

  // Apply tweaks to root
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-intensity', t.accentIntensity);
    document.documentElement.style.setProperty('--glow-intensity', t.glowIntensity);
    if (t.scrollAnim) {
      document.documentElement.removeAttribute('data-no-scroll-anim');
    } else {
      document.documentElement.setAttribute('data-no-scroll-anim', '');
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }
  }, [t.accentIntensity, t.glowIntensity, t.scrollAnim]);

  // Update SEO + screen label on every route change
  useEffect(() => {
    const labels = {
      home: '01 Home', services: '02 Services', about: '03 About',
      team: '04 Team Profile', contact: '05 Contact', quote: '06 Quote',
      blog: '07 Blog', 'blog-post': '08 Blog Post', 'blog-author': '09 Blog Author'
    };
    document.body.setAttribute('data-screen-label', labels[route.page] || route.page);

    const seo = getPageSEO(route.page, route.params);
    updateMeta(seo.meta);
    if (seo.schema) updateSchema(seo.schema);
  }, [route.page, route.params.id, route.params.vertical]);

  // Browser back/forward
  useEffect(() => {
    const onPop = (e) => {
      const r = e.state ? e.state : parseURL(window.location.pathname);
      setRoute(r);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const onNav = (page, params = {}) => {
    const newRoute = { page, params };
    window.history.pushState(newRoute, '', urlFor(page, params));
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const tweaks = { accent: t.accentIntensity, glow: t.glowIntensity, cuboidStyle: t.cuboidStyle };

  let pageEl;
  switch (route.page) {
    case 'home':     pageEl = <HomePage onNav={onNav} tweaks={tweaks}/>; break;
    case 'services': pageEl = <ServicesPage onNav={onNav} initialVertical={route.params.vertical} tweaks={tweaks}/>; break;
    case 'about':    pageEl = <AboutPage onNav={onNav}/>; break;
    case 'team':     pageEl = <TeamProfilePage onNav={onNav} memberId={route.params.id}/>; break;
    case 'contact':  pageEl = <ContactPage onNav={onNav}/>; break;
    case 'quote':    pageEl = <QuotePage onNav={onNav} initialVertical={route.params.vertical}/>; break;
    case 'blog':         pageEl = <BlogHomePage onNav={onNav}/>; break;
    case 'blog-post':    pageEl = <BlogPostPage onNav={onNav} postId={route.params.id}/>; break;
    case 'blog-author':  pageEl = <BlogAuthorPage onNav={onNav} authorId={route.params.id}/>; break;
    default:         pageEl = <HomePage onNav={onNav} tweaks={tweaks}/>;
  }

  return (
    <>
      <Nav current={route.page} onNav={onNav}/>
      <main id="main-content" key={route.page + (route.params.id || route.params.vertical || '')}>
        {pageEl}
      </main>
      <Footer onNav={onNav}/>

      <TweaksPanel>
        <TweakSection label="Visual intensity"/>
        <TweakSlider label="Vertical accent"
          value={t.accentIntensity} min={0.2} max={2} step={0.1}
          onChange={v => setTweak('accentIntensity', v)}/>
        <TweakSlider label="Background glow"
          value={t.glowIntensity} min={0} max={2} step={0.1}
          onChange={v => setTweak('glowIntensity', v)}/>
        <TweakSection label="Motion"/>
        <TweakToggle label="Scroll animations" value={t.scrollAnim}
          onChange={v => setTweak('scrollAnim', v)}/>
        <TweakSection label="Cuboid (Services)"/>
        <TweakRadio label="Style" value={t.cuboidStyle}
          options={['flat', 'isometric', 'depth']}
          onChange={v => setTweak('cuboidStyle', v)}/>
        <TweakSection label="Jump to page"/>
        <TweakButton label="Home"        onClick={() => onNav('home')}/>
        <TweakButton label="Services"    onClick={() => onNav('services')}/>
        <TweakButton label="About"       onClick={() => onNav('about')}/>
        <TweakButton label="Team profile" onClick={() => onNav('team', { id: 'aarav-mehta' })}/>
        <TweakButton label="Contact"     onClick={() => onNav('contact')}/>
        <TweakButton label="Get a Quote" onClick={() => onNav('quote')}/>
        <TweakButton label="Blog"        onClick={() => onNav('blog')}/>
        <TweakButton label="Post · Technical" onClick={() => onNav('blog-post', { id: 'react2shell-cve' })}/>
        <TweakButton label="Post · Launch"    onClick={() => onNav('blog-post', { id: 'm-dash-launch' })}/>
        <TweakButton label="Post · Event"     onClick={() => onNav('blog-post', { id: 'nullcon-2026-recap' })}/>
        <TweakButton label="Post · Manifesto" onClick={() => onNav('blog-post', { id: 'fundraise-2026' })}/>
        <TweakButton label="Author page" onClick={() => onNav('blog-author', { id: 'priya-iyer' })}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
