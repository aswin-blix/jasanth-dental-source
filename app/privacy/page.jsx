import DentalSite from "../components/dental-site";
import { pages } from "../../lib/pages.mjs";

export const metadata = { title: "Website privacy | Jasanth Dental Hospital", description: pages["privacy"].description };

export default function Page() { return <DentalSite page="privacy" />; }
