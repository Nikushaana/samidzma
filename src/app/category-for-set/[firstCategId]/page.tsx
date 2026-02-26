"use client";

import React from "react";
import CategoryForSetComponent from "@/app/components/categoryForSetContent/categoryForSetComponent";

export default function Page({ params }: { params: { firstCategId: string } }) {
  return <CategoryForSetComponent />;
}
