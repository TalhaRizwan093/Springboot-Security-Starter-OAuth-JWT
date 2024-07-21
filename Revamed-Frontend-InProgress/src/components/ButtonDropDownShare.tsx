import React from "react";
import NcDropDown from "@/shared/NcDropDown/NcDropDown";

export interface ButtonDropDownShareProps {
  className?: string;
  panelMenusClass?: string;
}

const ButtonDropDownShare = ({
  className = "py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer ",
  panelMenusClass = "",
}) => {
  return (
    <NcDropDown
      className={className}
      renderTrigger={() => (
        <svg
          className="w-4 h-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.44 8.8999C20.04 9.2099 21.51 11.0599 21.51 15.1099V15.2399C21.51 19.7099 19.72 21.4999 15.25 21.4999H8.73998C4.26998 21.4999 2.47998 19.7099 2.47998 15.2399V15.1099C2.47998 11.0899 3.92998 9.2399 7.46998 8.9099"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15.0001V3.62012"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.35 5.85L12 2.5L8.65002 5.85"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      panelMenusClass={panelMenusClass}
      onClick={() => {}}
      data={[
        {
          id: "Facebook",
          name: "Facebook",
          icon: "lab la-facebook-f",
        },
        { id: "Twitter", name: "Twitter", icon: "lab la-twitter" },
        {
          id: "Linkedin",
          name: "Linkedin",
          icon: "lab la-linkedin-in",
        },
        {
          id: "Instagram",
          name: "Instagram",
          icon: "lab la-instagram",
        },
      ]}
    />
  );
};

export default ButtonDropDownShare;
