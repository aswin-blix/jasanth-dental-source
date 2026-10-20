export const demoSlots = ["Morning · 9:00 AM – 12:00 PM", "Afternoon · 2:00 PM – 5:00 PM", "Evening · 5:00 PM – 8:00 PM"];

export function localDateValue(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function validateBooking(values, today = localDateValue()) {
  if (!values.name?.trim()) return "Please enter your name.";
  if (!/^\+?[\d\s()-]+$/.test(values.phone || "") || !/^\d{10,15}$/.test(values.phone.replace(/\D/g, ""))) return "Enter a phone number with 10 to 15 digits.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date || "")) return "Please choose a preferred date.";
  const parsed = new Date(`${values.date}T12:00:00`);
  if (Number.isNaN(parsed.getTime()) || localDateValue(parsed) !== values.date) return "Please choose a valid date.";
  if (values.date < today) return "Please choose today or a future date.";
  if (!demoSlots.includes(values.time)) return "Please select a preferred time.";
  return "";
}
