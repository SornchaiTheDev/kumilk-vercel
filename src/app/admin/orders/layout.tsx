import Footer from "@/app/_components/organisms/footer/Footer";
import NavbarHeader from "@/app/admin/_components/organisms/navbarHeader/NavbarHeader";
import { checkAdminAuth } from "@/libs/checkAdminAuth";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";

export default async function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (session?.user === undefined || typeof session.user.email !== "string")
    return redirect("/admin/auth/sign-in");

  const status = await checkAdminAuth(session.user.email);

  if (status === "NOT_AUTHORIZED") {
    return redirect("/admin/auth/sign-in");
  }

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
