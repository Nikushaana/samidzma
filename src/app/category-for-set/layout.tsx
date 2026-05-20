"use client";

import React, { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div />}>{children}</Suspense>
    </div>
  );
}
