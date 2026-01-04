import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bussinessAge = new Date().getFullYear() - 1993;

export const GalleryCategories = ["Sweets", "Gift Boxes", "Shop", "Events", "Special Orders"];
