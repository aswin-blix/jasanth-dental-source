"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingDialog from "./booking-dialog";
import { navigation, pages } from "../../lib/pages.mjs";
import { PageHero, ContactDetails, VisitPreparation, DoctorDetails, CareDetail, PrivacyContent, NextStep } from "./page-extras";
import { motion, MotionConfig } from "framer-motion";
import { ArrowUpRight, ArrowRight, Menu, X, Plus, Minus, ShieldCheck, Sparkles, Smile, Leaf, HeartHandshake, MapPin, Clock3, MoveDown } from "lucide-react";
import { categories, clinic, faqs, filterTreatments, treatments } from "../../lib/content.mjs";

function Tooth({ size = 24, strokeWidth = 1.5 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5C7 1 3 4 4 9c1 5 3 12 5 11s0-7 3-7 1 6 3 7 4-6 5-11c1-5-3-8-8-4Z" /><path d="M9 4c1 1 2 2 4 2" /></svg>;
}

const icons = { tooth: Tooth, shield: ShieldCheck, sparkles: Sparkles, smile: Smile, leaf: Leaf };
const links = navigation;

function Reveal({ children, className = "", delay = 0 }) {
  return <motion.div initial={{ y: 24 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay }} className={className}>{children}</motion.div>;
}

function Brand({ light = false }) {
  return <Link href="/" aria-label="Jasanth Dental Hospital home" className={`brand ${light ? "brand-light" : ""}`}>
    <span className="brand-symbol"><Tooth size={29} strokeWidth={1.5} /></span>
    <span><span className="brand-name">JASANTH<span className="brand-dot">✦</span></span><span className="brand-sub">DENTAL HOSPITAL</span></span>
  </Link>;
}

export default function DentalSite({ page = "home", topic = null }) {
  const home = page === "home";
  const info = topic ? { label: topic.title, eyebrow: topic.category.toUpperCase(), title: topic.title, accent: "Let’s talk about it.", description: topic.description } : pages[page];
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All care");
  const [expanded, setExpanded] = useState(null);
  const booking = useRef(null);

  function openBooking(topic) {
    booking.current.open(topic);
  }

  return <MotionConfig reducedMotion="user">
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="topbar">A little care today. A reason to smile tomorrow. <span>Welcome to Jasanth Dental Hospital <ArrowUpRight size={14} /></span></div>
    <header className="site-header">
      <div className="shell flex items-center justify-between gap-5">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">{links.map(([name, href]) => <Link key={href} href={href} aria-current={(href === "/" ? home : page === href.split("/")[1]) ? "page" : undefined}>{name}</Link>)}</nav>
        <button className="button button-green hidden sm:inline-flex" onClick={() => openBooking()}>Book an appointment <ArrowUpRight size={18} /></button>
        <button className="menu-button lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav id="mobile-nav" aria-label="Mobile navigation" className="mobile-nav lg:hidden">{links.map(([name, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{name}<ArrowUpRight size={18} /></Link>)} </nav>}
    </header>

    <main id="main">
      {!home && <PageHero info={info} careTopic={Boolean(topic)} />}
      {page === "contact" && <ContactDetails openBooking={openBooking} />}
      {topic && <CareDetail topic={topic} openBooking={openBooking} />}
      {page === "privacy" && <PrivacyContent />}
      {home && <><section id="home" className="hero">
        <Image src="/images/smile-hero.webp" alt="Illustrative portrait of a woman with a warm, natural smile" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="shell hero-inner">
          <Reveal className="hero-copy">
            <p className="eyebrow"><span className="tiny-line" /> YOUR SMILE. YOUR STORY.</p>
            <h1>A little care.<br />A <em>brighter</em><br />smile.</h1>
            <p className="hero-description">Every smile deserves a thoughtful beginning.<br className="hidden sm:block" /> Let’s start yours at Jasanth Dental Hospital.</p>
            <div className="flex flex-wrap items-center gap-6">
              <button onClick={() => openBooking()} className="button button-green">Book an appointment <ArrowUpRight size={19} /></button>
              <Link href="/care/" className="text-link">Explore our care <ArrowRight size={18} /></Link>
            </div>
            <div className="hero-doctor"><span className="doctor-monogram">TP</span><div><strong>{clinic.doctor}</strong><span>{clinic.qualifications}</span></div><span className="doctor-divider" /><span className="hero-doctor-note">A conversation.<br />A fresh beginning.</span></div>
          </Reveal>
        </div>
        <div className="hero-tag"><span className="tag-icon"><Sparkles size={22} /></span><div>A smile that feels<br /><strong>like you.</strong></div></div>
        <span className="image-note">Illustrative imagery</span>
        <Link href="/care/" className="scroll-cue" aria-label="Explore dental care"><MoveDown size={17} /></Link>
      </section></>}

      {home && <><div className="values-strip">
        <div className="shell grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div><HeartHandshake /><span>Start with a conversation</span></div>
          <div><Tooth /><span>Make room for your smile</span></div>
          <div><Leaf /><span>Take the next step with confidence</span></div>
        </div>
      </div></>}

      {(home || page === "care" && !topic) && <><section id="care" className="section shell">
        <Reveal className="section-heading"><div><p className="eyebrow">LET’S TALK ABOUT YOUR SMILE</p><h2>Small steps.<br /><em>Lasting possibilities.</em></h2></div><p>From everyday care to the changes you’ve been considering, find a starting point for your next dental conversation.</p></Reveal>
        {!home && <div className="care-filters" aria-label="Filter dental care topics">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={category === item ? "active" : ""}>{item}</button>)}</div>}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {(home ? treatments.slice(0, 3) : filterTreatments(category)).map(item => {
            const Icon = icons[item.icon];
            return <motion.article key={item.id} initial={{ y: 8 }} animate={{ y: 0 }} transition={{ duration: 0.3 }} className="care-card group">
              <div className="flex items-start justify-between"><span className="care-icon"><Icon size={31} strokeWidth={1.3} /></span><span className="care-number">0{treatments.indexOf(item) + 1}</span></div>
              <h3>{item.title}</h3><p>{item.description}</p>
              <Link className="card-link" href={`/care/${item.id}/`} aria-label={`Learn about ${item.title.toLowerCase()}`}>Explore this topic <span><ArrowUpRight size={21} /></span></Link>
            </motion.article>;
          })}
        </div>
        {home && <div className="all-care-link"><Link href="/care/" className="button button-outline">View all dental care <ArrowUpRight size={18} /></Link></div>}
        <p className="care-disclaimer">A starting point for discussion. Treatment availability and suitability must be confirmed with the clinic.</p>
      </section></>}

      {(home || page === "doctor") && <><section id="doctor" className="doctor-section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal className="care-visual">
            <Image src="/images/dental-still-life.webp" alt="Illustrative ceramic tooth and dental mirror in warm natural light" fill sizes="(max-width: 1024px) 90vw, 45vw" />
            <span className="visual-note">A thoughtful approach starts with you.</span>
            <span className="image-note">Illustrative imagery</span>
          </Reveal>
          <Reveal className="doctor-copy">
            <p className="eyebrow">THE PERSON BEHIND THE CARE</p>
            <h2>Your questions.<br />Your comfort.<br /><em>Your smile.</em></h2>
            <p>A dental visit begins with a conversation. What brings you in, what matters to you, and what you would like to understand.</p>
            <div className="doctor-signature"><span className="signature-mark">Tp.</span><div><h3>{clinic.doctor}</h3><p>{clinic.qualifications}</p></div></div>
            <div className="doctor-location"><span className="small-cross">+</span><span>Jasanth Dental Hospital<br /><span lang="ta">ஜசாந்த் பல் மருத்துவமனை</span></span></div>
            <Link href={home ? "/doctor/" : "/first-visit/"} className="text-link">{home ? "Meet our doctor" : "Get ready for your visit"} <ArrowUpRight size={19} /></Link>
          </Reveal>
        </div>
      </section></>}

      {page === "first-visit" && <><section id="first-visit" className="section shell">
        <Reveal className="text-center"><p className="eyebrow">A SIMPLE PLACE TO START</p><h2>New here? <em>You’re welcome.</em></h2><p className="section-intro">A little preparation can make your first conversation easier.</p></Reveal>
        <div className="steps-grid grid gap-10 md:grid-cols-3">
          {[["01", "Tell us what’s on your mind", "A routine visit, a question about a tooth, or a change you’ve been thinking about. Start with what matters to you."], ["02", "Make space for questions", "Write down what you would like to understand, including the options, costs, and next steps to discuss."], ["03", "Plan your next step", "Confirm the hospital’s contact details, location, and consultation hours before arranging your visit."]].map(([number, title, description], i) => <Reveal delay={i * 0.08} key={number} className="step"><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p></Reveal>)}
        </div>
        <div className="text-center"><button className="button button-outline" onClick={() => openBooking()}>Book an appointment <ArrowUpRight size={19} /></button></div>
      </section></>}

      {page === "faq" && <><section className="faq-section section">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal><p className="eyebrow">A LITTLE MORE CLARITY</p><h2>Good questions.<br /><em>A good beginning.</em></h2><p className="faq-intro">Here are a few things to know before your visit.</p><span className="faq-flower" aria-hidden="true">✳</span></Reveal>
          <div className="faq-list">{faqs.map((faq, index) => <div className="faq-item" key={faq.question}><h3><button id={`faq-button-${index}`} aria-expanded={expanded === index} aria-controls={`faq-panel-${index}`} onClick={() => setExpanded(expanded === index ? null : index)}>{faq.question}{expanded === index ? <Minus size={20} /> : <Plus size={20} />}</button></h3><div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={expanded !== index}><p>{faq.answer}</p></div></div>)}</div>
        </div>
      </section></>}

      {page === "contact" && <><section id="visit" className="section shell">
        <Reveal className="visit-grid">
          <div className="visit-photo"><Image src="/images/hospital-exterior.webp" alt="Actual exterior and signage of Jasanth Dental Hospital, supplied by the client" fill sizes="(max-width: 768px) 90vw, 50vw" /><span>YOUR FIRST LOOK AT JASANTH</span></div>
          <div className="visit-copy"><p className="eyebrow">WE LOOK FORWARD TO MEETING YOU</p><h2>Your next chapter<br /><em>starts with a smile.</em></h2><p>Jasanth Dental Hospital<br />{clinic.doctor} · {clinic.qualifications}</p><div className="visit-detail"><MapPin size={21} /><div><strong>Find the hospital</strong><span>Full address and map coming after confirmation.</span></div></div><div className="visit-detail"><Clock3 size={21} /><div><strong>Plan a convenient time</strong><span>Contact details and consultation hours to be confirmed.</span></div></div><button onClick={() => openBooking()} className="button button-green">Book an appointment <ArrowUpRight size={19} /></button></div>
        </Reveal>
      </section></>}
      {page === "doctor" && <DoctorDetails />}
      {page === "first-visit" && <VisitPreparation />}
      {page !== "privacy" && <NextStep home={home} contact={page === "contact"} openBooking={openBooking} />}
    </main>

    <footer><div className="shell"><div className="footer-top"><div><Brand light /><p>A little care. A brighter smile.</p></div><nav aria-label="Footer navigation">{links.map(([name, href]) => <Link key={href} href={href} aria-current={(href === "/" ? home : page === href.split("/")[1]) ? "page" : undefined}>{name}</Link>)}</nav><div className="footer-help"><Link href="/faq/">Patient FAQs</Link><Link href="/privacy/">Website privacy</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jasanth Dental Hospital.</span><span>Website preview · Clinic details pending confirmation.<br />Generated imagery is illustrative and does not depict actual patients.</span></div></div></footer>

    <BookingDialog ref={booking} />
  </MotionConfig>;
}
