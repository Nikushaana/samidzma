import React from "react";
import CategoryComponent from "../components/categoryContent/categoryComponent";
import CategoryComponentTest from "../components/categoryContent/categoryComponentTest";

export const metadata = {
  title: "კატეგორიები | სამი ძმა",
  description: "ყველა კატეგორია ერთ სივრცეში – აირჩიე სასურველი პროდუქცია",
};

export default function page() {
  return (
    <div>
      {/* <CategoryComponent/> */}
      <CategoryComponentTest/>
    </div>
  );
}
