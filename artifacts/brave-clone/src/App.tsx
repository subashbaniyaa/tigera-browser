import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Globe2, Menu, Minus, Plus, Search, ShieldCheck, Sparkles, X, Zap } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const logo = `${import.meta.env.BASE_URL}images/tigera-icon.png`;

type NavKey = 'browser' | 'search' | 'ai' | 'business' | null;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNav, setOpenNav] = useState<NavKey>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleNav = (key: Exclude<NavKey, null>) => setOpenNav((current) => current === key ? null : key);

  return (
    <header className="site-header" data-testid="header-main">
      <a href="#top" className="brand-link" data-testid="link-brand">
        <span className="brand-lockup"><img src={logo} alt="Tigera" className="brand-logo" /><span className="brand-name">tigera</span></span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <button className={`nav-item ${openNav === 'browser' ? 'active' : ''}`} onClick={() => toggleNav('browser')} data-testid="button-nav-browser">Browser <ChevronDown size={14} /></button>
        <button className={`nav-item ${openNav === 'search' ? 'active' : ''}`} onClick={() => toggleNav('search')} data-testid="button-nav-search">Search <ChevronDown size={14} /></button>
        <button className={`nav-item ${openNav === 'ai' ? 'active' : ''}`} onClick={() => toggleNav('ai')} data-testid="button-nav-ai">Private AI <ChevronDown size={14} /></button>
      </nav>
      <div className="header-actions">
        <button className="search-trigger" onClick={() => setSearchOpen(true)} aria-label="Search the Web" data-testid="button-open-search"><Search size={17} /><span>Search the Web</span></button>
        <a href="#download" className="header-cta" data-testid="link-get-tigera">Get Tigera Browser</a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu" data-testid="button-open-menu"><Menu size={22} /></button>
      </div>
      {openNav && (
        <div className="nav-dropdown" data-testid={`dropdown-${openNav}`}>
          {openNav === 'browser' && <><div className="dropdown-kicker">Tigera Browser</div><a href="#browser">The browser that puts you first <ArrowRight size={16} /></a><a href="#features">Browser features <ArrowRight size={16} /></a><a href="#download">Download Tigera <ArrowRight size={16} /></a></>}
          {openNav === 'search' && <><div className="dropdown-kicker">Tigera Search</div><a href="#search">Search without being tracked <ArrowRight size={16} /></a><a href="#search">How Tigera Search works <ArrowRight size={16} /></a></>}
          {openNav === 'ai' && <><div className="dropdown-kicker">Tigera AI, your AI assistant</div><a href="#leo">Ask tigera AI anything <ArrowRight size={16} /></a><a href="#leo">Private by design <ArrowRight size={16} /></a></>}
          {openNav === 'business' && <><div className="dropdown-kicker">Tigera for business</div><a href="#developers">Search API <ArrowRight size={16} /></a><a href="#developers">Tigera Ads <ArrowRight size={16} /></a></>}
        </div>
      )}
      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-label="Search the Web" data-testid="dialog-search">
          <div className="search-dialog">
            <div className="search-dialog-top"><span className="dialog-label">Search the Web</span><button onClick={() => setSearchOpen(false)} aria-label="Close search" data-testid="button-close-search"><X size={21} /></button></div>
            <div className="search-input-wrap"><Search size={24} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What do you want to know?" data-testid="input-web-search" /><button onClick={() => setSearchOpen(false)} data-testid="button-submit-search"><ArrowRight size={20} /></button></div>
            <p className="search-hint">{query ? `Press enter to search Tigera for “${query}”` : 'Private search. No profiling. No filter bubble.'}</p>
          </div>
        </div>
      )}
      {menuOpen && (
        <div className="mobile-menu" data-testid="menu-mobile">
          <div className="mobile-menu-head"><span className="brand-lockup"><img src={logo} alt="Tigera" className="brand-logo" /><span className="brand-name">Tigera</span></span><button onClick={() => setMenuOpen(false)} aria-label="Close menu" data-testid="button-close-menu"><X size={25} /></button></div>
          <a href="#browser" onClick={() => setMenuOpen(false)}>Browser <ArrowRight size={18} /></a>
          <a href="#search" onClick={() => setMenuOpen(false)}>Search <ArrowRight size={18} /></a>
          <a href="#leo" onClick={() => setMenuOpen(false)}>Private AI <ArrowRight size={18} /></a>
          <a href="#developers" onClick={() => setMenuOpen(false)}>Search API <ArrowRight size={18} /></a>
          <a href="#download" className="mobile-download" onClick={() => setMenuOpen(false)}>Get Tigera <ArrowRight size={18} /></a>
        </div>
      )}
    </header>
  );
}

