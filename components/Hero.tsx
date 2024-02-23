"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero">
      <div className="flex-1 pt-32 pl-6 sm:pl-16">
        <h1 className="hero__title">
          Find, book, or rent a car - quickly and easily
        </h1>
        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking
          process.
        </p>
        <Link
          href="#search"
          className="mt-10 text-white transition-transform rounded-full w-fit custom-btn bg-primary-blue hover:scale-105"
        >
          Explore Cars
        </Link>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/hero-bugatti-chiron.png"
            alt="hero"
            fill
            className="object-contain"
          />
        </div>
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
