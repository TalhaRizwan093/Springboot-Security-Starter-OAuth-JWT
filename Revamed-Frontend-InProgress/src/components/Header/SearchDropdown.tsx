import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@/app/headlessui";
import Input from "@/shared/Input/Input";
import React, { FC } from "react";

interface Props {
  className?: string;
}

const SearchDropdown: FC<Props> = ({ className = "" }) => {
  const inputRef = React.createRef<HTMLInputElement>();

  return (
    <React.Fragment>
      <Popover className={`relative ${className}`}>
        {({ open }) => {
          if (open) {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }

          return (
            <>
              <PopoverButton className="w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
              </PopoverButton>

              <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  static
                  className="absolute right-0 z-10 w-screen max-w-sm mt-3"
                >
                  <form action="" method="POST">
                    <Input
                      ref={inputRef}
                      type="search"
                      placeholder="Type and press enter"
                    />
                    <input type="submit" hidden value="" />
                  </form>
                </PopoverPanel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </React.Fragment>
  );
};

export default SearchDropdown;
