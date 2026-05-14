// quote.jsx — Multi-step quote form
//
// SETUP: Replace FORMSPREE_ENDPOINT with your Formspree form URL.
// Sign up free at https://formspree.io → create a form → copy the endpoint.
const FORMSPREE_QUOTE_ENDPOINT = 'https://formspree.io/f/YOUR_QUOTE_FORM_ID';
const QuotePage = ({
  onNav,
  initialVertical
}) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    who: '',
    name: '',
    email: '',
    vertical: initialVertical || '',
    need: '',
    timeline: '',
    budget: '',
    size: '',
    note: '',
    source: '',
    incident: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const update = (k, v) => {
    setData(d => ({
      ...d,
      [k]: v
    }));
    if (errors[k]) setErrors(e => ({
      ...e,
      [k]: null
    }));
  };
  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!data.who) e.who = 'Pick one';
      if (!data.name.trim()) e.name = 'Required';
      if (!data.email.trim()) e.email = 'Required';else if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) e.email = 'Invalid email';
    } else if (step === 2) {
      if (!data.vertical) e.vertical = 'Pick a vertical';
      if (!data.need.trim()) e.need = 'A sentence or two helps a lot';
    } else if (step === 3) {
      if (!data.timeline) e.timeline = 'Pick a timeline';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const next = () => {
    if (validateStep()) setStep(s => Math.min(4, s + 1));
  };
  const back = () => setStep(s => Math.max(1, s - 1));
  const submit = async () => {
    setSending(true);
    try {
      const payload = {
        ...data,
        vertical: data.vertical === 'combo' ? 'Combination' : VERTICAL_DATA[data.vertical]?.name || data.vertical
      };
      const res = await fetch(FORMSPREE_QUOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrors({
          _submit: 'Something went wrong. Please email info@destrosec.com directly.'
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
  const steps = ['About you', 'Your need', 'Scope', 'Review'];
  if (submitted) {
    return /*#__PURE__*/React.createElement("div", {
      className: "page quote-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "quote-success glass"
    }, /*#__PURE__*/React.createElement("div", {
      className: "success-icon"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "40",
      height: "40",
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
    }))), /*#__PURE__*/React.createElement("h1", null, "Request received, ", data.name.split(' ')[0], "."), /*#__PURE__*/React.createElement("p", {
      className: "lead"
    }, "We'll be in touch at ", /*#__PURE__*/React.createElement("span", {
      className: "text-brand mono"
    }, data.email), " within 24 hours with a real human and a real plan."), /*#__PURE__*/React.createElement("div", {
      className: "success-summary"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, "VERTICAL"), " ", data.vertical === 'combo' ? 'Combination' : VERTICAL_DATA[data.vertical]?.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, "TIMELINE"), " ", data.timeline), data.budget && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, "BUDGET"), " ", data.budget)), /*#__PURE__*/React.createElement("div", {
      className: "next-steps"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "ns-title mono"
    }, "WHAT HAPPENS NEXT"), /*#__PURE__*/React.createElement("ol", {
      className: "ns-list"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "ns-when mono"
    }, "WITHIN 24h"), /*#__PURE__*/React.createElement("span", {
      className: "ns-what"
    }, "A founder reads your request and replies \u2014 not a bot, not an SDR.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "ns-when mono"
    }, "DAY 2\u20133"), /*#__PURE__*/React.createElement("span", {
      className: "ns-what"
    }, "30-min scoping call. We map your threat model and the actual question we're answering.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "ns-when mono"
    }, "DAY 4\u20135"), /*#__PURE__*/React.createElement("span", {
      className: "ns-what"
    }, "Written proposal: scope, deliverables, fixed price, calendar.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
      className: "ns-when mono"
    }, "DAY 7+"), /*#__PURE__*/React.createElement("span", {
      className: "ns-what"
    }, "If we're a fit, we sign and start. If not, we'll point you to someone who is.")))), /*#__PURE__*/React.createElement("div", {
      className: "success-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      onClick: () => onNav('about')
    }, "While you wait, meet the team \u2192"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      onClick: () => onNav('home')
    }, "Back to home")))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "page quote-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("section", {
    className: "quote-hero"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "GET A QUOTE"), /*#__PURE__*/React.createElement("h1", {
    className: "quote-h1"
  }, "Tell us what", /*#__PURE__*/React.createElement("br", null), "you're working on.")), /*#__PURE__*/React.createElement("div", {
    className: "quote-incident-banner",
    role: "alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qib-tag mono"
  }, "ACTIVE INCIDENT?"), /*#__PURE__*/React.createElement("div", {
    className: "qib-msg"
  }, "If you're being attacked right now, skip the form. Call ", /*#__PURE__*/React.createElement("a", {
    href: "tel:+919876543200",
    className: "qib-phone"
  }, "+91 98765 43200"), " \u2014 24/7 IR line. We'll keep this form open for everything else.")), /*#__PURE__*/React.createElement("nav", {
    className: "quote-stepper",
    "aria-label": "Form progress"
  }, steps.map((label, i) => {
    const num = i + 1;
    const state = num < step ? 'done' : num === step ? 'active' : 'todo';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: label
    }, /*#__PURE__*/React.createElement("div", {
      className: `step-bubble ${state}`,
      "aria-current": state === 'active' ? 'step' : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "step-circle"
    }, state === 'done' ? /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      "aria-label": "completed"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 7l3 3 5-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })) : num), /*#__PURE__*/React.createElement("div", {
      className: "step-label"
    }, label)), i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: `step-line ${num < step ? 'done' : ''}`,
      "aria-hidden": true
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "quote-form glass"
  }, step === 1 && /*#__PURE__*/React.createElement(Step1, {
    data: data,
    update: update,
    errors: errors
  }), step === 2 && /*#__PURE__*/React.createElement(Step2, {
    data: data,
    update: update,
    errors: errors
  }), step === 3 && /*#__PURE__*/React.createElement(Step3, {
    data: data,
    update: update,
    errors: errors
  }), step === 4 && /*#__PURE__*/React.createElement(Step4, {
    data: data,
    update: update
  }), errors._submit && /*#__PURE__*/React.createElement("div", {
    className: "field-error",
    role: "alert",
    style: {
      margin: '0 0 16px'
    }
  }, errors._submit), /*#__PURE__*/React.createElement("div", {
    className: "quote-nav"
  }, step > 1 && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: back
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), step < 4 ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: next
  }, "Next", /*#__PURE__*/React.createElement("svg", {
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
  }))) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: submit,
    disabled: sending,
    "aria-busy": sending
  }, sending ? 'Sending…' : 'Send my request'))), /*#__PURE__*/React.createElement("div", {
    className: "quote-aside mono",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("span", null, "Step ", step, " of 4 \xB7 ~", [60, 90, 60, 30][step - 1], "s remaining"))));
};
const Step1 = ({
  data,
  update,
  errors
}) => /*#__PURE__*/React.createElement("div", {
  className: "quote-step"
}, /*#__PURE__*/React.createElement("h2", {
  className: "step-title"
}, "Who are you?"), /*#__PURE__*/React.createElement("p", {
  className: "step-sub"
}, "A few basics so we can route this to the right person."), /*#__PURE__*/React.createElement(Field, {
  label: "I am a...",
  id: "who",
  required: true,
  error: errors.who
}, /*#__PURE__*/React.createElement("div", {
  className: "button-group",
  role: "group"
}, ['Company', 'College', 'Individual', 'Other'].map(opt => /*#__PURE__*/React.createElement("button", {
  type: "button",
  key: opt,
  className: `bg-option ${data.who === opt ? 'active' : ''}`,
  onClick: () => update('who', opt),
  "aria-pressed": data.who === opt
}, opt)))), /*#__PURE__*/React.createElement("div", {
  className: "field-row"
}, /*#__PURE__*/React.createElement(Field, {
  label: "Your name",
  id: "qname",
  required: true,
  error: errors.name
}, /*#__PURE__*/React.createElement("input", {
  id: "qname",
  value: data.name,
  onChange: e => update('name', e.target.value),
  placeholder: "Jane Doe"
})), /*#__PURE__*/React.createElement(Field, {
  label: "Your email",
  id: "qemail",
  required: true,
  error: errors.email
}, /*#__PURE__*/React.createElement("input", {
  id: "qemail",
  type: "email",
  value: data.email,
  onChange: e => update('email', e.target.value),
  placeholder: "jane@company.com"
}))));
const Step2 = ({
  data,
  update,
  errors
}) => /*#__PURE__*/React.createElement("div", {
  className: "quote-step"
}, /*#__PURE__*/React.createElement("h2", {
  className: "step-title"
}, "What do you need?"), /*#__PURE__*/React.createElement("p", {
  className: "step-sub"
}, "Pick a vertical and tell us briefly what we can help with."), /*#__PURE__*/React.createElement(Field, {
  label: "Vertical",
  id: "vertical",
  required: true,
  error: errors.vertical
}, /*#__PURE__*/React.createElement("div", {
  className: "vertical-picker",
  role: "group",
  "aria-label": "Choose a vertical"
}, Object.entries(VERTICAL_DATA).map(([key, v]) => /*#__PURE__*/React.createElement("button", {
  type: "button",
  key: key,
  className: `vp-option ${data.vertical === key ? 'active' : ''}`,
  onClick: () => update('vertical', key),
  style: {
    '--accent': v.color,
    '--accent-rgb': v.rgb
  },
  "aria-pressed": data.vertical === key
}, /*#__PURE__*/React.createElement("div", {
  className: "vp-icon"
}, /*#__PURE__*/React.createElement(VerticalIcon, {
  vertical: key,
  size: 22
})), /*#__PURE__*/React.createElement("div", {
  className: "vp-name"
}, v.name))), /*#__PURE__*/React.createElement("button", {
  type: "button",
  className: `vp-option vp-combo ${data.vertical === 'combo' ? 'active' : ''}`,
  onClick: () => update('vertical', 'combo'),
  "aria-pressed": data.vertical === 'combo'
}, /*#__PURE__*/React.createElement("div", {
  className: "vp-icon"
}, /*#__PURE__*/React.createElement("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6",
  "aria-hidden": true
}, /*#__PURE__*/React.createElement("circle", {
  cx: "8",
  cy: "12",
  r: "5"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "16",
  cy: "12",
  r: "5"
}))), /*#__PURE__*/React.createElement("div", {
  className: "vp-name"
}, "Combination")))), /*#__PURE__*/React.createElement(Field, {
  label: "Brief description of need",
  id: "need",
  required: true,
  hint: `${data.need.length}/500`,
  error: errors.need
}, /*#__PURE__*/React.createElement("textarea", {
  id: "need",
  rows: "4",
  maxLength: "500",
  value: data.need,
  onChange: e => update('need', e.target.value),
  placeholder: "Describe your challenge in one or two sentences..."
})));
const Step3 = ({
  data,
  update,
  errors
}) => /*#__PURE__*/React.createElement("div", {
  className: "quote-step"
}, /*#__PURE__*/React.createElement("h2", {
  className: "step-title"
}, "Scope and timeline."), /*#__PURE__*/React.createElement("p", {
  className: "step-sub"
}, "All optional except timeline. The more we know, the more accurate our reply."), /*#__PURE__*/React.createElement(Field, {
  label: "Timeline",
  id: "timeline",
  required: true,
  error: errors.timeline
}, /*#__PURE__*/React.createElement("div", {
  className: "button-group",
  role: "group"
}, ['ASAP', '1–3 months', '3–6 months', '6+ months', 'Not sure'].map(opt => /*#__PURE__*/React.createElement("button", {
  type: "button",
  key: opt,
  className: `bg-option ${data.timeline === opt ? 'active' : ''}`,
  onClick: () => update('timeline', opt),
  "aria-pressed": data.timeline === opt
}, opt)))), /*#__PURE__*/React.createElement(Field, {
  label: "Budget range",
  id: "budget",
  hint: "optional"
}, /*#__PURE__*/React.createElement("div", {
  className: "button-group",
  role: "group"
}, ['Under ₹50K', '₹50K–2L', '₹2L–10L', 'Above ₹10L', 'Prefer to discuss'].map(opt => /*#__PURE__*/React.createElement("button", {
  type: "button",
  key: opt,
  className: `bg-option ${data.budget === opt ? 'active' : ''}`,
  onClick: () => update('budget', opt),
  "aria-pressed": data.budget === opt
}, opt)))), (data.who === 'Company' || data.who === 'College') && /*#__PURE__*/React.createElement(Field, {
  label: "Team / org size",
  id: "size",
  hint: "optional"
}, /*#__PURE__*/React.createElement("div", {
  className: "button-group",
  role: "group"
}, ['1–10', '10–50', '50–200', '200+'].map(opt => /*#__PURE__*/React.createElement("button", {
  type: "button",
  key: opt,
  className: `bg-option ${data.size === opt ? 'active' : ''}`,
  onClick: () => update('size', opt),
  "aria-pressed": data.size === opt
}, opt)))));
const Step4 = ({
  data,
  update
}) => /*#__PURE__*/React.createElement("div", {
  className: "quote-step"
}, /*#__PURE__*/React.createElement("h2", {
  className: "step-title"
}, "Review and send."), /*#__PURE__*/React.createElement("p", {
  className: "step-sub"
}, "A quick check before we route this. Edit any step by going back."), /*#__PURE__*/React.createElement("div", {
  className: "review-grid"
}, /*#__PURE__*/React.createElement("div", {
  className: "review-row"
}, /*#__PURE__*/React.createElement("span", {
  className: "mono"
}, "YOU"), /*#__PURE__*/React.createElement("span", null, data.name, " (", data.who, ") \u2014 ", data.email)), /*#__PURE__*/React.createElement("div", {
  className: "review-row"
}, /*#__PURE__*/React.createElement("span", {
  className: "mono"
}, "VERTICAL"), /*#__PURE__*/React.createElement("span", null, data.vertical === 'combo' ? 'Combination' : VERTICAL_DATA[data.vertical]?.name)), /*#__PURE__*/React.createElement("div", {
  className: "review-row"
}, /*#__PURE__*/React.createElement("span", {
  className: "mono"
}, "NEED"), /*#__PURE__*/React.createElement("span", null, data.need)), /*#__PURE__*/React.createElement("div", {
  className: "review-row"
}, /*#__PURE__*/React.createElement("span", {
  className: "mono"
}, "TIMELINE"), /*#__PURE__*/React.createElement("span", null, data.timeline)), data.budget && /*#__PURE__*/React.createElement("div", {
  className: "review-row"
}, /*#__PURE__*/React.createElement("span", {
  className: "mono"
}, "BUDGET"), /*#__PURE__*/React.createElement("span", null, data.budget)), data.size && /*#__PURE__*/React.createElement("div", {
  className: "review-row"
}, /*#__PURE__*/React.createElement("span", {
  className: "mono"
}, "SIZE"), /*#__PURE__*/React.createElement("span", null, data.size))), /*#__PURE__*/React.createElement(Field, {
  label: "Anything else? (optional)",
  id: "note"
}, /*#__PURE__*/React.createElement("textarea", {
  id: "note",
  rows: "3",
  value: data.note,
  onChange: e => update('note', e.target.value),
  placeholder: "Something we should know up front..."
})), /*#__PURE__*/React.createElement(Field, {
  label: "How did you hear about us?",
  id: "source",
  hint: "optional"
}, /*#__PURE__*/React.createElement("select", {
  id: "source",
  value: data.source,
  onChange: e => update('source', e.target.value)
}, /*#__PURE__*/React.createElement("option", {
  value: ""
}, "Pick one..."), /*#__PURE__*/React.createElement("option", null, "Search engine"), /*#__PURE__*/React.createElement("option", null, "LinkedIn"), /*#__PURE__*/React.createElement("option", null, "Referral from a colleague"), /*#__PURE__*/React.createElement("option", null, "College / workshop"), /*#__PURE__*/React.createElement("option", null, "CTF or community event"), /*#__PURE__*/React.createElement("option", null, "Other"))));
window.QuotePage = QuotePage;