import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const STORY_SECTIONS = [
  { id: 'top', label: 'Start' },
  { id: 'problem', label: 'The problem' },
  { id: 'process', label: 'The process' },
  { id: 'model', label: 'The model' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'faq', label: 'Questions' },
];

const DASHBOARDS = [
  {
    number: '01',
    title: 'Federation',
    description: 'See how banks collaborate without sharing raw traffic.',
    to: '/federation',
  },
  {
    number: '02',
    title: 'Privacy & Trust',
    description: 'Understand the protections around every model update.',
    to: '/privacy',
  },
  {
    number: '03',
    title: 'Detection Performance',
    description: 'Explore what improves when intelligence is shared.',
    to: '/performance',
  },
  {
    number: '04',
    title: 'Methodology & Scope',
    description: 'Review the data, model design, and limitations.',
    to: '/methodology',
  },
];

const FAQS = [
  {
    question: 'Does Consilience move raw bank traffic?',
    answer: 'No. Each institution keeps its raw traffic inside its own environment. The shared workflow works with protected model updates instead.',
  },
  {
    question: 'What is federated learning?',
    answer: 'Federated learning lets several participants improve a shared model while training locally on their own data boundaries.',
  },
  {
    question: 'Are the results live bank results?',
    answer: 'No. The current experience uses simulated CICIDS2017 demo data to make the workflow understandable and inspectable.',
  },
  {
    question: 'Who is this experience for?',
    answer: 'It is designed for people evaluating privacy-preserving collaboration across financial institutions, security teams, and research environments.',
  },
];

function useRevealAnimation() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}


function useSmoothSectionNavigation() {
  useEffect(() => {
    const internalLinks = document.querySelectorAll('.landing-page a[href^="#"]');

    const handleClick = (event) => {
      const link = event.currentTarget;
      const href = link.getAttribute('href');
      const target = href ? document.querySelector(href) : null;

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      target.classList.remove('section-focus');
      window.requestAnimationFrame(() => target.classList.add('section-focus'));
      window.setTimeout(() => target.classList.remove('section-focus'), 900);
      window.history.replaceState(null, '', href);
    };

    internalLinks.forEach((link) => link.addEventListener('click', handleClick));
    return () => internalLinks.forEach((link) => link.removeEventListener('click', handleClick));
  }, []);
}



function FederationDiagram() {
  return (
    <div className="federation-diagram" aria-label="Three banks contribute protected updates to one shared model">
      <div className="diagram-orbit diagram-orbit-one" />
      <div className="diagram-orbit diagram-orbit-two" />

      <div className="bank-node bank-node-a" data-reveal style={{ '--delay': '80ms' }}>
        <span className="bank-icon" aria-hidden="true">⌂</span>
        <span>BANK A</span>
      </div>
      <div className="bank-node bank-node-b" data-reveal style={{ '--delay': '160ms' }}>
        <span className="bank-icon" aria-hidden="true">⌂</span>
        <span>BANK B</span>
      </div>
      <div className="bank-node bank-node-c" data-reveal style={{ '--delay': '240ms' }}>
        <span className="bank-icon" aria-hidden="true">⌂</span>
        <span>BANK C</span>
      </div>

      <svg className="diagram-lines" viewBox="0 0 620 470" role="presentation">
        <path d="M155 92 C220 115 265 170 310 228" />
        <path d="M465 92 C400 115 355 170 310 228" />
        <path d="M90 337 C180 320 238 285 310 248" />
        <circle cx="310" cy="238" r="4" />
      </svg>

      <div className="model-node" data-reveal style={{ '--delay': '340ms' }}>
        <div className="model-core">
          <span className="model-dot model-dot-one" />
          <span className="model-dot model-dot-two" />
          <span className="model-dot model-dot-three" />
          <span className="model-dot model-dot-four" />
          <span className="model-link model-link-one" />
          <span className="model-link model-link-two" />
          <span className="model-link model-link-three" />
        </div>
        <strong>CONSILIENCE</strong>
        <span>SHARED MODEL</span>
      </div>

      <div className="diagram-caption" data-reveal style={{ '--delay': '460ms' }}>
        <span className="caption-line" />
        <span>The model travels.
The raw traffic does not.</span>
      </div>
    </div>
  );
}

