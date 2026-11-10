import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escalate MY",
  description: "Crisis Governance Platform for Malaysian Organisations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
