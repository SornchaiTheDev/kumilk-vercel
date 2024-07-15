"use client";
import axios from "axios";
import { type FormEvent, useState } from "react";

function UploadSlipExample() {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file === undefined) return;
    formData.append("file", file);
    formData.append("orderId", "clymdigi30001b6o56jd926rw");

    try {
      const res = await axios.post<{ dest: string }>(
        "/api/v1/upload/slip",
        formData,
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-10">
      <h6>REST Method</h6>
      <form onSubmit={handleOnSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files![0])}
          name="file"
        />
        <input
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 active:bg-blue-400"
        />
      </form>
    </div>
  );
}

export default UploadSlipExample;
