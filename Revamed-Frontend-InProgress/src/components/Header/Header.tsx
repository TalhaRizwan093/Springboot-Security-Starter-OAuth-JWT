import React, { FC } from "react";
import MainNav2 from "./MainNav2";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="nc-Header relative w-full z-40 ">
      <MainNav2 />
    </div>
  );
};

export default Header;
