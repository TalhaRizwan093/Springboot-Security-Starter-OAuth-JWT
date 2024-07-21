"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import CollectionCard from "./CollectionCard";
import CollectionCard2 from "./CollectionCard2";
import Nav from "@/shared/Nav/Nav";
import NavItem2 from "./NavItem2";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import full1Img from "@/images/products/full1.png";
import full11Img from "@/images/products/full1-1.png";
import full12Img from "@/images/products/full1-2.png";
import full13Img from "@/images/products/full1-3.png";
//
import full2Img from "@/images/products/full2.png";
import full21Img from "@/images/products/full2-1.png";
import full22Img from "@/images/products/full2-2.png";
import full23Img from "@/images/products/full2-3.png";
//
import full3Img from "@/images/products/full3.png";
import full31Img from "@/images/products/full3-1.png";
import full32Img from "@/images/products/full3-2.png";
import full33Img from "@/images/products/full3-3.png";
import Link from "next/link";

export interface SectionSliderLargeProduct2Props {
  className?: string;
  itemClassName?: string;
  cardStyle?: "style1" | "style2";
}

export const DEMO_LARGE_PRODUCTS = [
  {
    id: 1,
    images: [full1Img, full11Img, full12Img, full13Img],
    name: "Suede Bomber Jacket",
    desc: "Orange",
    price: 52,
  },
  {
    id: 2,
    images: [full2Img, full21Img, full22Img, full23Img],
    name: "Downtown Pet Tote",
    desc: "Black and Orange",
    price: 88,
  },
  {
    id: 3,
    images: [full3Img, full31Img, full32Img, full33Img],
    name: "Cader Leather Sneakers",
    desc: "3 Sizes Available",
    price: 60,
  },
];

const SectionSliderLargeProduct2: FC<SectionSliderLargeProduct2Props> = ({
  className = "",
  cardStyle = "style1",
}) => {
  const [tabActive, setTabActive] = useState("Last 24 hours");

  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 3,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1024: {
          gap: 20,
          perView: 2.15,
        },
        768: {
          gap: 20,
          perView: 1.5,
        },

        500: {
          gap: 20,
          perView: 1,
        },
      },
    };

    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  const MyCollectionCard =
    cardStyle === "style1" ? CollectionCard : CollectionCard2;

  return (
    <div className={`nc-SectionSliderLargeProduct2 ${className}`}>
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
        fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
        isCenter
        desc=""
      >
        Top List Collections.
      </Heading>
      <Nav
        className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg"
        containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
      >
        {[
          {
            name: "Last 24 hours",
            icon: `<svg class="w-5 h-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9095 11.5668C17.9095 15.5918 14.6428 18.8585 10.6178 18.8585C6.59284 18.8585 3.32617 15.5918 3.32617 11.5668C3.32617 7.54181 6.59284 4.27515 10.6178 4.27515C14.6428 4.27515 17.9095 7.54181 17.9095 11.5668Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.6182 7.19177V11.3584" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.11816 2.19177H13.1182" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
          },
          {
            name: "Last 7 days",
            icon: `<svg class="w-5 h-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.28516 2.19177V4.69177" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.9512 2.19177V4.69177" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.53516 8.1001H17.7018" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.1182 7.60844V14.6918C18.1182 17.1918 16.8682 18.8584 13.9515 18.8584H7.28483C4.36816 18.8584 3.11816 17.1918 3.11816 14.6918V7.60844C3.11816 5.10844 4.36816 3.44177 7.28483 3.44177H13.9515C16.8682 3.44177 18.1182 5.10844 18.1182 7.60844Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.6972 11.9418H13.7047" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.6972 14.4418H13.7047" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.6142 11.9418H10.6217" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.6142 14.4418H10.6217" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.53025 11.9418H7.53774" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.53025 14.4418H7.53774" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
          },
          {
            name: "Last 30 days",
            icon: `<svg class="w-5 h-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.28516 2.19177V4.69177" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.9512 2.19177V4.69177" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.9515 3.44177C16.7265 3.59177 18.1182 4.65011 18.1182 8.56677V13.7168C18.1182 17.1501 17.2848 18.8668 13.1182 18.8668H8.11816C3.9515 18.8668 3.11816 17.1501 3.11816 13.7168V8.56677C3.11816 4.65011 4.50983 3.60011 7.28483 3.44177H13.9515Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.9095 15.1918H3.32617" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.6185 7.40015C9.59349 7.40015 8.72682 7.95848 8.72682 9.04181C8.72682 9.55848 8.96849 9.95015 9.33516 10.2001C8.82682 10.5001 8.53516 10.9835 8.53516 11.5501C8.53516 12.5835 9.32682 13.2251 10.6185 13.2251C11.9018 13.2251 12.7018 12.5835 12.7018 11.5501C12.7018 10.9835 12.4102 10.4918 11.8935 10.2001C12.2685 9.94181 12.5018 9.55848 12.5018 9.04181C12.5018 7.95848 11.6435 7.40015 10.6185 7.40015ZM10.6185 9.76681C10.1852 9.76681 9.86849 9.50848 9.86849 9.10015C9.86849 8.68348 10.1852 8.44181 10.6185 8.44181C11.0518 8.44181 11.3685 8.68348 11.3685 9.10015C11.3685 9.50848 11.0518 9.76681 10.6185 9.76681ZM10.6185 12.1918C10.0685 12.1918 9.66849 11.9168 9.66849 11.4168C9.66849 10.9168 10.0685 10.6501 10.6185 10.6501C11.1685 10.6501 11.5685 10.9251 11.5685 11.4168C11.5685 11.9168 11.1685 12.1918 10.6185 12.1918Z" fill="currentColor"/>
              </svg>
              `,
          },
        ].map((item, index) => (
          <NavItem2
            key={index}
            isActive={tabActive === item.name}
            onClick={() => setTabActive(item.name)}
          >
            <div className="flex items-center justify-center sm:space-x-2.5 text-xs sm:text-sm ">
              <span
                className="hidden sm:inline-block"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              ></span>
              <span>{item.name}</span>
            </div>
          </NavItem2>
        ))}
      </Nav>
      <div ref={sliderRef} className={`relative ${isShow ? "" : "invisible"}`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {DEMO_LARGE_PRODUCTS.map((item, index) => {
              return (
                <li key={index} className={`glide__slide`}>
                  <MyCollectionCard imgs={item.images} />
                </li>
              );
            })}

            <li className={`glide__slide   `}>
              <Link href={"/search"} className="block relative group">
                <div className="relative flex flex-col rounded-2xl overflow-hidden">
                  <div className="relative">
                    <div className="aspect-w-8 aspect-h-5 bg-black/5 dark:bg-neutral-800"></div>
                    <div className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center relative">
                        <span className="text-xl font-semibold">
                          More items
                        </span>
                        <svg
                          className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 20.4999V3.66992"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm mt-1">Show me more</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                    <div className="w-full h-28 bg-black/5 dark:bg-neutral-800"></div>
                    <div className="w-full h-28 bg-black/5 dark:bg-neutral-800"></div>
                    <div className="w-full h-28 bg-black/5 dark:bg-neutral-800"></div>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <Next className="absolute left-full ml-5 top-1/2 -translate-y-1/2" />
        <Prev className="absolute right-full mr-5 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default SectionSliderLargeProduct2;
