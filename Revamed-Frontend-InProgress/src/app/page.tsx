"use client";

import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { addAuth } from "@/redux/slice/authSlice";

function PageHome() {
  const token = useSelector((state: RootState) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const paramToken = searchParams.get("token");
    if (paramToken) {
      dispatch(addAuth(paramToken));
      localStorage.setItem("token", paramToken);
      navigate.replace("/");
    }
  }, [token.token]);

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <div className="container flex flex-col justify-center items-center mx-auto">
        <h1 className="my-20 text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100">
          Welcome to my website
        </h1>
        {isLoggedIn ? (
          <ButtonPrimary className="mx-auto mb-10" href="/account">
            View Account
          </ButtonPrimary>
        ) : (
          <>
            <ButtonPrimary className="mx-auto mb-10" href="/login">
              Get Started
            </ButtonPrimary>
          </>
        )}
      </div>
    </div>
  );
}

export default PageHome;
