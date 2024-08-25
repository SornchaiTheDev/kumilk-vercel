import { Avatar } from "@mantine/core";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import React from "react";
import Cow1 from "@/assets/images/cow1.png";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import UserInfo from "../../_components/organisms/userInfo/UserInfo";
import { isAlreadyHaveInfo } from "./actions/getUserInfo";

async function CreateAccountPage() {
  const customerMiddleware = async () => {
    const session = await getServerAuthSession();

    if (session === null) redirect("/");
    if (!!session.user.id === false) redirect("/");

    if (await isAlreadyHaveInfo(session.user.id)) redirect("/");
  };

  await customerMiddleware();

  return (
    <div className="mt-10 flex flex-col md:gap-10 lg:flex-row lg:gap-20">
      <div className="flex-1 space-y-4">
        <Avatar size="lg" color="blue">
          <PencilLine />
        </Avatar>
        <div>
          <h4 className="text-xl font-semibold">รายละเอียดบัญชีผู้ใช้</h4>
          <p className="text-gray-700">
            ข้อมูลเพื่อใช้ในการยืนยันตัวตนในวันเข้ารับสินค้า
          </p>
        </div>
        <UserInfo />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Image
          src={Cow1}
          className="aspect-square max-w-[400px] md:block"
          alt="milk cow in the farm"
        />
      </div>
    </div>
  );
}

export default CreateAccountPage;
