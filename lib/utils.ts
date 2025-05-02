import { clsx, type ClassValue } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeToken(token: string) {
  try {
    return jwtDecode(token); // Returns the decoded payload
  } catch (err) {
    return null;
  }
}
export function getFallBack(fullName: string) {
  // takes in a name and returns its initals
  return fullName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};


// lib/auth.ts
export async function verifyToken(token: string) {
  try {
    // Example JWT verification
    const decoded = decodeToken(token);
    return !!decoded;
  } catch (error) {
    return false;
  }
}
