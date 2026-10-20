"use client";

import { useImperativeHandle, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, X } from "lucide-react";
import { treatments } from "../../lib/content.mjs";
import { demoSlots, localDateValue, validateBooking } from "../../lib/booking.mjs";

export default function BookingDialog({ ref }) {
  const dialog = useRef(null);
  const form = useRef(null);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState("");
  const [today, setToday] = useState("");

  useImperativeHandle(ref, () => ({
    open(topic) {
      form.current?.reset();
      if (form.current) form.current.elements.reason.value = treatments.some(item => item.id === topic) ? topic : "general";
      setError("");
      setToday(localDateValue());
      dialog.current.showModal();
    },
  }));

  function close() {
    dialog.current.close();
  }

  function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const message = validateBooking(values);
    if (message) { setError(message); return; }
    setError("");
    setSubmitted({ name: values.name.trim(), date: values.date, time: values.time });
    event.currentTarget.reset();
  }

  function fillDemo() {
    const fields = form.current.elements;
    fields.name.value = "Demo Patient";
    fields.phone.value = "0000000000";
    fields.date.value = localDateValue();
    fields.time.value = demoSlots[0];
    setError("");
  }

  function containFocus(event) {
    if (event.key !== "Tab") return;
    const controls = [...dialog.current.querySelectorAll("button, input, select, a[href]")].filter(node => !node.disabled && node.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  return <dialog ref={dialog} className="planner booking-dialog" aria-labelledby="booking-title" aria-describedby="booking-demo-notice" onKeyDown={containFocus} onClose={() => { setSubmitted(null); setError(""); form.current?.reset(); }} onClick={event => { if (event.target === dialog.current) close(); }}>
    <div className="planner-inner">
      <button className="dialog-close" aria-label="Close appointment form" onClick={close}><X /></button>
      <p className="eyebrow"><CalendarDays size={17} /> YOUR NEXT STEP</p>
      <h2 id="booking-title">Book an<br /><em>appointment.</em></h2>
      <p id="booking-demo-notice" className="booking-demo-notice"><strong>Demo booking</strong> — sample form and time windows. Nothing is sent to the clinic and no appointment is reserved. Please use sample details.</p>
      {submitted ? <div className="booking-success">
        <span className="success-icon"><Check size={25} /></span>
        <h3 tabIndex={-1} ref={node => node?.focus()}>Your demo request is ready.</h3>
        <p>Thank you, {submitted.name}. This is how your appointment request would look.</p>
        <dl><div><dt>Preferred date</dt><dd>{new Date(`${submitted.date}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</dd></div><div><dt>Sample time window</dt><dd>{submitted.time}</dd></div><div><dt>Status</dt><dd>Demo only — not sent or booked</dd></div></dl>
        <p>When real booking is connected, the clinic will need to confirm availability before an appointment is final.</p>
        <button className="button button-green w-full justify-center" onClick={close}>Done <Check size={18} /></button>
      </div> : <form ref={form} onSubmit={submit} className="booking-form">
        <button type="button" className="sample-details" onClick={fillDemo}>Use sample details <ArrowUpRight size={16} /></button>
        <div className="booking-fields">
          <label>Full name<input name="name" autoComplete="off" placeholder="e.g. Demo Patient" required maxLength={80} /></label>
          <label>Phone number<input name="phone" type="tel" autoComplete="off" placeholder="e.g. 0000000000" required maxLength={22} /></label>
          <label>Preferred date<input name="date" type="date" required min={today} /></label>
          <label>Preferred time<select name="time" required defaultValue=""><option value="" disabled>Select a sample window</option>{demoSlots.map(slot => <option key={slot}>{slot}</option>)}</select></label>
          <label className="booking-full">Reason for visit<select name="reason" defaultValue="general"><option value="general">General consultation</option>{treatments.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
        </div>
        {error && <p role="alert" className="booking-error">{error}</p>}
        <button type="submit" className="button button-green w-full justify-center">Preview appointment request <ArrowUpRight size={18} /></button>
        <p className="booking-footnote">Demo only. Details are cleared when you close this form.</p>
      </form>}
    </div>
  </dialog>;
}
