import SignOutButton from "./_components/molecules/signOutButton/signOutButton";
import CreateProduct from "./_components/organisms/createProduct/CreateProduct";
import UploadFileAction from "./_components/organisms/uploadFile/UploadFileAction";
import UploadFileRest from "./_components/organisms/uploadFile/UploadFileRest";

export default async function Home() {
  return (
    <div>
      admin
      <UploadFileAction />
      <UploadFileRest />
      <CreateProduct />
      <SignOutButton />
    </div>
  );
}
