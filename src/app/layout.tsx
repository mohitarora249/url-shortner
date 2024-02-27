import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Session } from "next-auth";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Maximize Clicks: Shorten URLs with Ease!",
  description: "Experience the ultimate solution to lengthy URLs! Our cutting-edge URL shortener streamlines your links, enhancing accessibility and boosting click-through rates. Say goodbye to cumbersome addresses and hello to concise, shareable links. Start optimizing your online presence today!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { session },
}: {
  children: React.ReactNode;
  params: { session: Session | null };
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers session={session}>
          <TRPCReactProvider>
            <main className="h-screen w-screen">
              {children}
            </main>
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}