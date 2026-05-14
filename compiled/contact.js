// contact.jsx — Contact page
//
// SETUP: Replace FORMSPREE_ENDPOINT with your Formspree form URL.
// Sign up free at https://formspree.io → create a form → copy the endpoint.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_CONTACT_FORM_ID';
const ContactPage = ({
  onNav
}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    who: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const update = (k, v) => {
    setForm(f => ({
      ...f,
      [k]: v
    }));
    if (errors[k]) setErrors(e => ({
      ...e,
      [k]: null
    }));
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Looks like an invalid email';
    if (!form.who) e.who = 'Help us route this — pick one';
    if (!form.message.trim()) e.message = 'Tell us what we can help with';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async ev => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrors({
          _submit: 'Something went wrong. Please email us directly at info@destrosec.com.'
        });
      }
    } catch {
      setErrors({
        _submit: 'Network error. Please try again or email info@destrosec.com.'
      });
    } finally {
      setSending(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "page contact-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("section", {
    className: "contact-hero"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "CONTACT"), /*#__PURE__*/React.createElement("h1", {
    className: "contact-h1"
  }, "Let's talk", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-brand)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 580
    }
  }, "Got a project, a question, or want to host us at your college? Drop a note. A real human will reply within 24 hours."))), /*#__PURE__*/React.createElement("div", {
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "contact-form-wrap"
  }, submitted ? /*#__PURE__*/React.createElement("div", {
    className: "contact-success glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "success-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "14",
    stroke: "#06d6a0",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 16l4 4 8-8",
    stroke: "#06d6a0",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("h2", null, "Thanks ", form.name.split(' ')[0], "."), /*#__PURE__*/React.createElement("p", null, "We'll get back to you at ", /*#__PURE__*/React.createElement("span", {
    className: "text-brand mono"
  }, form.email), " within 24 hours on business days."), /*#__PURE__*/React.createElement("div", {
    className: "success-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => onNav('about')
  }, "Meet the team \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => {
      setSubmitted(false);
      setForm({
        name: '',
        email: '',
        who: '',
        message: ''
      });
    }
  }, "Send another"))) : /*#__PURE__*/React.createElement("form", {
    className: "contact-form",
    onSubmit: handleSubmit,
    noValidate: true
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name",
    id: "name",
    required: true,
    error: errors.name
  }, /*#__PURE__*/React.createElement("input", {
    id: "name",
    value: form.name,
    onChange: e => update('name', e.target.value),
    placeholder: "Jane Doe",
    autoComplete: "name"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email address",
    id: "email",
    required: true,
    error: errors.email
  }, /*#__PURE__*/React.createElement("input", {
    id: "email",
    type: "email",
    value: form.email,
    onChange: e => update('email', e.target.value),
    placeholder: "jane@company.com",
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "I am a...",
    id: "who",
    required: true,
    error: errors.who
  }, /*#__PURE__*/React.createElement("div", {
    className: "button-group",
    role: "group",
    "aria-labelledby": "who-label"
  }, ['Company', 'College', 'Student', 'Other'].map(opt => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: opt,
    className: `bg-option ${form.who === opt ? 'active' : ''}`,
    onClick: () => update('who', opt),
    "aria-pressed": form.who === opt
  }, opt)))), /*#__PURE__*/React.createElement(Field, {
    label: "Message",
    id: "message",
    required: true,
    hint: `${form.message.length}/500`,
    error: errors.message
  }, /*#__PURE__*/React.createElement("textarea", {
    id: "message",
    rows: "5",
    maxLength: "500",
    value: form.message,
    onChange: e => update('message', e.target.value),
    placeholder: "A line or two about what you're working on..."
  })), errors._submit && /*#__PURE__*/React.createElement("div", {
    className: "field-error",
    role: "alert"
  }, errors._submit), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "website",
    tabIndex: "-1",
    autoComplete: "off",
    style: {
      position: 'absolute',
      left: '-9999px',
      opacity: 0
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary btn-lg",
    style: {
      alignSelf: 'flex-start'
    },
    disabled: sending,
    "aria-busy": sending
  }, sending ? 'Sending…' : 'Send message', !sending && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8M7 3l4 4-4 4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("aside", {
    className: "contact-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-label mono"
  }, "EMAIL"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@destrosec.com",
    className: "info-value"
  }, "info@destrosec.com")), /*#__PURE__*/React.createElement("div", {
    className: "info-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-label mono"
  }, "RESPONSE TIME"), /*#__PURE__*/React.createElement("div", {
    className: "rt-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rt-tag rt-incident"
  }, "Active incident"), /*#__PURE__*/React.createElement("span", {
    className: "rt-time"
  }, "< 1 hour, 24/7")), /*#__PURE__*/React.createElement("div", {
    className: "rt-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rt-tag rt-quote"
  }, "Quote / scoping"), /*#__PURE__*/React.createElement("span", {
    className: "rt-time"
  }, "< 24 hours, business days")), /*#__PURE__*/React.createElement("div", {
    className: "rt-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rt-tag rt-edu"
  }, "College / student"), /*#__PURE__*/React.createElement("span", {
    className: "rt-time"
  }, "2\u20133 business days")))), /*#__PURE__*/React.createElement("div", {
    className: "info-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-label mono"
  }, "WHATSAPP"), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/919876543210",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "info-value wa-link"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    style: {
      verticalAlign: '-3px',
      marginRight: 6
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1.1 3 .9 3.5.8.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"
  })), "+91 98765 43210"), /*#__PURE__*/React.createElement("div", {
    className: "text-muted",
    style: {
      fontSize: 12,
      marginTop: 4
    }
  }, "For quick questions and scoping. No incidents on this line.")), /*#__PURE__*/React.createElement("div", {
    className: "info-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-label mono"
  }, "SOCIAL"), /*#__PURE__*/React.createElement("div", {
    className: "info-stack"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://linkedin.com/company/destro-sec",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "linkedin.com/company/destro-sec"), /*#__PURE__*/React.createElement("a", {
    href: "https://instagram.com/destro_sec",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "instagram.com/destro_sec"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/destrosec",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "github.com/destrosec"))), /*#__PURE__*/React.createElement("div", {
    className: "info-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-label mono"
  }, "BASED IN"), /*#__PURE__*/React.createElement("div", {
    className: "info-value"
  }, "Bangalore, India"), /*#__PURE__*/React.createElement("div", {
    className: "text-muted",
    style: {
      fontSize: 13,
      marginTop: 6
    }
  }, "Remote-first. We work with teams globally.")), /*#__PURE__*/React.createElement("div", {
    className: "info-block info-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-label mono"
  }, "URGENT?"), /*#__PURE__*/React.createElement("p", {
    className: "text-secondary",
    style: {
      fontSize: 14,
      marginBottom: 12
    }
  }, "Active engagement client with an incident? Use the IR retainer line in your engagement docs."))))), /*#__PURE__*/React.createElement("section", {
    className: "contact-faq",
    "aria-label": "Frequently asked questions"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    className: "section-h2",
    style: {
      marginBottom: 32
    }
  }, "Common questions.")), /*#__PURE__*/React.createElement("div", {
    className: "faq-list"
  }, [{
    q: 'Do you work with teams outside India?',
    a: "Yes. About 30% of our work is with Nordic, SE Asia, and US teams. Remote-first since day one."
  }, {
    q: 'Can you sign our NDA before scoping?',
    a: "Of course. We sign first, scope second. Send it on the contact form or to legal@destrosec.com."
  }, {
    q: 'What does an engagement actually cost?',
    a: "Pen tests start around ₹3L for a focused web app. Red teams from ₹15L. Software builds quoted by sprint. Education engagements are bespoke. We give honest numbers on the first call — no per-hour mystery boxes."
  }, {
    q: 'Is there a difference between you and a Big-4 firm?',
    a: "Yes. They send three names to the SOW and a different junior on the engagement. We send the founders, and they stay until the report is signed."
  }, {
    q: 'Do you offer retainers or just one-off work?',
    a: "Both. Retainers come with a real human number on-call and quarterly threat-model reviews."
  }, {
    q: 'I’m a student — can I learn from you for free?',
    a: "Yes. Our community CTFs are free, and we run scholarships for the bootcamp. Hit the contact form and tell us about yourself."
  }].map((f, i) => /*#__PURE__*/React.createElement(FaqItem, {
    key: i,
    q: f.q,
    a: f.a
  }))))));
};
const FaqItem = ({
  q,
  a
}) => {
  const [open, setOpen] = useState(false);
  const bodyId = `faq-body-${q.slice(0, 20).replace(/\s/g, '-')}`;
  return /*#__PURE__*/React.createElement("div", {
    className: `faq-item ${open ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("button", {
    className: "faq-q",
    onClick: () => setOpen(o => !o),
    "aria-expanded": open,
    "aria-controls": bodyId
  }, /*#__PURE__*/React.createElement("span", null, q), /*#__PURE__*/React.createElement("span", {
    className: "faq-icon",
    "aria-hidden": true
  }, open ? '−' : '+')), open && /*#__PURE__*/React.createElement("div", {
    className: "faq-a",
    id: bodyId,
    role: "region"
  }, a));
};
const Field = ({
  label,
  id,
  required,
  hint,
  error,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: `field ${error ? 'has-error' : ''}`
}, /*#__PURE__*/React.createElement("label", {
  htmlFor: id,
  className: "field-label"
}, label, required && /*#__PURE__*/React.createElement("span", {
  className: "req",
  "aria-label": "required"
}, "*"), hint && /*#__PURE__*/React.createElement("span", {
  className: "field-hint mono",
  "aria-live": "polite"
}, hint)), children, error && /*#__PURE__*/React.createElement("div", {
  className: "field-error",
  role: "alert"
}, error));
window.ContactPage = ContactPage;
window.Field = Field;
window.FaqItem = FaqItem;