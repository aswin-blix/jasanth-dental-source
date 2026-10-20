import DentalSite from "../components/dental-site";
import { pages } from "../../lib/pages.mjs";

export const metadata = { title: "Dental care | Jasanth Dental Hospital", description: pages["care"].description };

export default function Page() { return <DentalSite page="care" />; }
