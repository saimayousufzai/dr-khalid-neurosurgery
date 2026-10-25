import { useEffect, useRef, useState } from 'react';
import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Award, BadgeCheck,
  Bone, BrainCircuit, CalendarDays, Check, ChevronDown, CircleCheck, Clock3,
  ExternalLink, Facebook, Globe2, GraduationCap, HeartHandshake, HeartPulse,
  MapPin, Menu, Microscope, Moon, Navigation, Network, PhoneCall, Play, Pause,
  ScanLine, Send, ShieldCheck, Sparkles, Sun, X,
} from 'lucide-react';
import { content, languageLabels } from './translations';

const docPhotos = [
  'images/portrait-clinic.webp',
  'images/portrait-event.webp',
  'images/surgical-room.webp',
  'images/surgical-team.webp',
  'images/portrait-office.webp',
];
const asset = (name) => `${import.meta.env.BASE_URL}${name}`;
const safeStored = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
const specialtyIcons = [BrainCircuit, Bone, Network, ScanLine];
const approachIcons = [HeartHandshake, ScanLine, ShieldCheck, HeartPulse];
const qualificationsIcons = [Award, GraduationCap, Globe2, Microscope];
const ids = ['home', 'about', 'expertise', 'approach', 'gallery', 'contact'];
const whatsappPhone = '93787654751';
const googleMaps = 'https://www.google.com/maps/search/?api=1&query=Rifah+Medical+Complex+Kabul+Afghanistan';

function Brand({ t, compact = false }) {
  return <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#home" aria-label="Dr. Khalid Khan Zadran">
    <span className="brand-icon" aria-hidden="true"><BrainCircuit size={28} strokeWidth={1.35} /></span>
    <span className="brand-copy"><span>DR. KHALID <span className="brand-name-light">ZADRAN</span></span><small>{t.brandSubtitle}</small></span>
  </a>;
}

function Reveal({ children, className = '', delay = 0, ...props }) {
  return <div className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }} {...props}>{children}</div>;
}

function SectionHeading({ eyebrow, first, second, description, inverted = false }) {
  return <div className={`section-heading ${inverted ? 'heading-inverted' : ''}`}>
    <div className="eyebrow"><span className="eyebrow-line" />{eyebrow}</div>
    <h2>{first}{second && <><br /><em>{second}</em></>}</h2>
    {description && <p>{description}</p>}
  </div>;
}

