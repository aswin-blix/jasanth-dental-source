import Link from "next/link";
import { ArrowUpRight, Phone, Mail, Clock3, MapPin, Check } from "lucide-react";
import { clinic } from "../../lib/content.mjs";
import { careDetails, preparation } from "../../lib/pages.mjs";

export function PageHero({ info, careTopic }) {
  return <section className="page-hero"><div className="shell">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{careTopic && <><Link href="/care/">Dental care</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{info.label}</span></nav>
    <div className="page-hero-row"><div><p className="eyebrow">{info.eyebrow}</p><h1>{info.title}<br /><em>{info.accent}</em></h1><p className="page-intro">{info.description}</p></div><span className="page-rosette" aria-hidden="true">✳</span></div>
  </div></section>;
}

export function ContactDetails({ openBooking }) {
  return <section className="shell contact-details">
    <div className="contact-intro"><p className="eyebrow">CONTACT & APPOINTMENTS</p><h2>Let’s make<br /><em>getting here easier.</em></h2><p>The clinic’s contact information is being confirmed. Try the demo appointment form below. Real appointment requests are not enabled yet.</p><button className="button button-green contact-booking" onClick={() => openBooking()}>Book an appointment <ArrowUpRight size={18} /></button></div>
    <div className="contact-cards">
      {[[Phone, "Call the hospital", "Phone number awaiting confirmation", "The appointment number will appear here once supplied by the clinic."], [Mail, "Email & enquiries", "Email address awaiting confirmation", "There is no online enquiry submission on this website yet."], [Clock3, "Consultation hours", "Days and times to be confirmed", "Please confirm appointment availability before planning a journey."], [MapPin, "Address & directions", "Full address awaiting confirmation", "A verified map and directions will be added when the location is confirmed."]].map(([Icon, title, status, text]) => <article className="contact-card" key={title}><Icon size={23} strokeWidth={1.4} /><h3>{title}</h3><strong>{status}</strong><p>{text}</p></article>)}
    </div>
  </section>;
}

export function VisitPreparation() {
  return <section className="preparation-section section"><div className="shell grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">YOUR VISIT CHECKLIST</p><h2>A few things<br /><em>to bring along.</em></h2><p className="section-intro">You do not need to have all the answers. A few notes can help you explain what matters to you.</p><Link href="/faq/" className="text-link">Read patient FAQs <ArrowUpRight size={18} /></Link></div><div>{preparation.map(([title, text]) => <article className="checklist-item" key={title}><Check size={20} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>;
}

export function DoctorDetails() {
  return <section className="section shell grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">JASANTH DENTAL HOSPITAL</p><h2>Meet<br /><em>{clinic.doctor}.</em></h2><p className="section-intro">Qualifications: {clinic.qualifications}</p><p className="body-copy">The hospital’s name and the doctor’s qualifications are displayed on the original clinic signage. A fuller professional profile will be added once supplied and approved by the doctor.</p><Link className="text-link" href="/contact/">Contact information <ArrowUpRight size={18} /></Link></div><div className="conversation-panel"><p className="eyebrow">MAKE THE CONVERSATION YOURS</p><h3>What matters to you?</h3><ul><li>The reason for your visit and the questions on your mind.</li><li>Your preferences, concerns, and previous dental experiences.</li><li>The options, expected costs, and follow-up to discuss before deciding.</li></ul><Link href="/first-visit/" className="text-link">Prepare for your first visit <ArrowUpRight size={18} /></Link></div></section>;
}

export function CareDetail({ topic, openBooking }) {
  const detail = careDetails[topic.id];
  return <section className="section shell detail-grid"><div><p className="eyebrow">A STARTING POINT</p><h2>Understand.<br /><em>Ask. Decide.</em></h2><p className="body-copy">{detail.intro}</p><h3>Before your conversation</h3><p className="body-copy">{detail.prepare}</p><div className="content-notice">This is general information, not a diagnosis or an offer of a confirmed treatment. Availability and suitability must be confirmed with Jasanth Dental Hospital.</div><Link href="/care/" className="text-link">Explore all care topics <ArrowUpRight size={18} /></Link></div><aside className="conversation-panel"><p className="eyebrow">QUESTIONS WORTH ASKING</p><h3>Make your consultation count.</h3><ul>{detail.questions.map(question => <li key={question}>{question}</li>)}</ul><button className="button button-green" onClick={() => openBooking(topic.id)}>Book an appointment <ArrowUpRight size={18} /></button></aside></section>;
}

export function PrivacyContent() {
  return <section className="section shell prose-content"><h2>About this preview</h2><p>This website includes a demo appointment form. It does not send appointment requests to the hospital. Please use sample details and do not enter medical information.</p><h3>Your demo appointment</h3><p>The form displays a local preview of your preferred date and time. It does not transmit your entries, save them in browser storage, or add them to a patient database. Form details are cleared when you close the dialog or leave the page.</p><h3>Website access</h3><p>No analytics or advertising integrations have been added. A future hosting provider may process technical request information to deliver the website. Hosting and contact-provider details will be reviewed before public launch.</p><h3>When contact features are added</h3><p>This page must be updated with the clinic’s confirmed privacy contact, data handling practices, and any booking or communication providers before an online enquiry service is enabled.</p></section>;
}

export function NextStep({ home = false, contact = false, openBooking }) {
  return <section className="next-step"><div className="shell"><div><p className="eyebrow">{home ? "LET’S TAKE THE FIRST STEP" : "YOUR NEXT STEP"}</p><h2>A conversation today.<br /><em>A reason to smile tomorrow.</em></h2></div><div className="next-step-actions"><button onClick={() => openBooking()} className="button button-green">Book an appointment <ArrowUpRight size={18} /></button><Link href={contact ? "/faq/" : "/first-visit/"} className="text-link">{contact ? "Read patient FAQs" : "Plan your first visit"} <ArrowUpRight size={18} /></Link></div></div></section>;
}
