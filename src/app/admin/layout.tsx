import Footer from "../_components/organisms/footer/Footer";
import NavbarHeader from "./_components/organisms/navbarHeader/NavbarHeader";
import { checkAdminAuth } from "@/libs/checkAdminAuth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (session?.user === undefined || typeof session.user.email !== "string")
    return redirect("/auth/sign-in");

  const status = await checkAdminAuth(session.user.email);

  if (status === "NOT_AUTHORIZED") {
    return redirect("/auth/sign-in");
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
