"use client";

import React, { FC, Fragment } from "react";
import { Menu, MenuButton, MenuItems, Transition } from "@/app/headlessui";
import Link from "next/link";
import { Route } from "@/routers/types";

export interface NcDropDownItem {
  id: string;
  name: string;
  icon?: string;
  href?: Route;
}

export interface NcDropDownProps {
  className?: string;
  panelMenusClass?: string;
  iconClass?: string;
  data: NcDropDownItem[];
  renderTrigger?: () => JSX.Element;
  renderItem?: (item: NcDropDownItem) => JSX.Element;
  title?: string;
  onClick: (item: NcDropDownItem) => void;
}

const NcDropDown: FC<NcDropDownProps> = ({
  className = `h-8 w-8 flex items-center justify-center`,
  iconClass = "w-4 h-4 sm:h-5 sm:w-5",
  panelMenusClass = "origin-top-right",
  title = "More",
  renderTrigger,
  renderItem,
  data,
  onClick,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className={className} title={title}>
        {renderTrigger ? (
          renderTrigger()
        ) : (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path
              d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={`absolute ${panelMenusClass} right-0 w-56 mt-2 bg-white dark:bg-neutral-900 rounded-2xl divide-y divide-neutral-100 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 focus:outline-none z-30`}
        >
          <div className="px-1 py-3 text-sm text-neutral-6000 dark:text-neutral-300">
            {data.map((item) => (
              <Menu.Item
                as={"div"}
                key={item.id}
                data-menu-item-id={item.id}
                onClick={() => onClick(item)}
              >
                {() =>
                  renderItem && typeof renderItem(item) !== "undefined" ? (
                    renderItem(item)
                  ) : !!item.href ? (
                    <Link
                      href={item.href}
                      className={
                        "flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate "
                      }
                    >
                      {!!item.icon && (
                        <i className={`${item.icon} mr-1 w-7 text-base`}></i>
                      )}
                      <span className="truncate">{item.name}</span>
                    </Link>
                  ) : (
                    <button
                      className={
                        "flex items-center rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate "
                      }
                    >
                      {!!item.icon && (
                        <i className={`${item.icon} mr-1 w-7 text-base`}></i>
                      )}
                      <span className="truncate">{item.name}</span>
                    </button>
                  )
                }
              </Menu.Item>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default NcDropDown;
