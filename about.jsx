// about.jsx — About page + team profile

const AboutPage = ({ onNav }) => {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">ABOUT</span>
            <h1 className="about-h1">
              Built by people who<br/>broke things first.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead about-lead">
              Destro Sec was founded in 2023 in Bangalore by four practitioners who'd spent years on offensive security teams, infrastructure, and education — and were tired of those three worlds being run by separate vendors who didn't talk to each other.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="origin">
        <div className="container">
          <div className="origin-grid">
            <Reveal>
              <div className="origin-text">
                <span className="eyebrow">ORIGIN</span>
                <h2 className="section-h2">A vendor we wished existed.</h2>
                <p>The four of us kept ending up on the same engagements from different angles. One running the red team. One reviewing the auth code. One training the junior analysts. One running the war room.</p>
                <p>Every time, the handoffs leaked. The red team report sat in a Slack channel. The dev team rebuilt the bug a quarter later. The analysts learned mitigations from a vendor that didn't know the codebase.</p>
                <p>Destro Sec is the vendor we wished existed: one team, three disciplines, a single thread running through every engagement.</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="origin-quote glass">
                <div className="quote-mark mono">"</div>
                <blockquote>
                  Security is best taught by people who've broken things on purpose. Software is best built by people who know how it'll be attacked. Education is best run by both.
                </blockquote>
                <cite className="mono">— Founding principle, May 2023</cite>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mvv">
        <div className="container">
          <Reveal>
            <span className="eyebrow">MISSION · VISION · VALUES</span>
            <h2 className="section-h2">What we work toward.</h2>
          </Reveal>
          <div className="mvv-grid">
            <Reveal delay={0}>
              <div className="mvv-card glass">
                <div className="mvv-tag mono">MISSION</div>
                <h3>Make excellent security work accessible to teams of every size.</h3>
                <p>From a 12-person startup to a 12,000-person bank. The discipline is the same; only the scope changes.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mvv-card glass">
                <div className="mvv-tag mono">VISION</div>
                <h3>An industry where defenders learn from the people who broke in.</h3>
                <p>We're building the practitioner-to-student pipeline our own careers needed and never had.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mvv-card glass">
                <div className="mvv-tag mono">VALUES</div>
                <div className="mvv-chips">
                  <span className="chip-soft">Show, don't slide</span>
                  <span className="chip-soft">Builders first</span>
                  <span className="chip-soft">Plain language</span>
                  <span className="chip-soft">No theatre</span>
                  <span className="chip-soft">Teach what you know</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bearers">
        <div className="container">
          <Reveal>
            <span className="eyebrow">OFFICE BEARERS</span>
            <h2 className="section-h2">The four people in charge.</h2>
            <p className="lead">Each owns a vertical and runs it end-to-end. No matrix, no handoffs, no &ldquo;account managers&rdquo; in between.</p>
          </Reveal>
          <div className="bearers-grid">
            {TEAM.map((m, i) => {
              const v = VERTICAL_DATA[m.vertical];
              return (
                <Reveal key={m.id} delay={i * 80}>
                  <button
                    className="bearer-card"
                    onClick={() => onNav('team', { id: m.id })}
                    style={{ '--accent': v.color, '--accent-rgb': v.rgb }}
                  >
                    <div className="bearer-photo">
                      <ProfilePlaceholder name={m.name} accent={v.color} />
                      <div className="bearer-photo-ring" />
                    </div>
                    <div className="bearer-body">
                      <div className="bearer-tag-row">
                        <span className="chip" style={{
                          color: v.color,
                          borderColor: `rgba(${v.rgb}, 0.4)`,
                          background: `rgba(${v.rgb}, 0.08)`
                        }}>
                          <span className="dot" />{v.name}
                        </span>
                      </div>
                      <h3 className="bearer-name">{m.name}</h3>
                      <div className="bearer-role">{m.role}</div>
                      <p className="bearer-bio">{m.bioShort}</p>
                      <div className="bearer-cta mono">
                        View profile
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="join">
        <div className="container">
          <Reveal>
            <div className="join-card glass">
              <div>
                <h2 className="join-headline">We're hiring builders who break things.</h2>
                <p className="lead">Senior pen testers, security-minded engineers, and curriculum designers. Remote-first across India.</p>
              </div>
              <button className="btn btn-primary btn-lg" onClick={() => onNav('contact')}>
                See open roles
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

// Pretty placeholder for profile photos (initials on accent gradient)
const ProfilePlaceholder = ({ name, accent, size = '100%' }) => {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('');
  return (
    <div className="profile-placeholder" style={{ width: size, height: size, background: `linear-gradient(135deg, ${accent}30, var(--color-bg-elevated))` }}>
      <div className="pp-grid" />
      <div className="pp-initials" style={{ color: accent }}>{initials}</div>
    </div>
  );
};

// ─── Team Profile Page ─────────────────────────
const TeamProfilePage = ({ onNav, memberId }) => {
  const m = TEAM.find(t => t.id === memberId) || TEAM[0];
  const v = VERTICAL_DATA[m.vertical];
  const others = TEAM.filter(t => t.id !== m.id).slice(0, 3);

  return (
    <div className="page profile-page" style={{ '--accent': v.color, '--accent-rgb': v.rgb }}>
      <div className="profile-glow" style={{ background: `radial-gradient(circle, rgba(${v.rgb}, 0.12) 0%, transparent 60%)` }} />
      <div className="container">
        <button className="back-link" onClick={() => onNav('about')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to team
        </button>

        <div className="profile-hero">
          <div className="profile-photo">
            <ProfilePlaceholder name={m.name} accent={v.color} />
            <div className="profile-photo-ring" />
          </div>
          <div className="profile-meta">
            <span className="chip" style={{
              color: v.color,
              borderColor: `rgba(${v.rgb}, 0.4)`,
              background: `rgba(${v.rgb}, 0.08)`
            }}>
              <span className="dot" />{v.name} · {m.boardRole}
            </span>
            <h1 className="profile-name">{m.name}</h1>
            <div className="profile-role">{m.role}</div>
            <div className="profile-socials">
              <a href="#" onClick={e => e.preventDefault()} aria-label="LinkedIn">LinkedIn</a>
              <a href="#" onClick={e => e.preventDefault()} aria-label="GitHub">GitHub</a>
              <a href="#" onClick={e => e.preventDefault()} aria-label="Email">{m.id.split('-').join('.')}@destrosec.com</a>
            </div>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-bio">
            <h3 className="profile-section-title mono">ABOUT</h3>
            {m.bioLong.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}

            <h3 className="profile-section-title mono" style={{ marginTop: 48 }}>ACHIEVEMENTS</h3>
            <ul className="achievements">
              {m.achievements.map((a, i) => (
                <li key={i}><span className="ach-bullet" style={{ background: v.color }} />{a}</li>
              ))}
            </ul>

            <div className="profile-quote glass">
              <div className="quote-mark mono" style={{ color: v.color }}>"</div>
              <blockquote>{m.quote}</blockquote>
            </div>
          </div>

          <aside className="profile-side">
            <div className="profile-side-card glass">
              <h4 className="mono">SKILLS</h4>
              <div className="skill-chips">
                {m.skills.map(s => <span key={s} className="chip-soft">{s}</span>)}
              </div>
            </div>
            <div className="profile-side-card glass">
              <h4 className="mono">CERTIFICATIONS</h4>
              <div className="cert-list">
                {m.certs.map(c => (
                  <div key={c} className="cert-badge" style={{ borderColor: `rgba(${v.rgb}, 0.4)`, color: v.color }}>{c}</div>
                ))}
              </div>
            </div>
            <div className="profile-side-card glass">
              <h4 className="mono">JOINED</h4>
              <div className="profile-joined">{m.joinedYear}</div>
            </div>
            <button className="btn btn-primary" onClick={() => onNav('quote', { vertical: m.vertical })} style={{ width: '100%' }}>
              Work with {m.name.split(' ')[0]}
            </button>
          </aside>
        </div>

        <section className="profile-others">
          <h3 className="profile-section-title mono">OTHERS YOU MIGHT WORK WITH</h3>
          <div className="others-grid">
            {others.map(o => {
              const ov = VERTICAL_DATA[o.vertical];
              return (
                <button key={o.id} className="other-card" onClick={() => onNav('team', { id: o.id })} style={{ '--accent': ov.color, '--accent-rgb': ov.rgb }}>
                  <div className="other-photo"><ProfilePlaceholder name={o.name} accent={ov.color} /></div>
                  <div className="other-name">{o.name}</div>
                  <div className="other-role">{o.role}</div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

window.AboutPage = AboutPage;
window.TeamProfilePage = TeamProfilePage;
window.ProfilePlaceholder = ProfilePlaceholder;