function BrowserArtwork() {
  return (
    <div className="browser-artwork" aria-label="Tigera browser interface illustration" data-testid="art-browser-window">
      <div className="browser-chrome"><div className="window-dots"><i /><i /><i /></div><span className="address-pill"><ShieldCheck size={13} /> tigera.com</span><span className="chrome-actions">•••</span></div>
      <div className="browser-page">
        <div className="art-hero-line" /><div className="art-title">The web,<br /><em>you can trust<br></br>without fear.</em></div>
        <div className="art-cards"><div className="art-card orange" /><div className="art-card violet" /><div className="art-card yellow" /></div>
        <div className="floating-stat"><ShieldCheck size={15} /><div><strong>7 trackers blocked!</strong></div></div>
        <div className="cursor-arrow"><ArrowDownRight size={30} /></div>
      </div>
    </div>
  );
}

function FeatureCard({ kind, title, text, action }: { kind: string; title: string; text: string; action: string }) {
  return <article className={`feature-card feature-${kind}`} data-testid={`card-feature-${kind}`}>
    <div className="feature-visual">{kind === 'search' && <div className="search-art"><div className="search-art-bar"><Search size={15} /> Tigera Search <span>⌕</span></div><div className="search-result-line long" /><div className="search-result-line" /><div className="search-result-line short" /></div>}
      {kind === 'vpn' && <div className="vpn-art"><div className="vpn-orbit orbit-one" /><div className="vpn-orbit orbit-two" /><div className="vpn-lock"><ShieldCheck size={33} /></div><span>protected</span></div>}
      {kind === 'new' && <div className="new-art"><div className="new-sun" /><div className="new-grid" /><span className="new-letter">AI</span><div className="new-sticker">NEW</div></div>}
    </div>
    <div className="feature-copy"><div><div className="eyebrow">{kind === 'search' ? '01 / Search' : kind === 'vpn' ? '02 / Protection' : '03 / Updates'}</div><h3>{title}</h3><p>{text}</p></div><a href={kind === 'search' ? '#search' : kind === 'vpn' ? '#privacy' : '#whats-new'} data-testid={`link-feature-${kind}`}>{action} <ArrowRight size={17} /></a></div>
  </article>;
}

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    const onScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const faqs = ['Why should I use a privacy browser?', 'Is Tigera really free?', 'Can I bring my bookmarks and passwords?', 'What makes Tigera different?'];

  return (
    <div className="tigera-page" id="top">
      <Header />
      <main>
        <section className="hero-section" id="browser">
          <div className="hero-background-word"> </div>
          <div className="hero-copy">
            <h1 className="reveal reveal-delay-1">The browser<br />that <em>puts you first.</em></h1>
            <p className="hero-description reveal reveal-delay-2">Block ads. Save data. And browse faster. Tigera is a privacy-first browser that puts you back in control.</p>
            <div className="hero-buttons reveal reveal-delay-3"><a className="primary-button" href="#download" data-testid="button-hero-download">Get Tigera Browser <ArrowRight size={18} /></a><a className="text-button" href="#features" data-testid="link-hero-features">See how it works <ArrowDownRight size={17} /></a></div>
            <div className="hero-note reveal reveal-delay-3"><div className="tiny-shield"><ShieldCheck size={15} /></div><span>Private. Fast. Free.<br /><b>Available on all your devices.</b></span></div>
          </div>
          <BrowserArtwork />
        </section>

        <section className="intro-section" id="features">
          <div className="section-label"><span>Why Tigera</span><span>01 — 04</span></div>
          <div className="intro-grid"><h2>Finally, a browser<br />that <em>has your back.</em></h2><div><p className="large-copy">The web should work for you—not the other way around. Tigera blocks the trackers and ads that slow you down, so your browsing is faster, safer, and yours again.</p><a className="text-button dark" href="#privacy" data-testid="link-intro-learn">Learn about privacy <ArrowRight size={17} /></a></div></div>
          <div className="marquee" aria-hidden="true"><div>The browser
            that puts you first.  We protect your privacy.  No trackers! No surveillance!  No compromise!  Browse boldly!</div></div>
        </section>

        <section className="feature-section" id="search">
          <div className="feature-heading"><div className="section-label"><span>The Tigera way</span><span>02 — 04</span></div><h2>More of the web.<br /><em>Less of the noise.</em></h2><p>Three reasons millions of people are choosing a better way to browse.</p></div>
          <div className="feature-grid"><FeatureCard kind="search" title="Private search, finally." text="Search the web without being watched. Tigera Search is independent, private, and built for real answers." action="Explore Search" /><FeatureCard kind="vpn" title="Powerful VPN." text="Protect every app, on every device. One subscription keeps your digital life private wherever you go." action="Meet Tigera VPN" /><FeatureCard kind="new" title="See what's new in Tigera." text="Fresh features, sharper privacy, and more ways to make the web work for you." action="What's new" /></div>
        </section>

        <section className="privacy-section" id="privacy">
          <div className="privacy-orbit" />
          <div className="privacy-content"><h2>Your data.<br /><em>Still yours.</em></h2><p>Tigera is built on a simple idea: privacy is not a feature. It’s a right. Every Tigera product is designed to keep your information out of the hands of advertisers and data brokers.</p><a className="light-button" href="#download" data-testid="button-privacy-download">Take back your web <ArrowRight size={18} /></a></div>
          <div className="privacy-list"><div className="privacy-list-heading">What Tigera blocks</div>{['Ads and trackers', 'Fingerprinting', 'Cross-site cookies', 'Surveillance capitalism'].map((item, i) => <div className="privacy-row" key={item}><span>0{i + 1}</span><strong>{item}</strong><Check size={17} /></div>)}</div>
        </section>

        <section className="ecosystem-section" id="leo">
          <div className="section-label"><span>One browser. Many powers.</span><span>03 — 04</span></div>
          <div className="ecosystem-grid"><div><h2>Meet your new<br /><em>daily driver.</em></h2><p>Tigera gives you a faster browser, a private search engine, and an AI assistant that respects your privacy—all in one place.</p><a className="primary-button" href="#download" data-testid="button-ecosystem-download">Download Tigera <ArrowRight size={18} /></a></div><div className="leo-card"><div className="leo-top"><span className="leo-mark"><Sparkles size={16} /></span><span>Tigera AI</span><span className="leo-private">Private AI</span></div><div className="leo-chat"><div className="chat-bubble user">Summarize this page for me.</div><div className="chat-bubble leo"><span className="leo-avatar"><Sparkles size={12} /></span>Here’s the short version: the web can be better—and you’re in control.</div></div><div className="leo-input">Ask Tigera AI anything <ArrowRight size={15} /></div></div></div>
        </section>

        <section className="developer-section" id="developers">
          <div className="developer-poster"><div className="poster-stamp">OPEN<br />SOURCE</div><div className="poster-word">BUILD<br /><em>TIGERA.</em></div><div className="poster-bottom"><span>For developers & teams</span><ArrowUpRightIcon /></div></div>
          <div className="developer-copy"><h2>An open web<br />needs <em>bold</em><br />people.</h2><p>Whether you’re building the next big thing or just looking for a better way to work, Tigera gives you tools that put people—not platforms—first.</p><div className="developer-links"><a href="#developers" data-testid="link-search-api">Tigera Search API <ArrowRight size={17} /></a><a href="#developers" data-testid="link-tigera-ads">Tigera Ads <ArrowRight size={17} /></a></div></div>
        </section>

        <section className="faq-section">
           <div className="section-label"><span>Questions, answered</span><span>04 — 04</span></div><div className="faq-grid"><h2>Good to<br /><em>know.</em></h2><div className="faq-list">{faqs.map((faq, i) => <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={faq}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} data-testid={`button-faq-${i}`}><span>{faq}</span>{openFaq === i ? <Minus size={19} /> : <Plus size={19} />}</button>{openFaq === i && <p>{i === 0 ? 'Most browsers collect information about what you do online. Tigera blocks trackers by default, so your browsing stays private and pages load faster.' : i === 1 ? 'Yes. Tigera Browser is free to download and use, with no hidden fees.' : i === 2 ? 'Yes. Import your bookmarks, passwords, extensions, and settings in just a few clicks.' : 'Tigera is independent, open-source, and built around your privacy—not an advertising business.'}</p>}</div>)}</div></div>
        </section>

        <section className="download-section" id="download"><div className="download-art"><div className="download-sun" /><Globe2 size={120} strokeWidth={0.6} /><div className="download-orbit" /></div><div className="download-copy"><h2>Browse<br /><em>boldly.</em></h2><p>It only takes a minute to make the switch.</p><a className="primary-button" href="#top" data-testid="button-final-download">Get Tigera for free <ArrowRight size={18} /></a><small>Available for Windows, macOS, Linux, iOS, and Android.</small></div></section>
      </main>
       <footer className="site-footer"><div className="footer-main"><span className="brand-lockup"><img src={logo} alt="Tigera" className="brand-logo" /></span><p>The browser that puts you first.</p><div className="footer-socials"><a href="#top" data-testid="link-footer-x">X</a><a href="#top" data-testid="link-footer-github">GH</a><a href="#top" data-testid="link-footer-reddit">r/</a></div></div><div className="footer-links"><div><span>Products</span><a href="#browser">Browser</a><a href="#search">Search</a><a href="#leo">Tigera AI</a><a href="#privacy">VPN</a></div><div><span>Company</span><a href="#developers">About Tigera</a><a href="#developers">Careers</a><a href="#developers">Newsroom</a><a href="#developers">Help center</a></div><div><span>Legal</span><a href="#top">Privacy policy</a><a href="#top">Terms of use</a><a href="#top">Transparency</a><a href="#top">Status</a></div></div><div className="footer-bottom"><span>© 2026 Tigera Software, Inc.</span><span>Browse Boldly.</span></div></footer>
    </div>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={17} />;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;