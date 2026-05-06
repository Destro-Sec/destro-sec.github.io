// contact.jsx — Contact page

const ContactPage = ({ onNav }) => {
  const [form, setForm] = useState({ name: '', email: '', who: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Looks like an invalid email';
    if (!form.who) e.who = 'Help us route this — pick one';
    if (!form.message.trim()) e.message = 'Tell us what we can help with';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="page contact-page">
      <div className="container">
        <section className="contact-hero">
          <Reveal>
            <span className="eyebrow">CONTACT</span>
            <h1 className="contact-h1">Let's talk<span style={{ color: 'var(--color-brand)' }}>.</span></h1>
            <p className="lead" style={{ maxWidth: 580 }}>
              Got a project, a question, or want to host us at your college? Drop a note. A real human will reply within 24 hours.
            </p>
          </Reveal>
        </section>

        <div className="contact-grid">
          <Reveal>
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="contact-success glass">
                  <div className="success-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" stroke="#06d6a0" strokeWidth="1.5"/>
                      <path d="M10 16l4 4 8-8" stroke="#06d6a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2>Thanks {form.name.split(' ')[0]}.</h2>
                  <p>We'll get back to you at <span className="text-brand mono">{form.email}</span> within 24 hours on business days.</p>
                  <div className="success-actions">
                    <button className="btn btn-secondary" onClick={() => onNav('about')}>Meet the team →</button>
                    <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', who: '', message: '' }); }}>Send another</button>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <Field label="Full name" id="name" required error={errors.name}>
                    <input
                      id="name"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email address" id="email" required error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="jane@company.com"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="I am a..." id="who" required error={errors.who}>
                    <div className="button-group">
                      {['Company', 'College', 'Student', 'Other'].map(opt => (
                        <button
                          type="button"
                          key={opt}
                          className={`bg-option ${form.who === opt ? 'active' : ''}`}
                          onClick={() => update('who', opt)}
                          aria-pressed={form.who === opt}
                        >{opt}</button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Message" id="message" required hint={`${form.message.length}/500`} error={errors.message}>
                    <textarea
                      id="message"
                      rows="5"
                      maxLength="500"
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      placeholder="A line or two about what you're working on..."
                    />
                  </Field>
                  {/* honeypot */}
                  <input type="text" name="website" tabIndex="-1" autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true" />
                  <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
                    Send message
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="contact-info">
              <div className="info-block">
                <div className="info-label mono">EMAIL</div>
                <a href="mailto:info@destrosec.com" className="info-value">info@destrosec.com</a>
              </div>
              <div className="info-block">
                <div className="info-label mono">RESPONSE TIME</div>
                <div className="rt-list">
                  <div className="rt-row"><span className="rt-tag rt-incident">Active incident</span><span className="rt-time">&lt; 1 hour, 24/7</span></div>
                  <div className="rt-row"><span className="rt-tag rt-quote">Quote / scoping</span><span className="rt-time">&lt; 24 hours, business days</span></div>
                  <div className="rt-row"><span className="rt-tag rt-edu">College / student</span><span className="rt-time">2–3 business days</span></div>
                </div>
              </div>
              <div className="info-block">
                <div className="info-label mono">WHATSAPP</div>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener" className="info-value wa-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: '-3px', marginRight: 6 }}><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1.1 3 .9 3.5.8.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                  +91 98765 43210
                </a>
                <div className="text-muted" style={{ fontSize: 12, marginTop: 4 }}>For quick questions and scoping. No incidents on this line.</div>
              </div>
              <div className="info-block">
                <div className="info-label mono">SOCIAL</div>
                <div className="info-stack">
                  <a href="#" onClick={e => e.preventDefault()}>linkedin.com/company/destro-sec</a>
                  <a href="#" onClick={e => e.preventDefault()}>instagram.com/destro_sec</a>
                  <a href="#" onClick={e => e.preventDefault()}>github.com/destrosec</a>
                </div>
              </div>
              <div className="info-block">
                <div className="info-label mono">BASED IN</div>
                <div className="info-value">Bangalore, India</div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 6 }}>Remote-first. We work with teams globally.</div>
              </div>
              <div className="info-block info-cta">
                <div className="info-label mono">URGENT?</div>
                <p className="text-secondary" style={{ fontSize: 14, marginBottom: 12 }}>Active engagement client with an incident? Use the IR retainer line in your engagement docs.</p>
              </div>
            </aside>
          </Reveal>
        </div>
        <section className="contact-faq">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-h2" style={{ marginBottom: 32 }}>Common questions.</h2>
          </Reveal>
          <div className="faq-list">
            {[
              { q: 'Do you work with teams outside India?', a: "Yes. About 30% of our work is with Nordic, SE Asia, and US teams. Remote-first since day one." },
              { q: 'Can you sign our NDA before scoping?', a: "Of course. We sign first, scope second. Send it on the contact form or to legal@destrosec.com." },
              { q: 'What does an engagement actually cost?', a: "Pen tests start around ₹3L for a focused web app. Red teams from ₹15L. Software builds quoted by sprint. Education engagements are bespoke. We give honest numbers on the first call — no per-hour mystery boxes." },
              { q: 'Is there a difference between you and a Big-4 firm?', a: "Yes. They send three names to the SOW and a different junior on the engagement. We send the founders, and they stay until the report is signed." },
              { q: 'Do you offer retainers or just one-off work?', a: "Both. Retainers come with a real human number on-call and quarterly threat-model reviews." },
              { q: 'I\u2019m a student — can I learn from you for free?', a: "Yes. Our community CTFs are free, and we run scholarships for the bootcamp. Hit the contact form and tell us about yourself." }
            ].map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon" aria-hidden>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
};

const Field = ({ label, id, required, hint, error, children }) => (
  <div className={`field ${error ? 'has-error' : ''}`}>
    <label htmlFor={id} className="field-label">
      {label}{required && <span className="req">*</span>}
      {hint && <span className="field-hint mono">{hint}</span>}
    </label>
    {children}
    {error && <div className="field-error" role="alert">{error}</div>}
  </div>
);

window.ContactPage = ContactPage;
window.Field = Field;
window.FaqItem = FaqItem;
