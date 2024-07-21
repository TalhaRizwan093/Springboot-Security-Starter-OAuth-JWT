import { _getTagNameRd } from "@/contains/fakeData";
import Link from "next/link";
import React, { FC } from "react";

export interface TagProps {
  className?: string;
  hideCount?: boolean;
}

const Tag: FC<TagProps> = ({ className = "", hideCount = false }) => {
  // DEMO DATA
  return (
    <Link
      className={`nc-Tag inline-block bg-white text-sm text-neutral-600 dark:text-slate-400 py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 ${className}`}
      data-nc-id="Tag"
      href={"/blog"}
    >
      {`${_getTagNameRd()}`}
      {!hideCount && <span className="text-xs font-normal"> (22)</span>}
    </Link>
  );
};

export default Tag;
