import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Maximize Clicks: Shorten URLs with Ease!",
  description:
    "Experience the ultimate solution to lengthy URLs! Our cutting-edge URL shortener streamlines your links, enhancing accessibility and boosting click-through rates. Say goodbye to cumbersome addresses and hello to concise, shareable links. Start optimizing your online presence today!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { session },
}: {
  children: React.ReactNode;
  params: { session: Session | null };
}) {
  if (session?.user.id) redirect("/dashboard");

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
