import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";
import "mantine-datatable/styles.css";

import { Anuphan } from "next/font/google";
import { type Metadata } from "next";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { TRPCReactProvider } from "@/trpc/react";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const fontSans = Anuphan({
  subsets: ["latin"],
  variable: "--font-sans",
});

const theme = createTheme({
  fontFamily: "var(--font-sans)",
  radius: {
    sm: "0.5rem",
  },
});

export const metadata: Metadata = {
  title: "KU Milk - สั่งนมล่วงหน้าออนไลน์",
  description: "KU Milk - สั่งนมล่วงหน้าออนไลน์",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={fontSans.className}>
        <TRPCReactProvider>
          <MantineProvider theme={theme}>
            <Notifications />
            <ModalsProvider>{children}</ModalsProvider>
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
