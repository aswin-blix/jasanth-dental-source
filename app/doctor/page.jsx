import DentalSite from "../components/dental-site";
import { pages } from "../../lib/pages.mjs";

export const metadata = { title: "Our doctor | Jasanth Dental Hospital", description: pages["doctor"].description };

export default function Page() { return <DentalSite page="doctor" />; }
