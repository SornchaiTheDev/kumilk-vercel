import NavbarHeader from "./_components/organisms/navbarHeader/NavbarHeader";
import Footer from "../_components/organisms/footer/Footer";
import { getServerAuthSession } from "@/server/auth";
import { checkAdminAuth } from "@/libs/checkAdminAuth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (session?.user !== undefined && typeof session.user.email === "string") {
    const status = await checkAdminAuth(session.user.email);

    if (status === "OK") {
      return redirect("/admin/products");
    }
  }
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
