import Image from "next/image";
import React from "react";
import { footerLinks } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col mt-5 border-t border-gray-100 text-black-100">
      <div className="flex flex-wrap justify-between px-6 py-10 max-md:flex-col jap-5 sm:px-16">
        <div className="flex flex-col items-start justify-start gap-6">
          <Link href="#">
            <Image
              src="/logo.svg"
              alt="logo"
              width={120}
              height={20}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link key={item.title} href={item.url}>
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between px-6 py-10 mt-10 border-t corder-gray-200 sm:px-16 ">
        <p>&copy;2023 CarHub. All Rights Reserved</p>
        <div className="footer__copyrights-link">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Terms of use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
