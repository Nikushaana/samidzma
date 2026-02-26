"use client";

import React from "react";
import useFrontBranches from "../../../../dataFetchs/frontBranchesContext";

export default function MappedBranches() {
  const { FrontBranchesData } = useFrontBranches();
  return (
    <ul className="text-[14px] list-decimal list-inside">
      {FrontBranchesData.map((item: any) => (
        <li key={item.id}>{item.Address}</li>
      ))}
    </ul>
  );
}
