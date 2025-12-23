import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GalleryCategories = ["Sweets", "Gift Boxes", "Shop", "Events", "Special Orders"];
