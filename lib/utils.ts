import { clsx, type ClassValue } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { twMerge } from 'tailwind-merge';
import type { DecodedToken } from '@/types/auth'; // Make sure this path is correct

/**
 * Combines class names using Tailwind Merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Decodes a JWT token and returns a typed payload
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token); // Strongly typed
  } catch {
    return null;
  }
}

/**
 * Extracts initials from a full name
 */
export function getFallBack(fullName: string): string {
  return fullName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

/**
 * Checks if a token is valid (can be decoded)
 */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const decoded = decodeToken(token);
    return !!decoded;
  } catch {
    return false;
  }
}
