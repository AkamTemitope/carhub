import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <header className="absolute z-10 w-full">
<<<<<<< HEAD
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
=======
      <nav className="max-w[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
>>>>>>> 3cde44e361e9f4f793b6fa7483187ae62c2e25ca
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={120}
            height={20}
            className="object-contain"
          />
        </Link>
        <CustomButton
          title="Sign In"
          btnType="button"
          containerStyles="xl:text-primary-blue text-primary-blue border-2 text-bold hover:scale-105 transition-transform border-primary-blue rounded-full xl:bg-gray-100 min-w-[130px]"
        />
      </nav>
    </header>
  );
};

export default Navbar;
