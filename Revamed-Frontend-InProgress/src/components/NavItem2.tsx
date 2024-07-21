import React, { FC, ReactNode } from "react";
import twFocusClass from "@/utils/twFocusClass";

export interface NavItem2Props {
  className?: string;
  radius?: string;
  onClick?: () => void;
  isActive?: boolean;
  renderX?: ReactNode;
  children?: React.ReactNode;
}

const NavItem2: FC<NavItem2Props> = ({
  className = "px-3.5 py-2 text-sm sm:px-7 sm:py-3 capitalize",
  radius = "rounded-full",
  children,
  onClick = () => {},
  isActive = false,
  renderX,
}) => {
  return (
    <li className="nc-NavItem2 relative" data-nc-id="NavItem2">
      {renderX && renderX}
      <button
        className={`block font-medium whitespace-nowrap ${className} ${radius} ${
          isActive
            ? "bg-slate-900 text-slate-50"
            : "text-slate-600 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-900 "
        } ${twFocusClass()}`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {children}
      </button>
    </li>
  );
};

export default NavItem2;
