import {
  Badge,
  Button,
  Group,
  Modal,
  Text,
  Input,
  rem,
  Select,
} from "@mantine/core";
import { useCounter, useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import React, { useEffect, useState } from "react";
import { Dropzone, type DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import RichText from "../../molecules/Input/RichText";
import "@mantine/tiptap/styles.css";
import { addProductSchema, type addProductType } from "@/schemas/addProduct";
import { notifications } from "@mantine/notifications";
import { editProductSchema, ProductType, type editProductType } from "@/schemas/editProduct";
 

interface Props {
  mode: "create" | "edit";
  opened: boolean;
  open: () => void;
  close: () => void;
  onSubmit?: (data: ProductType) => void;
  productData: editProductType | undefined | null;
}

interface previewImage {
  url: string;
  file: File;
  name: string;
  size: number;
  status: "ready" | "process" | "done" | "failed";
  result: string | null;
  fileType: string;
  progress: number;
}

export default function CreateEditProductModal({
  mode,
  opened,
  open,
  close,
  onSubmit,
  productData,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<previewImage | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: mode === "edit" && productData ? productData.name : "",
      price: mode === "edit" && productData ? productData.price : 0,
      quantity: mode === "edit" && productData ? productData.quantity : 0,
      description:
        mode === "edit" && productData
          ? productData.description
          : `<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>`,
      image: mode === "edit" && productData ? productData.image : "",
      status: mode === "edit" && productData ? productData.status.toString() : "true",
    },
    validate: zodResolver(mode === "edit" ? editProductSchema : addProductSchema),
  });

  useEffect(() => {
    if (mode === "edit" && productData?.image) {
      setPreviewUrl({
        url: productData.image,
        file: new File([], productData.image),
        name: productData.image,
        size: 0,
        status: "ready",
        result: null,
        fileType: "",
        progress: 0,
      });
    }
  }, [mode, productData]);


  const onDropFile: DropzoneProps["onDrop"] = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl({
          url: reader.result as string,
          file: file,
          name: file.name,
          size: file.size,
          status: "ready",
          result: null,
          fileType: file.type,
          progress: 0,
        });
        form.setFieldValue("image", file.name);
      };
      form.clearFieldError("image");

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: typeof form.values) => {
    if (!file && mode === "create") {
      form.setFieldError("image", "กรุณาเลือกรูปภาพสินค้า");
      return;
    }

    const processedValues = {
      ...values,
      price: Number(values.price),
      quantity: Number(values.quantity),
      status: String(values.status).toLowerCase() === "true",
    } as addProductType;

    if (mode === "edit") {
      (processedValues as editProductType).id = productData?.id ?? "";
    }
    
    if (onSubmit) {
      onSubmit(processedValues);
    }
  };

  return (
    <Modal opened={opened} onClose={close} size="auto" title="เพิ่มสินค้า">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            {previewUrl ? (
              <>
                <img
                  src={previewUrl?.url || ""}
                  className="rounded-lg"
                  alt="Preview"
                  style={{
                    width: "25rem",
                    height: "25rem",
                    objectFit: "cover",
                  }}
                />
                <Button
                  onClick={() => {
                    setPreviewUrl(null);
                    setFile(null);
                    form.setFieldValue("image", "");
                  }}
                  color="red"
                  variant="outline"
                  size="xs"
                  className="mt-5"
                >
                  ลบ
                </Button>
              </>
            ) : (
              <>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    onDropFile(acceptedFiles);
                  }}
                  onReject={(rejectedFiles) => {
                    notifications.show({
                      title: "ไม่สามารถอัปโหลดไฟล์",
                      message: rejectedFiles[0]?.errors[0]?.message,
                      color: "red",
                    });
                  }}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                  multiple={false}
                >
                  <Group
                    justify="center"
                    gap="xl"
                    mih={220}
                    miw={50}
                    style={{ pointerEvents: "none" }}
                  >
                    <Dropzone.Accept>
                      <IconUpload
                        style={{
                          width: rem(52),
                          height: rem(52),
                          color: "var(--mantine-color-blue-6)",
                        }}
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        style={{
                          width: rem(52),
                          height: rem(52),
                          color: "var(--mantine-color-red-6)",
                        }}
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto
                        style={{
                          width: rem(52),
                          height: rem(52),
                          color: "var(--mantine-color-dimmed)",
                        }}
                        stroke={1.5}
                      />
                    </Dropzone.Idle>

                    <div>
                      <Text size="xl" inline>
                        ลากไฟล์มาวางที่นี่หรือคลิกเพื่อเลือกไฟล์
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        แนบไฟล์ที่คุณต้องการ ไฟล์ไม่ควรเกิน 5mb
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
                {form.errors.image && (
                  <Text c="red" size="sm">
                    {form.errors.image}
                  </Text>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Input.Wrapper label="ชื่อสินค้า" error={form.errors.name}>
              <Input
                placeholder="กรุณากรอกชื่อสินค้า"
                {...form.getInputProps("name")}
              />
            </Input.Wrapper>
            <Input.Wrapper
              label="รายละเอียดสินค้า"
              error={form.errors.description}
            >
              <RichText
                value={form.values.description}
                onChange={(value) => {
                  form.setFieldValue("description", value);
                  console.log(value);
                }}
              />
            </Input.Wrapper>
            <Input.Wrapper label="สต็อกสินค้า" error={form.errors.quantity}>
              <Input
                placeholder="กรุณากรอกจำนวนสต็อกสินค้าที่มี"
                type="number"
                {...form.getInputProps("quantity")}
              />
            </Input.Wrapper>
            <Input.Wrapper label="ราคาสินค้า" error={form.errors.price}>
              <Input
                placeholder="กรุณากรอกราคาสินค้า"
                type="number"
                {...form.getInputProps("price")}
              />
            </Input.Wrapper>
            <Input.Wrapper label="สถานะสินค้า">
              <Select
                placeholder="เลือกสถานะสินค้า"
                {...form.getInputProps("status")}
                allowDeselect={false}
                defaultValue={"true"}
                datatype="boolean"
                data={[
                  {
                    label: "แสดงสินค้า",
                    value: "true",
                  },
                  {
                    label: "ไม่แสดงสินค้า",
                    value: "false",
                  },
                ]}
              />
            </Input.Wrapper>
          </div>
        </div>
        <Group mt="md" justify="right">
          <Button type="submit">สร้างสินค้า</Button>
        </Group>
      </form>
    </Modal>
  );
}