function App() {
  const [language, setLanguage] = useState(() => safeStored('drk-language', 'en'));
  const [theme, setTheme] = useState(() => safeStored('drk-theme', 'dark'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(-1);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [form, setForm] = useState({ name: '', phone: '', specialty: '', message: '' });
  const videoRef = useRef(null);
  const rtl = language !== 'en';
  const t = content[language] || content.en;
  const nav = [
    ['home', t.nav.home], ['about', t.nav.about], ['expertise', t.nav.expertise],
    ['approach', t.nav.journey], ['gallery', t.nav.gallery], ['contact', t.nav.contact],
  ];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    try { localStorage.setItem('drk-language', language); } catch { /* ignore */ }
  }, [language, rtl]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('drk-theme', theme); } catch { /* ignore */ }
  }, [theme]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -32px 0px' });
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [language]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveNav(entry.target.id); });
    }, { threshold: 0, rootMargin: '-34% 0px -58% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen || selectedPhoto >= 0);
    return () => document.body.classList.remove('nav-open');
  }, [mobileOpen, selectedPhoto]);
  useEffect(() => {
    const onEsc = e => {
      if (e.key === 'Escape') { setSelectedPhoto(-1); setMobileOpen(false); }
      if (selectedPhoto >= 0 && e.key === 'ArrowRight') setSelectedPhoto(p => (p + 1) % docPhotos.length);
      if (selectedPhoto >= 0 && e.key === 'ArrowLeft') setSelectedPhoto(p => (p + docPhotos.length - 1) % docPhotos.length);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [selectedPhoto]);
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced && videoRef.current) { videoRef.current.pause(); setVideoPlaying(false); }
  }, []);

  const closeMenu = () => setMobileOpen(false);
  const changeLanguage = (lang) => { setLanguage(lang); setMobileOpen(false); };
  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false)); }
    else { videoRef.current.pause(); setVideoPlaying(false); }
  };
  const changeForm = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submitContact = e => {
    e.preventDefault();
    const specialty = form.specialty === '' ? '' : t.formOptions[Number(form.specialty)];
    const message = [t.whatsappGreeting, '', `${t.whatsappName}: ${form.name}`, `${t.whatsappPhone}: ${form.phone}`,
      specialty ? `${t.whatsappService}: ${specialty}` : '', form.message ? `${t.whatsappMessage}: ${form.message}` : ''].filter(Boolean).join('\n');
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  const nextPhoto = (delta) => setSelectedPhoto(p => (p + delta + docPhotos.length) % docPhotos.length);

  return <div className={`site ${rtl ? 'site-rtl' : ''}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="topbar"><div className="container topbar-inner">
      <div className="topbar-line"><span className="online-dot" />{t.heroTop}</div>
      <a href="tel:+93787654751"><PhoneCall size={13} /> +93 78 765 4751</a>
    </div></div>
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Brand t={t} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([id,label]) => <a key={id} href={`#${id}`} className={activeNav === id ? 'nav-active' : ''}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <div className="lang-switch" aria-label="Select language"><Globe2 size={16}/>
            {languageLabels.map(item => <button key={item.value} onClick={() => changeLanguage(item.value)} className={language === item.value ? 'selected' : ''} aria-pressed={language === item.value}>{item.label}</button>)}
          </div>
          <button className="icon-button theme-toggle" onClick={() => setTheme(v => v === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? t.themeLight : t.themeDark} title={theme === 'dark' ? t.themeLight : t.themeDark}>{theme === 'dark' ? <Sun size={19}/> : <Moon size={19}/>}</button>
          <a href="#contact" className="header-cta"><CalendarDays size={17}/><span>{t.navContact}</span><ArrowUpRight size={15}/></a>
          <button className="icon-button mobile-toggle" onClick={() => setMobileOpen(v => !v)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X size={24}/> : <Menu size={24}/>}</button>
        </div>
      </div>
    </header>
    {mobileOpen && <div className="mobile-menu"><nav aria-label="Mobile navigation">{nav.map(([id,label],i) => <a key={id} href={`#${id}`} onClick={closeMenu}><span className="mobile-number">0{i+1}</span>{label}<ArrowUpRight size={17}/></a>)}
      <a className="mobile-contact-link" href="tel:+93787654751" onClick={closeMenu}><PhoneCall size={18}/> +93 78 765 4751</a></nav></div>}

    <main id="main">
      <section id="home" className="hero">
        <video className="hero-video" ref={videoRef} autoPlay muted loop playsInline poster={asset('video/hero-still.jpg')} onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)}>
          <source src={asset('video/neural-atmosphere.mp4')} type="video/mp4" />
        </video>
        <div className="hero-sheen" /><div className="hero-grain" />
        <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-star"><Sparkles size={15}/></span>{t.heroTop}</div>
            <h1><span>{t.heroLine1}</span><span>{t.heroLine2} <em>{t.heroAccent}</em></span></h1>
            <p className="hero-intro">{t.heroDescription}</p>
            <div className="hero-actions"><a href="#contact" className="btn btn-primary"><span>{t.heroButton}</span><ArrowUpRight size={18}/></a><a href="#expertise" className="btn btn-text"><span className="btn-play-circle"><ArrowRight size={17}/></span><span>{t.heroButton2}</span></a></div>
            <div className="hero-signature"><div className="hero-signature-rule"/><div className="signature-icon"><BadgeCheck size={24}/></div><p>MBBS <span>·</span> MD <span>·</span> MCPS <span>·</span> FCPS</p></div>
          </div>
          <div className="hero-visual">
            <div className="hero-picture-halo" />
            <div className="portrait-frame"><img src={asset('images/portrait-clinic.webp')} alt="Dr. Khalid Khan Zadran in his clinic" fetchPriority="high"/><div className="portrait-gradient"/></div>
            <div className="portrait-corner portrait-corner-top"/><div className="portrait-corner portrait-corner-bottom"/>
            <div className="hero-nameplate"><span className="nameplate-symbol"><BrainCircuit size={23}/></span><div><strong>{t.heroPhotoLabel}</strong><span>{t.heroPhotoSub}</span></div><span className="nameplate-mark"><ArrowUpRight size={17}/></span></div>
            <div className="hero-floating-seal"><span>FCPS</span><small>NEUROSURGERY</small></div>
          </div>
        </div>
        <div className="hero-bottom"><div className="container hero-bottom-inner"><div className="scroll-cue"><ArrowDown size={16}/>{t.scroll}</div>
          <button className="video-control" onClick={toggleVideo} aria-label={videoPlaying ? t.videoMotion : t.videoPlay}>{videoPlaying ? <Pause size={15}/> : <Play size={15}/>} <span>AMBIENT VISUAL</span></button></div></div>
      </section>

      <div className="service-strip" aria-label="Services"><div className="service-track">{[0,1].map(i => <div className="service-repeat" key={i}>{[t.heroFootOne,t.heroFootTwo,t.heroFootThree,t.heroFootFour].map((item,j) => <span key={j}><span className="strip-symbol">✳</span>{item}</span>)}</div>)}</div></div>

      <section className="cred-strip"><div className="container credibility-grid">
        <Reveal><div className="cred-unit"><span className="cred-icon"><Award size={25}/></span><div><strong>{t.featureOne}</strong><span>{t.featureOneSub}</span></div></div></Reveal>
        <Reveal delay={100}><div className="cred-unit"><span className="cred-icon"><MapPin size={24}/></span><div><strong>{t.featureTwo}</strong><span>{t.featureTwoSub}</span></div></div></Reveal>
        <Reveal delay={200}><div className="cred-unit"><span className="cred-icon"><Globe2 size={25}/></span><div><strong>{t.featureThree}</strong><span>{t.featureThreeSub}</span></div></div></Reveal>
      </div></section>

      <section id="about" className="section about-section">
        <div className="container about-grid">
          <Reveal className="about-visual"><div className="about-image-frame"><img src={asset('images/portrait-event.webp')} alt={t.galleryImageAlt[1]} loading="lazy"/><span className="photo-tick photo-tick-one"/><span className="photo-tick photo-tick-two"/></div>
            <div className="about-side-label">{t.aboutImageNote}</div><div className="about-quote-card"><div className="little-cross"><HeartPulse size={24}/></div><strong>{t.aboutOverlayTitle}</strong><span>{t.aboutOverlayDesc}</span></div>
          </Reveal>
          <Reveal className="about-copy" delay={140}>
            <SectionHeading eyebrow={t.aboutEyebrow} first={t.aboutTitleOne} second={t.aboutTitleTwo} />
            <p>{t.aboutDescriptionOne}</p><p>{t.aboutDescriptionTwo}</p>
            <div className="about-credentials"><div className="mini-icon"><GraduationCap size={22}/></div><div><strong>MBBS · MD · MCPS · FCPS</strong><span>{t.qualificationsTitle}</span></div></div>
            <a className="inline-link" href="#credentials"><span>{t.aboutLink}</span><ArrowUpRight size={19}/></a>
          </Reveal>
        </div>
      </section>

      <section id="expertise" className="section expertise-section">
        <div className="container">
          <Reveal className="expertise-intro"><SectionHeading eyebrow={t.expertiseEyebrow} first={t.expertiseTitleOne} second={t.expertiseTitleTwo} description={t.expertiseDescription}/><div className="intro-deco"><BrainCircuit size={86} strokeWidth={.65}/></div></Reveal>
          <div className="specialty-grid">{t.specialties.map((item,i) => {const Icon = specialtyIcons[i]; return <Reveal delay={i*85} key={i}><article className="specialty-card"><div className="specialty-top"><div className="specialty-icon"><Icon size={32} strokeWidth={1.55}/></div><span className="specialty-number">{item.number}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="specialty-tags">{item.bullets.map(b => <span key={b}>{b}</span>)}</div><a href="#contact" className="specialty-link" aria-label={`${t.heroButton}: ${item.title}`}><ArrowUpRight size={22}/></a></article></Reveal>})}</div>
        </div>
      </section>

      <section id="approach" className="section approach-section">
        <div className="approach-glow"/>
        <div className="container approach-grid">
          <Reveal className="approach-copy"><SectionHeading eyebrow={t.approachEyebrow} first={t.approachTitleOne} second={t.approachTitleTwo} description={t.approachDescription} inverted/>
            <div className="approach-quote"><span>“</span><p>{t.approachNote}</p></div>
          </Reveal>
          <div className="approach-steps">{t.approachItems.map((item,i) => {const Icon=approachIcons[i]; return <Reveal key={i} delay={i*110}><div className="approach-step"><span className="step-index">0{i+1}</span><div className="step-copy"><h3>{item.title}</h3><p>{item.description}</p></div><div className="step-icon"><Icon size={24} strokeWidth={1.5}/></div></div></Reveal>})}</div>
        </div>
      </section>

      <section id="credentials" className="section qualification-section"><div className="container">
        <Reveal className="qualify-heading"><SectionHeading eyebrow={t.credentialsEyebrow} first={t.credentialsTitle} second="" description={t.credentialsDescription}/></Reveal>
        <div className="qualification-grid">{[
          [t.qualificationsTitle,t.qualifications], [t.educationTitle,t.education], [t.associationsTitle,t.associations], [t.researchTitle,t.research]
        ].map(([name,detail],i)=> {const Icon = qualificationsIcons[i];return <Reveal key={i} delay={70*i}><div className="qualification-item"><div className="qualification-icon"><Icon size={24}/></div><div><span className="qualification-caption">0{i+1} / {name}</span><p>{detail}</p></div></div></Reveal>})}</div>
        <p className="qualification-note"><CircleCheck size={15}/>{t.qualificationNote}</p>
      </div></section>

      <section id="gallery" className="section gallery-section"><div className="container">
        <Reveal className="gallery-header"><SectionHeading eyebrow={t.galleryEyebrow} first={t.galleryTitleOne} second={t.galleryTitleTwo} description={t.galleryDescription}/><span className="gallery-index">01 — 05</span></Reveal>
        <div className="gallery-grid">
          {docPhotos.map((photo,i)=><Reveal className={`gallery-cell gallery-cell-${i}`} key={photo} delay={i*70}><button className="gallery-photo" onClick={()=>setSelectedPhoto(i)} aria-label={t.galleryCaptions[i]}><img src={asset(photo)} alt={t.galleryImageAlt[i]} loading="lazy"/><div className="gallery-image-overlay"/><span className="gallery-photo-num">0{i+1}</span><span className="gallery-photo-name">{t.galleryCaptions[i]}</span><span className="gallery-expand"><ArrowUpRight size={21}/></span></button></Reveal>)}
        </div>
      </div></section>

      <section id="contact" className="section contact-section">
        <div className="contact-ambient"/><div className="container contact-grid">
          <Reveal className="contact-info"><SectionHeading eyebrow={t.contactEyebrow} first={t.contactTitleOne} second={t.contactTitleTwo} description={t.contactDescription} inverted/>
            <div className="contact-details"><div className="contact-line"><div className="contact-line-icon"><MapPin size={23}/></div><div><span>{t.clinicLabel}</span><strong>{t.clinicName}</strong><p>{t.clinicCity}</p></div></div>
            <div className="contact-line"><div className="contact-line-icon"><PhoneCall size={22}/></div><div><span>{t.phoneLabel}</span><a className="contact-phone" href="tel:+93787654751" dir="ltr">+93 78 765 4751</a></div></div></div>
            <div className="contact-secondary-actions"><a href="tel:+93787654751"><PhoneCall size={17}/>{t.contactCall}</a><a href={googleMaps} target="_blank" rel="noopener noreferrer"><MapPin size={17}/>{t.contactMaps}<ExternalLink size={14}/></a></div>
          </Reveal>
          <Reveal className="contact-form-wrap" delay={130}><div className="contact-form-decoration"/><form onSubmit={submitContact} className="contact-form"><div className="form-top-line"><span className="form-dot"/><span>PERSONAL CONSULTATION</span><span>01 / 01</span></div>
            <h3>{t.formTitle}</h3><p className="form-intro">{t.formSub}</p>
            <div className="form-fields"><label>{t.formName}<input required name="name" autoComplete="name" value={form.name} onChange={changeForm} placeholder={t.formNamePlaceholder}/></label><label>{t.formPhone}<input required name="phone" type="tel" autoComplete="tel" dir="ltr" value={form.phone} onChange={changeForm} placeholder={t.formPhonePlaceholder}/></label><label className="full">{t.formService}<select name="specialty" value={form.specialty} onChange={changeForm} required><option value="" disabled>{t.formOptionDefault}</option>{t.formOptions.map((name,i)=><option key={i} value={i}>{name}</option>)}</select></label><label className="full">{t.formMessage}<textarea name="message" value={form.message} onChange={changeForm} placeholder={t.formMessagePlaceholder} rows={3}/></label></div>
            <button type="submit" className="btn btn-primary form-submit"><span>{t.formSubmit}</span><Send size={18}/></button>
            <p className="form-disclaimer"><ShieldCheck size={14}/>{t.formNote}</p></form></Reveal>
        </div>
      </section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-about"><Brand t={t} compact/><p>{t.footerLine}</p></div><div className="footer-col"><h4>{t.footerExplore}</h4>{nav.slice(0,5).map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-col"><h4>{t.footerContact}</h4><span>{t.clinicName}</span><span>{t.clinicCity}</span><a href="tel:+93787654751" dir="ltr">+93 78 765 4751</a><a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={14}/></a></div><div className="footer-mark"><BrainCircuit strokeWidth={.5}/></div></div>
      <div className="footer-end"><span>© {new Date().getFullYear()} Dr. Khalid Khan Zadran. {t.footerCopy}</span><span>{t.footerCredit}</span></div><div className="medical-note">{t.emergency}</div></div></footer>

    <a className="floating-whatsapp" href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noopener noreferrer" aria-label={t.floatingWhatsapp} title={t.floatingWhatsapp}><svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.02 3a12.9 12.9 0 0 0-11.2 19.34L3 29l6.85-1.8A12.98 12.98 0 1 0 16.02 3zm0 23.59a10.58 10.58 0 0 1-5.39-1.48l-.39-.24-4.04 1.06 1.08-3.93-.26-.4a10.61 10.61 0 1 1 9 5zm5.84-7.93c-.32-.16-1.9-.94-2.19-1.05-.3-.1-.51-.16-.73.16-.22.33-.84 1.05-1.02 1.27-.19.22-.38.24-.7.08a8.78 8.78 0 0 1-2.58-1.59 9.66 9.66 0 0 1-1.79-2.23c-.19-.32 0-.5.14-.65.15-.14.32-.38.48-.57.16-.19.22-.32.33-.54.1-.22.05-.4-.03-.57l-.99-2.4c-.26-.62-.52-.53-.72-.54h-.62c-.22 0-.57.08-.87.4s-1.14 1.1-1.14 2.68 1.17 3.1 1.33 3.3a12.21 12.21 0 0 0 4.7 4.98 4.98 0 0 0 4.83.33c.78-.33 1.9-1.13 2.16-2.22.27-1.1.27-2.03.2-2.22-.08-.2-.3-.32-.62-.48z"/></svg></a>

    {selectedPhoto >= 0 && <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.galleryCaptions[selectedPhoto]} onClick={()=>setSelectedPhoto(-1)}><div className="lightbox-inner" onClick={e=>e.stopPropagation()}><button className="lightbox-close" aria-label={t.galleryClose} onClick={()=>setSelectedPhoto(-1)}><X size={26}/></button><img src={asset(docPhotos[selectedPhoto])} alt={t.galleryImageAlt[selectedPhoto]}/><div className="lightbox-caption"><span>{t.galleryCaptions[selectedPhoto]}</span><span>0{selectedPhoto+1} / 05</span></div><div className="lightbox-controls"><button onClick={()=>nextPhoto(-1)} aria-label="Previous"><ArrowLeft size={22}/></button><button onClick={()=>nextPhoto(1)} aria-label="Next"><ArrowRight size={22}/></button></div></div></div>}
  </div>;
}

export default App;
