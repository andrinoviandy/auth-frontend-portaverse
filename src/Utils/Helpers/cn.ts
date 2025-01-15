import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that merges class names and tailwind classes.
 */

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
