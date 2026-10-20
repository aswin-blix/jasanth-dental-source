import DentalSite from "../components/dental-site";
import { pages } from "../../lib/pages.mjs";

export const metadata = { title: "Contact us | Jasanth Dental Hospital", description: pages["contact"].description };

export default function Page() { return <DentalSite page="contact" />; }
