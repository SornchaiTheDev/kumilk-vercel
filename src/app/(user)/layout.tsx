import NavbarHeader from "./_components/organisms/navbarHeader/NavbarHeader";
import Footer from "../_components/organisms/footer/Footer";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mb-10 flex flex-grow flex-col">
        <NavbarHeader />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-3">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
