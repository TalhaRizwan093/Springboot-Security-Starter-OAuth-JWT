import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <div className="container flex flex-col justify-center items-center mx-auto">
        <h1 className="my-20 text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100">
          Welcome to my website
        </h1>
        <ButtonPrimary className="mx-auto mb-10" href="/login">
          Get Started
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default PageHome;
