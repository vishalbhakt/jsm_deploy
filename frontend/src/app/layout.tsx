import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSM Shiksha Academy – School ERP & LMS Platform",
  description:
    "Quality education from K to 8 with a balanced approach to academics, co-curricular activities, and character building. Located in Nihal Vihar, New Delhi.",
  keywords: ["JSM Shiksha Academy", "School", "Education", "Delhi", "K to 8"],
  openGraph: {
    title: "JSM Shiksha Academy",
    description: "Nurturing Young Minds, Building Bright Futures",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
