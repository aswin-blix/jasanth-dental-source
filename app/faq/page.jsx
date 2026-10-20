import DentalSite from "../components/dental-site";
import { pages } from "../../lib/pages.mjs";

export const metadata = { title: "Patient FAQs | Jasanth Dental Hospital", description: pages["faq"].description };

export default function Page() { return <DentalSite page="faq" />; }
