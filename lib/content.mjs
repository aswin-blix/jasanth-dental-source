export const clinic = {
  name: "Jasanth Dental Hospital",
  doctor: "Dr. T Prasanth",
  qualifications: "BDS, MDS, PhD",
};

// These are discussion topics, not a verified inventory of clinic services.
export const categories = ["All care", "Everyday care", "Restore your smile", "Smile aesthetics"];
export const treatments = [
  { id: "checkups", title: "Check-ups & cleaning", category: "Everyday care", icon: "tooth", description: "Start with a conversation about your teeth, gums, and everyday oral care.", question: "What should my routine dental care include?" },
  { id: "restorations", title: "Fillings & restorations", category: "Restore your smile", icon: "shield", description: "Explore the options a dentist may recommend for a damaged tooth.", question: "What restoration options could be suitable for my tooth?" },
  { id: "cosmetic", title: "Smile aesthetics", category: "Smile aesthetics", icon: "sparkles", description: "Talk through what you would like to change about the appearance of your smile.", question: "Which options could address my smile concerns?" },
  { id: "alignment", title: "Teeth alignment", category: "Smile aesthetics", icon: "smile", description: "Ask about tooth positioning and whether an alignment assessment is appropriate.", question: "Would an alignment assessment be suitable for me?" },
  { id: "replacement", title: "Missing teeth", category: "Restore your smile", icon: "tooth", description: "Discuss replacement options and the considerations for your individual needs.", question: "What are my options for replacing a missing tooth?" },
  { id: "gums", title: "Gum care", category: "Everyday care", icon: "leaf", description: "Make space to discuss changes you have noticed in your gums.", question: "What should I discuss about my gum health?" },
];

export function filterTreatments(category) {
  return category === "All care" ? treatments : treatments.filter(item => item.category === category);
}

export const faqs = [
  { question: "How do I arrange my first visit?", answer: "Use Book an appointment to try the demo form with sample details, a preferred date, and a sample time window. It previews a request only. The clinic’s real appointment contact details are still awaiting confirmation." },
  { question: "Which dental treatments are available?", answer: "The care topics on this website are a starting point for discussion. The hospital’s treatment list has not yet been confirmed. Please confirm availability and suitability with the clinic." },
  { question: "What are the opening hours?", answer: "Consultation days and opening hours will be added once confirmed by Jasanth Dental Hospital." },
  { question: "Where can I find the hospital?", answer: "The original hospital exterior is shown on the Contact Us page. The full street address and map location are awaiting confirmation, so please verify these with the clinic before travelling." },
  { question: "What should I bring to my first visit?", answer: "Prepare your questions and, if available, previous dental records. Be ready to discuss your medical history, current medicines, and known allergies. The First Visit page includes a preparation checklist." },
  { question: "Can I check fees before agreeing to treatment?", answer: "Ask the clinic about the consultation fee and request an explanation of proposed treatment costs, alternatives, and follow-up before deciding. Fees and payment options have not yet been confirmed for this website." },
  { question: "Can I discuss accessibility or feeling nervous?", answer: "Make a note of any access needs, communication preferences, or concerns to discuss when arranging your visit. Accessibility facilities and specific accommodations must be confirmed with the clinic." },
  { question: "Does the demo form book an appointment?", answer: "No. The form shows a local preview only. It does not send information, contact the hospital, or reserve an appointment. All displayed time windows are examples, not confirmed availability." },
];
