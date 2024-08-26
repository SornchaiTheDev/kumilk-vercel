import { redirect } from "next/navigation";

function AdminMainPage() {
  redirect("/admin/products");
}

export default AdminMainPage;
