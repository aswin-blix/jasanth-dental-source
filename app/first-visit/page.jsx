import DentalSite from "../components/dental-site";
import { pages } from "../../lib/pages.mjs";

export const metadata = { title: "Your first visit | Jasanth Dental Hospital", description: pages["first-visit"].description };

export default function Page() { return <DentalSite page="first-visit" />; }
