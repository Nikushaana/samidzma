"use client";

import CategoryForSetComponent from "@/app/components/categoryForSetContent/categoryForSetComponent";
import React from "react";

export default function Page({ params }: { params: { thirdCategId: string } }) {
  return <CategoryForSetComponent />;
}
