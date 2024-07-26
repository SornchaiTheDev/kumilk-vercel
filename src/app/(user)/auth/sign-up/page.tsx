"use client";
import { GoogleButton } from "@/app/admin/auth/sign-in/components/GoogleButton";
import { Avatar } from "@mantine/core";
import { MoveLeft, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Cow1 from "@/assets/images/cow1.png";
import { signIn } from "next-auth/react";
import EmailLoginComponent from "../../_components/organisms/emailLogin/EmailLogin";
import Link from "next/link";

function SignupPage() {
  return (
    <>
      <div className="mt-10 flex md:flex-col md:gap-10 lg:flex-row lg:gap-20">
        <div className="flex-1 space-y-4">
          <Link
            href="/auth/sign-in"
            className="flex items-center gap-2 text-gray-800 hover:text-gray-500 group w-fit"
          >
            <MoveLeft className="transition-all group-hover:-translate-x-1" />
            <h6>มีบัญชีอยู่แล้ว ?</h6>
          </Link>
          <Avatar size="lg" color="blue">
            <UserRoundPlus />
          </Avatar>
          <div>
            <h4 className="text-xl font-semibold">สมัครสมาชิก</h4>
            <p className="text-gray-700">ลงทะเบียนกับเราเพื่ออะไรดี</p>
          </div>

          <div className="flex items-center justify-between xl:gap-20">
            <div className="flex-1 space-y-4">
              <GoogleButton onClick={() => signIn("google")} h={46} fullWidth>
                ลงทะเบียนด้วย Google
              </GoogleButton>
              <div className="mt-2 flex items-center gap-4 self-center">
                <div className="flex-1 border-t border-zinc-200"></div>
                <h5 className="text-sm">หรือ</h5>
                <div className="flex-1 border-t border-zinc-200"></div>
              </div>
              <EmailLoginComponent type="sign-up" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Image
            src={Cow1}
            className="hidden aspect-square max-w-[400px] md:block"
            alt="milk cow in the farm"
          />
        </div>
      </div>
    </>
  );
}

export default SignupPage;
