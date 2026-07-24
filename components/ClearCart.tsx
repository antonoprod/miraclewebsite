"use client";

import { useEffect } from "react";
import { CART_STORAGE_KEY } from "@/data/cart";

export default function ClearCart() {
  useEffect(() => {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  }, []);
  return null;
}
