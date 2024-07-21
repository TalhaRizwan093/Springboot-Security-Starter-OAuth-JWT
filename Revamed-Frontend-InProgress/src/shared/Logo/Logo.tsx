import React from "react";
import logoImg from "@/images/toosterr.png";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      <Image
        className={`block h-8 sm:h-10 w-auto ${"dark:hidden"}`}
        src={img}
        alt="Logo"
        sizes="200px"
        priority
      />
      <h2 className="flex text-2xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center items-center">
        Toosterr
      </h2>
    </Link>
  );
};

export default Logo;
