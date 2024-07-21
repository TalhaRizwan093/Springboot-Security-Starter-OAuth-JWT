"use client";

import React from "react";
import Header from "@/components/Header/Header";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  useThemeMode();

  return <Header />;
};

export default SiteHeader;
