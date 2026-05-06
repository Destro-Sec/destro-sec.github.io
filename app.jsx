// app.jsx — Main app shell, routing, tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentIntensity": 1,
  "glowIntensity": 1,
  "scrollAnim": true,
  "cuboidStyle": "depth"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState({ page: 'home', params: {} });

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

  // Route screen labels
  useEffect(() => {
    const labels = {
      home: '01 Home',
      services: '02 Services',
      about: '03 About',
      team: '04 Team Profile',
      contact: '05 Contact',
      quote: '06 Quote',
      blog: '07 Blog',
      'blog-post': '08 Blog Post',
      'blog-author': '09 Blog Author'
    };
    document.body.setAttribute('data-screen-label', labels[route.page] || route.page);
  }, [route.page]);

  const onNav = (page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const tweaks = {
    accent: t.accentIntensity,
    glow: t.glowIntensity,
    cuboidStyle: t.cuboidStyle
  };

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
      <main key={route.page + (route.params.id || route.params.vertical || '')}>
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
        <TweakButton label="Home" onClick={() => onNav('home')}/>
        <TweakButton label="Services" onClick={() => onNav('services')}/>
        <TweakButton label="About" onClick={() => onNav('about')}/>
        <TweakButton label="Team profile" onClick={() => onNav('team', { id: 'aarav-mehta' })}/>
        <TweakButton label="Contact" onClick={() => onNav('contact')}/>
        <TweakButton label="Get a Quote" onClick={() => onNav('quote')}/>
        <TweakButton label="Blog" onClick={() => onNav('blog')}/>
        <TweakButton label="Post · Technical" onClick={() => onNav('blog-post', { id: 'react2shell-cve' })}/>
        <TweakButton label="Post · Launch" onClick={() => onNav('blog-post', { id: 'm-dash-launch' })}/>
        <TweakButton label="Post · Event" onClick={() => onNav('blog-post', { id: 'nullcon-2026-recap' })}/>
        <TweakButton label="Post · Manifesto" onClick={() => onNav('blog-post', { id: 'fundraise-2026' })}/>
        <TweakButton label="Author page" onClick={() => onNav('blog-author', { id: 'priya-iyer' })}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
