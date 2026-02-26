"use client";

import { useEffect } from "react";

export function DontScrollMainBody(isPopupVisible: boolean) {
  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isPopupVisible]);
} 
