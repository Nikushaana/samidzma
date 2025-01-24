import React from "react";

export default function CustLoader() {
  return (
    <div
      className="inline-block h-full w-full animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
}
