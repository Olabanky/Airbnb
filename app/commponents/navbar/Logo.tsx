"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() =>
        router.push("/")
      } /**This takes you back home when clicked */
      alt="Logo"
      //hidden in smaller devices
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      src="/images/logo.png"
    ></Image>
  );
};

export default Logo;
