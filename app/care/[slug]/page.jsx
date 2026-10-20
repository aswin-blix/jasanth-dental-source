import { notFound } from "next/navigation";
import DentalSite from "../../components/dental-site";
import { treatments } from "../../../lib/content.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map(topic => ({ slug: topic.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = treatments.find(item => item.id === slug);
  return topic ? {
    title: `${topic.title} | Jasanth Dental Hospital`,
    description: topic.description,
  } : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  const topic = treatments.find(item => item.id === slug);
  if (!topic) notFound();
  return <DentalSite page="care" topic={topic} />;
}
