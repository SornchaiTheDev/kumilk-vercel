import { Avatar, Button, TextInput } from "@mantine/core";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import React from "react";
import Cow1 from "@/assets/images/cow1.png";

function CreateAccountPage() {
  return (
    <div className="mt-10 flex md:flex-col md:gap-10 lg:flex-row lg:gap-20">
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
        <div className="space-y-4">
          <div className="flex flex-col gap-8 md:flex-row">
            <TextInput size="md" label="ชื่อ" flex="1" />
            <TextInput size="md" label="นามสกุล" flex="1" />
          </div>
          <TextInput size="md" label="เบอร์โทรศัพท์" />
          <Button fullWidth h={40}>
            บันทึกข้อมูล
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-1">
        <Image
          src={Cow1}
          className="hidden aspect-square md:block max-w-[400px]"
          alt="milk cow in the farm"
        />
      </div>
    </div>
  );
}

export default CreateAccountPage;
