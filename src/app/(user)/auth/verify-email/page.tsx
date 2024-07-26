import { CircleCheck } from "lucide-react";
import React from "react";

async function VerifyEmailPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <CircleCheck size="4rem" className="text-green-500" />
        <h4 className="text-2xl">
          เราได้ส่งอีเมลยืนยันไปเรียบร้อยแล้ว
        </h4>
        <p className="text-xl">กรุณาตรวจสอบและกดปุ่มยืนยันในอีเมล</p>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
