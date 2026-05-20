"use client";

import React from "react";
import CategoryComponentTest from "@/app/components/categoryContent/categoryComponentTest";
import { useQuery } from "@tanstack/react-query";
import { fetchThirdLevelCategories } from "@/api/thirdLevelCategory.api";

export default function SecondCategDetailsClient({
  params,
}: {
  params: { secCategId: string };
}) {
  // third level categories data
  const id = params.secCategId.split("_").pop()!;

  const {
    data: thirdLevelCategoriesData = [],
    isLoading: thirdLevelCategoriesLoader,
  } = useQuery({
    queryKey: ["thirdLevelCategories", id],
    queryFn: () => fetchThirdLevelCategories(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return (
    <CategoryComponentTest
      passedCategories={thirdLevelCategoriesData}
      passedCategoriesLoader={thirdLevelCategoriesLoader}
    />
  );
}
