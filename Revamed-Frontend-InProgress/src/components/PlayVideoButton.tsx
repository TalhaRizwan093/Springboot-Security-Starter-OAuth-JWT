import React from "react";

export interface PlayVideoButtonProps {
  className?: string;
}

const PlayVideoButton: React.FC<PlayVideoButtonProps> = ({ className }) => {
  return (
    <button
      className={`bg-black/50 w-10 h-10 flex items-center justify-center rounded-full text-white ${className}`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default PlayVideoButton;
