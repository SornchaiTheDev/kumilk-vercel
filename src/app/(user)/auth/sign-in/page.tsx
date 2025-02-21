"use client";
import { GoogleButton } from "@/app/admin/auth/sign-in/components/GoogleButton";
import { Button } from "@mantine/core";
import Link from "next/link";
import EmailLoginComponent from "../../_components/organisms/emailLogin/EmailLogin";
import { signIn } from "next-auth/react";

function CustomerSignInPage() {
  return (
    <div className="mt-10 md:mt-20">
      <div className="flex w-full flex-col gap-10 md:flex-row xl:gap-20">
        <div className="flex flex-1 flex-col gap-4">
          <h4 className="text-2xl font-bold">เข้าสู่ระบบ</h4>
          <GoogleButton onClick={() => signIn("google")} h={46} fullWidth>
            เข้าสู่ระบบด้วย Google
          </GoogleButton>
          <div className="mt-2 flex w-1/2 items-center gap-4 self-center">
            <div className="flex-1 border-t border-zinc-200"></div>
            <h5 className="text-sm">หรือ</h5>
            <div className="flex-1 border-t border-zinc-200"></div>
          </div>
          <EmailLoginComponent type="sign-in" />
        </div>
        <div className="h-1 border-t"></div>
        <div className="flex flex-1 flex-col gap-4">
          <h4 className="text-2xl font-bold">ยังไม่ได้เป็นสมาชิก ?</h4>
          <Link href="/auth/sign-up" passHref>
            <Button fullWidth h={46}>
              สมัครสมาชิก
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerSignInPage;
