import { ActionIcon, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import Footer from "./components/organisms/Footer";
import NavbarHeader from "./components/organisms/navbarHeader/NavbarHeader";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mb-10 flex flex-grow flex-col">
        <NavbarHeader />
        <div className="px-4 py-3">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
