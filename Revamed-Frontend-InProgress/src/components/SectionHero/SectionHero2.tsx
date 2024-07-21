"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import backgroundLineSvg from "@/images/Moon.svg";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import { HERO2_DEMO_DATA as DATA } from "./data";
import useInterval from "beautiful-react-hooks/useInterval";
import useHorizontalSwipe from "beautiful-react-hooks/useHorizontalSwipe";
export interface SectionHero2Props {
  className?: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  // =================

  const ref = useRef<HTMLDivElement>(null);
  const swipeState = useHorizontalSwipe(ref, {
    threshold: 100,
    preventDefault: false,
    passive: true,
  });
  const [isSlided, setIsSlided] = useState(false);
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useState(true);

  useEffect(() => {
    if (isSlided || !indexActive) {
      return;
    }
    setIsSlided(true);
  }, [indexActive, isSlided]);

  useEffect(() => {
    if (swipeState.swiping || !swipeState.direction || !swipeState.count) {
      return;
    }
    swipeState.direction === "left" && handleClickNext();
    swipeState.direction === "right" && handleClickPrev();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swipeState.direction, swipeState.swiping, swipeState.count]);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5000 : 999999
  );

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return DATA.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };
  // ================= ================= =================

  // =================

  const renderDots = () => {
    return (
      <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 flex justify-center">
        {DATA.map((_, index) => {
          const isActive = indexActive === index;
          return (
            <div
              key={index}
              onClick={() => {
                setIndexActive(index);
                handleAfterClick();
              }}
              className={`relative px-1 py-1.5 cursor-pointer`}
            >
              <div
                className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}
              >
                {isActive && (
                  <div
                    className={`nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md ${
                      isActive ? " " : " "
                    }`}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = DATA[index];
    if (!isActive) {
      return null;
    }
    return (
      <div
        className={`nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
        key={index}
      >
        <div className="aspect-h-16 aspect-w-10 relative flex flex-col-reverse overflow-hidden sm:aspect-h-16 sm:aspect-w-13 lg:aspect-h-7 lg:aspect-w-16 2xl:aspect-h-[5.75] 2xl:aspect-w-16 lg:flex-col bg-slate-100">
          <div>{renderDots()}</div>

          {/* BG */}
          <div className="absolute inset-0 bg-[#E3FFE6]">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute w-full h-full object-contain"
              src={backgroundLineSvg}
              alt="hero"
            />
          </div>

          <div className="container">
            <div className="absolute end-0 rtl:-end-28 bottom-0 top-0 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-contain object-right-bottom nc-SectionHero2Item__image"
                src={item.image}
                alt={item.heading}
                priority
              />
            </div>
          </div>

          <div className="flex py-12 sm:py-14 lg:items-center">
            <div className="container relative">
              <div className="relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14 nc-SectionHero2Item__left">
                <div className="space-y-5 sm:space-y-6">
                  <span className="nc-SectionHero2Item__subheading block text-base md:text-xl text-slate-700 font-medium">
                    {item.subHeading}
                  </span>
                  <h2
                    className="nc-SectionHero2Item__heading font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl !leading-[114%] text-slate-900"
                    dangerouslySetInnerHTML={{ __html: item.heading }}
                  ></h2>
                </div>

                <ButtonPrimary
                  className="nc-SectionHero2Item__button dark:bg-slate-900"
                  sizeClass="py-3 px-6 sm:py-5 sm:px-9"
                  href={item.btnLink}
                >
                  <span>{item.btnText}</span>
                  <span>
                    <svg
                      className="w-5 h-5 ms-2.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 22L20 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={ref}>
      {DATA.map((_, index) => renderItem(index))}

      <button
        type="button"
        className="absolute inset-y-px end-0 px-10 hidden lg:flex items-center justify-center z-10 text-slate-700"
        onClick={handleClickNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.6}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <button
        type="button"
        className="absolute inset-y-px start-0 px-10 hidden lg:flex items-center justify-center z-10 text-slate-700"
        onClick={handleClickPrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.6}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default SectionHero2;
