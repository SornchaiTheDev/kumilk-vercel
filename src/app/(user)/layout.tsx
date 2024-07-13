import NavbarHeader from "./_components/organisms/navbarHeader/NavbarHeader";
import Footer from "../_components/organisms/footer/Footer";

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
