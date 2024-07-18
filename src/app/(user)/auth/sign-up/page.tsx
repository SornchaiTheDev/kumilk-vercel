"use client";
import { GoogleButton } from "@/app/admin/auth/sign-in/components/GoogleButton";
import { Avatar, Button, TextInput } from "@mantine/core";
import { UserRoundPlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import Cow1 from "@/assets/images/cow1.png";
import { useRouter } from "next/navigation";

function SignupPage() {
  const router = useRouter();

  const handleOnSubmit = () => {
    router.push("/auth/create-account");
  };
  return (
    <div className="mt-10 flex md:flex-col md:gap-10 lg:flex-row lg:gap-20">
      <div className="flex-1 space-y-4">
        <Avatar size="lg" color="blue">
          <UserRoundPlus />
        </Avatar>
        <div>
          <h4 className="text-xl font-semibold">สมัครสมาชิก</h4>
          <p className="text-gray-700">ลงทะเบียนกับเราเพื่ออะไรดี</p>
        </div>

        <div className="flex items-center justify-between xl:gap-20">
          <div className="flex-1 space-y-4">
            <GoogleButton h={46} fullWidth>
              ลงทะเบียนด้วย Google
            </GoogleButton>
            <div className="mt-2 flex items-center gap-4 self-center">
              <div className="flex-1 border-t border-zinc-200"></div>
              <h5 className="text-sm">หรือ</h5>
              <div className="flex-1 border-t border-zinc-200"></div>
            </div>

            <TextInput
              size="md"
              label="อีเมล"
              flex="1"
              type="email"
              placeholder="john.doe@gmail.com"
            />
            <TextInput
              size="md"
              label="รหัสผ่าน"
              type="password"
              placeholder="••••••••••"
            />
            <TextInput
              size="md"
              label="ยืนยันรหัสผ่าน"
              type="password"
              placeholder="••••••••••"
            />
            <Button onClick={handleOnSubmit} fullWidth h={40}>
              สมัครสมาชิก
            </Button>
          </div>
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

export default SignupPage;
