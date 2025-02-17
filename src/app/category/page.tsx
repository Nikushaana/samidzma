import React from "react";
import { CategoryContent } from "../components/categoryContent/CategoryContent";

export default function page() {
  return (
    <div>
      <CategoryContent childCategsloader={false} childCategsData={[]}/>
    </div>
  );
}
