"use client";
import axios from "axios";
import { type FormEvent, useState } from "react";

function UploadFileRest() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState("");

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file === undefined) return;
    formData.append("file", file);
    try {
      const res = await axios.post<{ dest: string }>(
        "/api/v1/upload",
        formData,
      );
      setImage(res.data.dest);
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
      <img src={image} className="mt-10 w-96" />
    </div>
  );
}

export default UploadFileRest;
