// quote.jsx — Multi-step quote form

const QuotePage = ({ onNav, initialVertical }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    who: '', name: '', email: '',
    vertical: initialVertical || '', need: '',
    timeline: '', budget: '', size: '',
    note: '', source: '',
    incident: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => {
    setData(d => ({ ...d, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!data.who) e.who = 'Pick one';
      if (!data.name.trim()) e.name = 'Required';
      if (!data.email.trim()) e.email = 'Required';
      else if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) e.email = 'Invalid email';
    } else if (step === 2) {
      if (!data.vertical) e.vertical = 'Pick a vertical';
      if (!data.need.trim()) e.need = 'A sentence or two helps a lot';
    } else if (step === 3) {
      if (!data.timeline) e.timeline = 'Pick a timeline';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => Math.min(4, s + 1)); };
  const back = () => setStep(s => Math.max(1, s - 1));
  const submit = () => setSubmitted(true);

  const steps = ['About you', 'Your need', 'Scope', 'Review'];

  if (submitted) {
    return (
      <div className="page quote-page">
        <div className="container">
          <div className="quote-success glass">
            <div className="success-icon">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#06d6a0" strokeWidth="1.5"/>
                <path d="M10 16l4 4 8-8" stroke="#06d6a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Request received, {data.name.split(' ')[0]}.</h1>
            <p className="lead">We'll be in touch at <span className="text-brand mono">{data.email}</span> within 24 hours with a real human and a real plan.</p>
            <div className="success-summary">
              <div><span className="mono">VERTICAL</span> {data.vertical && VERTICAL_DATA[data.vertical]?.name}</div>
              <div><span className="mono">TIMELINE</span> {data.timeline}</div>
              {data.budget && <div><span className="mono">BUDGET</span> {data.budget}</div>}
            </div>

            <div className="next-steps">
              <h3 className="ns-title mono">WHAT HAPPENS NEXT</h3>
              <ol className="ns-list">
                <li><span className="ns-when mono">WITHIN 24h</span><span className="ns-what">A founder reads your request and replies — not a bot, not an SDR.</span></li>
                <li><span className="ns-when mono">DAY 2–3</span><span className="ns-what">30-min scoping call. We map your threat model and the actual question we're answering.</span></li>
                <li><span className="ns-when mono">DAY 4–5</span><span className="ns-what">Written proposal: scope, deliverables, fixed price, calendar.</span></li>
                <li><span className="ns-when mono">DAY 7+</span><span className="ns-what">If we're a fit, we sign and start. If not, we'll point you to someone who is.</span></li>
              </ol>
            </div>

            <div className="success-actions">
              <button className="btn btn-secondary" onClick={() => onNav('about')}>While you wait, meet the team →</button>
              <button className="btn btn-ghost" onClick={() => onNav('home')}>Back to home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page quote-page">
      <div className="container">
        <section className="quote-hero">
          <span className="eyebrow">GET A QUOTE</span>
          <h1 className="quote-h1">Tell us what<br/>you're working on.</h1>
        </section>

        <div className="quote-incident-banner" role="alert">
          <div className="qib-tag mono">ACTIVE INCIDENT?</div>
          <div className="qib-msg">If you're being attacked right now, skip the form. Call <a href="tel:+919876543200" className="qib-phone">+91 98765 43200</a> — 24/7 IR line. We'll keep this form open for everything else.</div>
        </div>

        <div className="quote-stepper">
          {steps.map((label, i) => {
            const num = i + 1;
            const state = num < step ? 'done' : num === step ? 'active' : 'todo';
            return (
              <React.Fragment key={label}>
                <div className={`step-bubble ${state}`}>
                  <div className="step-circle">
                    {state === 'done' ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : num}
                  </div>
                  <div className="step-label">{label}</div>
                </div>
                {i < steps.length - 1 && <div className={`step-line ${num < step ? 'done' : ''}`} />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="quote-form glass">
          {step === 1 && <Step1 data={data} update={update} errors={errors} />}
          {step === 2 && <Step2 data={data} update={update} errors={errors} />}
          {step === 3 && <Step3 data={data} update={update} errors={errors} />}
          {step === 4 && <Step4 data={data} update={update} />}

          <div className="quote-nav">
            {step > 1 && <button className="btn btn-ghost" onClick={back}>← Back</button>}
            <div style={{ flex: 1 }} />
            {step < 4 ? (
              <button className="btn btn-primary" onClick={next}>
                Next
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={submit}>
                Send my request
              </button>
            )}
          </div>
        </div>

        <div className="quote-aside mono">
          <span>Step {step} of 4 · ~{[60, 90, 60, 30][step-1]}s remaining</span>
        </div>
      </div>
    </div>
  );
};

const Step1 = ({ data, update, errors }) => (
  <div className="quote-step">
    <h2 className="step-title">Who are you?</h2>
    <p className="step-sub">A few basics so we can route this to the right person.</p>

    <Field label="I am a..." id="who" required error={errors.who}>
      <div className="button-group">
        {['Company', 'College', 'Individual', 'Other'].map(opt => (
          <button type="button" key={opt} className={`bg-option ${data.who === opt ? 'active' : ''}`} onClick={() => update('who', opt)}>
            {opt}
          </button>
        ))}
      </div>
    </Field>

    <div className="field-row">
      <Field label="Your name" id="qname" required error={errors.name}>
        <input id="qname" value={data.name} onChange={e => update('name', e.target.value)} placeholder="Jane Doe"/>
      </Field>
      <Field label="Your email" id="qemail" required error={errors.email}>
        <input id="qemail" type="email" value={data.email} onChange={e => update('email', e.target.value)} placeholder="jane@company.com"/>
      </Field>
    </div>
  </div>
);

const Step2 = ({ data, update, errors }) => (
  <div className="quote-step">
    <h2 className="step-title">What do you need?</h2>
    <p className="step-sub">Pick a vertical and tell us briefly what we can help with.</p>

    <Field label="Vertical" id="vertical" required error={errors.vertical}>
      <div className="vertical-picker">
        {Object.entries(VERTICAL_DATA).map(([key, v]) => (
          <button
            type="button"
            key={key}
            className={`vp-option ${data.vertical === key ? 'active' : ''}`}
            onClick={() => update('vertical', key)}
            style={{ '--accent': v.color, '--accent-rgb': v.rgb }}
            aria-pressed={data.vertical === key}
          >
            <div className="vp-icon"><VerticalIcon vertical={key} size={22}/></div>
            <div className="vp-name">{v.name}</div>
          </button>
        ))}
        <button
          type="button"
          className={`vp-option vp-combo ${data.vertical === 'combo' ? 'active' : ''}`}
          onClick={() => update('vertical', 'combo')}
        >
          <div className="vp-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg></div>
          <div className="vp-name">Combination</div>
        </button>
      </div>
    </Field>

    <Field label="Brief description of need" id="need" required hint={`${data.need.length}/500`} error={errors.need}>
      <textarea
        id="need"
        rows="4"
        maxLength="500"
        value={data.need}
        onChange={e => update('need', e.target.value)}
        placeholder="Describe your challenge in one or two sentences..."
      />
    </Field>
  </div>
);

const Step3 = ({ data, update, errors }) => (
  <div className="quote-step">
    <h2 className="step-title">Scope and timeline.</h2>
    <p className="step-sub">All optional except timeline. The more we know, the more accurate our reply.</p>

    <Field label="Timeline" id="timeline" required error={errors.timeline}>
      <div className="button-group">
        {['ASAP', '1–3 months', '3–6 months', '6+ months', 'Not sure'].map(opt => (
          <button type="button" key={opt} className={`bg-option ${data.timeline === opt ? 'active' : ''}`} onClick={() => update('timeline', opt)}>
            {opt}
          </button>
        ))}
      </div>
    </Field>

    <Field label="Budget range" id="budget" hint="optional">
      <div className="button-group">
        {['Under ₹50K', '₹50K–2L', '₹2L–10L', 'Above ₹10L', 'Prefer to discuss'].map(opt => (
          <button type="button" key={opt} className={`bg-option ${data.budget === opt ? 'active' : ''}`} onClick={() => update('budget', opt)}>
            {opt}
          </button>
        ))}
      </div>
    </Field>

    {(data.who === 'Company' || data.who === 'College') && (
      <Field label="Team / org size" id="size" hint="optional">
        <div className="button-group">
          {['1–10', '10–50', '50–200', '200+'].map(opt => (
            <button type="button" key={opt} className={`bg-option ${data.size === opt ? 'active' : ''}`} onClick={() => update('size', opt)}>
              {opt}
            </button>
          ))}
        </div>
      </Field>
    )}
  </div>
);

const Step4 = ({ data, update }) => (
  <div className="quote-step">
    <h2 className="step-title">Review and send.</h2>
    <p className="step-sub">A quick check before we route this. Edit any step by going back.</p>

    <div className="review-grid">
      <div className="review-row"><span className="mono">YOU</span><span>{data.name} ({data.who}) — {data.email}</span></div>
      <div className="review-row"><span className="mono">VERTICAL</span><span>{data.vertical === 'combo' ? 'Combination' : VERTICAL_DATA[data.vertical]?.name}</span></div>
      <div className="review-row"><span className="mono">NEED</span><span>{data.need}</span></div>
      <div className="review-row"><span className="mono">TIMELINE</span><span>{data.timeline}</span></div>
      {data.budget && <div className="review-row"><span className="mono">BUDGET</span><span>{data.budget}</span></div>}
      {data.size && <div className="review-row"><span className="mono">SIZE</span><span>{data.size}</span></div>}
    </div>

    <Field label="Anything else? (optional)" id="note">
      <textarea id="note" rows="3" value={data.note} onChange={e => update('note', e.target.value)} placeholder="Something we should know up front..."/>
    </Field>

    <Field label="How did you hear about us?" id="source" hint="optional">
      <select id="source" value={data.source} onChange={e => update('source', e.target.value)}>
        <option value="">Pick one...</option>
        <option>Search engine</option>
        <option>LinkedIn</option>
        <option>Referral from a colleague</option>
        <option>College / workshop</option>
        <option>CTF or community event</option>
        <option>Other</option>
      </select>
    </Field>
  </div>
);

window.QuotePage = QuotePage;
