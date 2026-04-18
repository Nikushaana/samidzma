"use client";

import React from "react";
import CategoryComponent from "@/app/components/categoryContent/categoryComponent";
import CategoryComponentTest from "@/app/components/categoryContent/categoryComponentTest";
import { useQuery } from "@tanstack/react-query";
import { fetchSecondLevelCategories } from "@/api/secondLevelCategory.api";

export default function FirstCategDetailsClient({
  params,
}: {
  params: { firstCategId: string };
}) {
  // second level categories data
  const id = params.firstCategId.split("_").pop() as string;

  const {
    data: secondLevelCategoriesData = [],
    isLoading: secondLevelCategoriesLoader,
  } = useQuery({
    queryKey: ["secondLevelCategories", id],
    queryFn: () => fetchSecondLevelCategories(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return (
    // <CategoryComponent passedCategories={secondLevelCategoriesData} passedCategoriesLoader={secondLevelCategoriesLoader}/>
    <CategoryComponentTest
      passedCategories={secondLevelCategoriesData}
      passedCategoriesLoader={secondLevelCategoriesLoader}
    />
  );
}