function LandingPage() {
  const [activeSection, setActiveSection] = useState('top');
  const [openFaq, setOpenFaq] = useState(null);

  useRevealAnimation();
  useSmoothSectionNavigation();

  useEffect(() => {
    const sectionItems = document.querySelectorAll('[data-story-section]');

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-12% 0px -42% 0px' },
    );

    sectionItems.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <a className="landing-wordmark" href="#top" aria-label="Consilience home">CONSiLIENCE</a>
        <nav className="landing-nav-links" aria-label="Landing page navigation">
          <a href="#problem">What we do</a>
          <a href="#process">How it works</a>
          <a href="#dashboards">Dashboards</a>
          <a href="#faq">FAQ</a>
        </nav>
        <Link className="nav-cta" to="/dashboards">
          Open dashboard collection <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <aside className="story-rail" aria-label="Page progress">
        <div className="story-rail-line" />
        {STORY_SECTIONS.map((section, index) => (
          <a
            href={`#${section.id}`}
            className={`story-rail-item${activeSection === section.id ? ' is-active' : ''}`}
            key={section.id}
            aria-label={`Go to ${section.label}`}
          >
            <span>{String(index).padStart(2, '0')}</span>
            <i />
          </a>
        ))}
      </aside>

      <main>
        <section className="landing-section hero-section" id="top" data-story-section>
          <div className="section-inner hero-inner">
            <div className="hero-copy">
              <p className="eyebrow" data-reveal>FEDERATED SECURITY INTELLIGENCE</p>
              <h1 data-reveal style={{ '--delay': '100ms' }}>
  Shared intelligence. <em>Private by design.</em>
</h1>
              <p className="hero-description" data-reveal style={{ '--delay': '180ms' }}>
                Consilience helps banks learn from collective attack patterns without pooling raw traffic or weakening the boundary around sensitive data.
              </p>
              <div className="hero-actions" data-reveal style={{ '--delay': '260ms' }}>
                <Link className="primary-action" to="/dashboards">Explore dashboards <span aria-hidden="true">→</span></Link>
                <a className="text-action" href="#process">See how it works <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <FederationDiagram />
          </div>
          <div className="scroll-cue" data-reveal style={{ '--delay': '620ms' }}>
            <span className="scroll-cue-line" />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </section>

        <section className="landing-section problem-section" id="problem" data-story-section>
          <div className="section-inner statement-inner">
            <p className="section-index" data-reveal>01 / THE PROBLEM</p>
            <h2 data-reveal style={{ '--delay': '100ms' }}>Threats repeat.
<em>Raw data should not.</em></h2>
            <p className="statement-support" data-reveal style={{ '--delay': '200ms' }}>
              Financial institutions often see related attack patterns, but the data needed to learn from them cannot simply be placed in one room.
            </p>
            <div className="statement-rule" data-reveal style={{ '--delay': '300ms' }} />
          </div>
        </section>

        <section className="landing-section process-section" id="process" data-story-section>
          <div className="section-inner process-inner">
            <div className="process-heading">
              <p className="section-index" data-reveal>02 / THE PROCESS</p>
              <h2 data-reveal style={{ '--delay': '100ms' }}>Keep the boundary.
<em>Improve the model.</em></h2>
            </div>
            <div className="process-track" aria-label="Train locally, protect the update, improve together">
              <div className="process-line" />
              <article className="process-step" data-reveal style={{ '--delay': '120ms' }}>
                <span className="step-number">01</span>
                <strong>LOCAL</strong>
                <p>Each bank trains inside its own environment.</p>
              </article>
              <article className="process-step process-step-active" data-reveal style={{ '--delay': '220ms' }}>
                <span className="step-number">02</span>
                <strong>PROTECTED</strong>
                <p>Only a protected model update leaves the boundary.</p>
              </article>
              <article className="process-step" data-reveal style={{ '--delay': '320ms' }}>
                <span className="step-number">03</span>
                <strong>SHARED</strong>
                <p>The collective model becomes stronger for everyone.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="landing-section model-section" id="model" data-story-section>
          <div className="section-inner model-inner">
            <p className="section-index" data-reveal>03 / THE MODEL</p>
            <div className="model-section-copy" data-reveal style={{ '--delay': '100ms' }}>
              <h2>The model travels.
<em>The raw traffic does not.</em></h2>
              <p>That is the privacy boundary in one sentence.</p>
            </div>
            <div className="model-architecture" data-reveal style={{ '--delay': '220ms' }}>
            <div className="architecture-banks" aria-label="Three banks train locally">
                <div className="architecture-bank" data-reveal style={{ '--delay': '80ms' }}>
                <span className="architecture-bank-mark">A</span>
                <span><strong>BANK A</strong><small>local training</small></span>
                </div>
                <div className="architecture-bank" data-reveal style={{ '--delay': '140ms' }}>
                <span className="architecture-bank-mark">B</span>
                <span><strong>BANK B</strong><small>local training</small></span>
                </div>
                <div className="architecture-bank" data-reveal style={{ '--delay': '200ms' }}>
                <span className="architecture-bank-mark">C</span>
                <span><strong>BANK C</strong><small>local training</small></span>
                </div>
            </div>

            <div className="architecture-flow" data-reveal style={{ '--delay': '280ms' }}>
                <span className="architecture-flow-label">protected
            updates</span>
                <div className="architecture-flow-line">
                <i /><i /><i />
                </div>
                <span className="architecture-lock">⌑</span>
            </div>

            <div className="architecture-shared" data-reveal style={{ '--delay': '360ms' }}>
                <div className="architecture-shared-core" aria-hidden="true">
                <span className="architecture-node node-one" />
                <span className="architecture-node node-two" />
                <span className="architecture-node node-three" />
                <span className="architecture-node node-four" />
                <span className="architecture-node node-five" />
                <i className="architecture-edge edge-one" />
                <i className="architecture-edge edge-two" />
                <i className="architecture-edge edge-three" />
                <i className="architecture-edge edge-four" />
                </div>
                <strong>SHARED MODEL</strong>
                <small>collective intelligence</small>
            </div>

            <div className="architecture-return" data-reveal style={{ '--delay': '440ms' }}>
                <span className="architecture-return-arrow">↙</span>
                <span className="architecture-return-line" />
                <span>improved model returns to every bank</span>
            </div>
            </div>
          </div>
        </section>

        <section className="landing-section dashboards-section" id="dashboards" data-story-section>
          <div className="section-inner dashboards-inner">
            <div className="dashboard-heading">
              <p className="section-index" data-reveal>04 / DASHBOARD COLLECTION</p>
              <h2 data-reveal style={{ '--delay': '100ms' }}>Choose where to go next.</h2>
              <p data-reveal style={{ '--delay': '180ms' }}>One front door into the parts of the system you want to understand.</p>
            </div>
            <div className="dashboard-links">
              {DASHBOARDS.map((dashboard, index) => (
                <Link
                  to={dashboard.to}
                  className="dashboard-link"
                  data-reveal
                  style={{ '--delay': `${220 + index * 80}ms` }}
                  key={dashboard.title}
                >
                  <span className="dashboard-number">{dashboard.number}</span>
                  <span className="dashboard-link-copy">
                    <strong>{dashboard.title}</strong>
                    <span>{dashboard.description}</span>
                  </span>
                  <span className="dashboard-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section faq-section" id="faq" data-story-section>
          <div className="section-inner faq-inner">
            <div className="faq-heading">
              <p className="section-index" data-reveal>05 / FAQ</p>
              <h2 data-reveal style={{ '--delay': '100ms' }}>Questions worth asking.</h2>
            </div>
            <div className="faq-list" data-reveal style={{ '--delay': '180ms' }}>
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={faq.question}>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-plus" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div className="faq-answer"><p>{faq.answer}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <a className="landing-wordmark" href="#top">CONSiLIENCE</a>
        <span>Built for shared learning without shared exposure.</span>
        <Link to="/dashboards">Explore dashboard collection <span aria-hidden="true">↗</span></Link>
      </footer>
    </div>
  );
}

export default LandingPage;