"use client";

import React from "react";
import { CategoryContent } from "@/app/components/categoryContent/CategoryContent";

export default function Page({ params }: { params: { thirdCategId: string } }) {
  return (
    <CategoryContent
      childCategsloader={false}
      childCategsData={[]}
    />
  );
}
