import "./globals.css";

export const metadata = {
  title: "Jasanth Dental Hospital | A little care. A brighter smile.",
  description:
    "Meet Dr. T Prasanth, BDS, MDS, PhD at Jasanth Dental Hospital. Explore dental care and plan your first visit.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
