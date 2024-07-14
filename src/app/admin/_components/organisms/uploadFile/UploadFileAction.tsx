"use client";
import { uploadFile } from "@/app/admin/actions/uploadFile";
import { type FormEvent, useState } from "react";

function UploadFileAction() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState("");

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file === undefined) return;
    formData.append("file", file);
    try {
      const [dest, err] = await uploadFile(formData);
      if (err !== null) {
        console.log(err);
      }
      if (dest !== null) {
        setImage(dest);
      }
    } catch (err) {}
  };

  return (
    <div className="my-10">
      <h6>Server Action Method</h6>
      <form onSubmit={handleOnSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files![0])}
          name="file"
        />
        <input type="submit" className="bg-blue-500 px-4 py-2 rounded-lg active:bg-blue-400" />
      </form>
      <img src={image} className="w-96 mt-10" />
    </div>
  );
}

export default UploadFileAction;
