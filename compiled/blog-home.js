// blog-home.jsx — Categorized rails landing page

const BlogHomePage = ({
  onNav
}) => {
  const [prefs, setPrefs] = window.useReadingPrefs();
  const [tagFilter, setTagFilter] = useState(null);
  const featured = window.BLOG_POSTS.find(p => p.featured && p.category === 'security');
  const sponsorPost = window.BLOG_POSTS.find(p => p.sponsor);
  const allTags = Array.from(new Set(window.BLOG_POSTS.flatMap(p => p.tags))).sort();
  const filteredPosts = tagFilter ? window.BLOG_POSTS.filter(p => p.tags.includes(tagFilter)) : null;
  const shelves = [{
    id: 'security',
    label: 'Security',
    hue: 'security',
    desc: 'Writeups, CVEs, red team field notes.'
  }, {
    id: 'software',
    label: 'Software',
    hue: 'software',
    desc: 'Builds, launches, and architecture posts.'
  }, {
    id: 'education',
    label: 'Education',
    hue: 'education',
    desc: 'Cohort recaps, CTFs, learning logs.'
  }, {
    id: 'company',
    label: 'Opinion & Company',
    hue: 'opinion',
    desc: 'Manifestos, fundraises, and craft.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "page blog-home"
  }, /*#__PURE__*/React.createElement(BlogHero, {
    onNav: onNav,
    featured: featured,
    sponsorPost: sponsorPost
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bh-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bh-tags"
  }, /*#__PURE__*/React.createElement("button", {
    className: `bh-tag ${tagFilter === null ? 'on' : ''}`,
    onClick: () => setTagFilter(null)
  }, "All"), ['CVE', 'Tutorial', 'Case Study', 'CTF', 'Launch', 'Manifesto'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: `bh-tag ${tagFilter === t ? 'on' : ''}`,
    onClick: () => setTagFilter(tagFilter === t ? null : t)
  }, "#", t))), /*#__PURE__*/React.createElement(window.ReadingControls, {
    prefs: prefs,
    setPrefs: setPrefs
  })), filteredPosts ? /*#__PURE__*/React.createElement("section", {
    className: "bh-filtered"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "bh-shelf-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "FILTERED \xB7 #", tagFilter), /*#__PURE__*/React.createElement("span", {
    className: "bh-count mono"
  }, filteredPosts.length, " posts")), /*#__PURE__*/React.createElement("div", {
    className: "bh-grid"
  }, filteredPosts.map(p => /*#__PURE__*/React.createElement(window.PostCard, {
    key: p.id,
    post: p,
    onNav: onNav
  })))) : shelves.map(s => /*#__PURE__*/React.createElement(Shelf, {
    key: s.id,
    shelf: s,
    onNav: onNav
  })), !filteredPosts && /*#__PURE__*/React.createElement("section", {
    className: "bh-archive"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "bh-shelf-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "ARCHIVE")), /*#__PURE__*/React.createElement("div", {
    className: "bh-archive-list"
  }, window.BLOG_POSTS.map(p => /*#__PURE__*/React.createElement(ArchiveRow, {
    key: p.id,
    post: p,
    onNav: onNav
  }))))));
};

