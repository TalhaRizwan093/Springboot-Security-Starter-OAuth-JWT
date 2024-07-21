import React, { FC, ReactNode } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import rightImg from "@/images/about-hero-right.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export interface SectionHeroProps {
  className?: string;
  heading?: ReactNode;
  subHeading?: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  heading = "Discover, collect, and sell extraordinary NFTs ",
  subHeading = "Discover the most outstanding NTFs in all topics of life. Creative your NTFs and sell them",
}) => {
  return (
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 lg:items-center relative">
        <div className="w-screen max-w-full xl:max-w-xl space-y-5 lg:space-y-7">
          <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {heading}
          </h2>
          <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400 max-w-lg">
            {subHeading}
          </span>
          <div className="pt-7 flex  space-x-4">
            <ButtonPrimary href="/search">
              <span className="">Explore</span>
              <MagnifyingGlassIcon className="w-5 h-5 ml-2.5" />
            </ButtonPrimary>
            <ButtonSecondary href="/search">
              <span>Create</span>
              <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 22H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonSecondary>
          </div>
        </div>
        <div className="flex-grow">
          <Image
            className="w-full"
            src={rightImg}
            alt=""
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
