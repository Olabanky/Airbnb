"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

// declare global variables for cloudinary
declare global {
  var cloudinary: any;
}

const uploadPreset = "nqlehtzj";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  // for successful Upload
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onchange]
  );

  return (
    // create cloudinary account and also google how to install cloudinary in next.js
    // then npm install next-cloudinary
    // in your cloudiary, go to setting and change signing mode to UNSIGNED and then copy the upload preset name and save.

    <CldUploadWidget
      onUpload={handleUpload}
      //   uploadPreset="nqlehtzj" /**the upload preset name we copied from cloudinary */
      uploadPreset={
        uploadPreset
      } /**the upload preset name we copied from cloudinary */
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed
                border-2
                p-20
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600

            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg"> Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