// ─── Hero (featured + sponsor card) ────────────
const BlogHero = ({
  onNav,
  featured,
  sponsorPost
}) => {
  const fh = window.HUE_DATA[featured?.hue || 'security'];
  return /*#__PURE__*/React.createElement("section", {
    className: "bh-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bh-hero-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "FIELD NOTES"), /*#__PURE__*/React.createElement("h1", {
    className: "bh-h1"
  }, "Things we broke, built,", /*#__PURE__*/React.createElement("br", null), "or learned out loud."), /*#__PURE__*/React.createElement("p", {
    className: "lead bh-lead"
  }, "Writeups, launches, and recaps from the people running the engagements. Updated when there's something to say \u2014 not on a content calendar.")), featured && /*#__PURE__*/React.createElement("div", {
    className: "bh-featured-grid"
  }, /*#__PURE__*/React.createElement("article", {
    className: "bh-feature",
    role: "link",
    tabIndex: 0,
    onClick: () => onNav('blog-post', {
      id: featured.id
    }),
    onKeyDown: e => e.key === 'Enter' && onNav('blog-post', {
      id: featured.id
    }),
    "aria-label": `Featured post: ${featured.title}`,
    style: {
      '--h': fh.color,
      '--hr': fh.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bh-feature-cover"
  }, /*#__PURE__*/React.createElement(window.BlogCover, {
    shape: featured.coverShape,
    hue: featured.hue,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bh-feature-pin mono"
  }, "FEATURED \xB7 ", fh.name.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    className: "bh-feature-body"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "bh-feature-title"
  }, featured.title), /*#__PURE__*/React.createElement("p", {
    className: "bh-feature-deck"
  }, featured.deck), /*#__PURE__*/React.createElement("div", {
    className: "bh-feature-meta"
  }, /*#__PURE__*/React.createElement(window.AuthorByline, {
    authorId: featured.author,
    onNav: onNav,
    withDate: true,
    date: featured.date
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono bh-feature-read"
  }, featured.readMin, " min read")))), sponsorPost && /*#__PURE__*/React.createElement("aside", {
    className: "bh-sponsor",
    style: {
      '--h': window.HUE_DATA[sponsorPost.hue].color,
      '--hr': window.HUE_DATA[sponsorPost.hue].rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bh-sponsor-tag mono"
  }, "FROM DESTRO SEC"), /*#__PURE__*/React.createElement("h3", {
    className: "bh-sponsor-title",
    onClick: () => onNav('blog-post', {
      id: sponsorPost.id
    })
  }, sponsorPost.title), /*#__PURE__*/React.createElement("p", {
    className: "bh-sponsor-deck"
  }, sponsorPost.deck), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onNav('blog-post', {
      id: sponsorPost.id
    })
  }, "Read the manifesto \u2192"), /*#__PURE__*/React.createElement("div", {
    className: "bh-sponsor-pulse",
    "aria-hidden": true
  })))));
};

// ─── Category shelf ────────────────────────────
const Shelf = ({
  shelf,
  onNav
}) => {
  const posts = shelf.id === 'company' ? window.BLOG_POSTS.filter(p => p.category === 'company') : window.postsByCategory(shelf.id);
  const h = window.HUE_DATA[shelf.hue];
  if (posts.length === 0) return null;
  return /*#__PURE__*/React.createElement("section", {
    className: "bh-shelf",
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bh-shelf-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "bh-shelf-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bh-shelf-dot",
    style: {
      background: h.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "bh-shelf-label"
  }, shelf.label), /*#__PURE__*/React.createElement("span", {
    className: "bh-shelf-desc"
  }, shelf.desc)), /*#__PURE__*/React.createElement("span", {
    className: "mono bh-shelf-count"
  }, posts.length, " posts")), /*#__PURE__*/React.createElement("div", {
    className: "bh-shelf-rail"
  }, posts.map(p => /*#__PURE__*/React.createElement(window.PostCard, {
    key: p.id,
    post: p,
    onNav: onNav
  }))));
};

// ─── Archive row ──────────────────────────────
const ArchiveRow = ({
  post,
  onNav
}) => {
  const h = window.HUE_DATA[post.hue];
  const a = window.getAuthor(post.author);
  return /*#__PURE__*/React.createElement("button", {
    className: "archive-row",
    onClick: () => onNav('blog-post', {
      id: post.id
    }),
    style: {
      '--h': h.color,
      '--hr': h.rgb
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ar-date mono"
  }, window.formatDate(post.date)), /*#__PURE__*/React.createElement("span", {
    className: "ar-cat mono",
    style: {
      color: h.color
    }
  }, h.name.toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "ar-title"
  }, post.title), /*#__PURE__*/React.createElement("span", {
    className: "ar-author mono"
  }, a?.name), /*#__PURE__*/React.createElement("span", {
    className: "ar-read mono"
  }, post.readMin, "\u2032"));
};
window.BlogHomePage = BlogHomePage;