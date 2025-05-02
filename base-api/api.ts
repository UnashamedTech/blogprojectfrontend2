'use server';
import { cookies } from 'next/headers';
import { apiUrl } from '../actions/auth/login';

interface CustomError {
  message: string;
  response: {
    data: unknown;
  };
}

const apiCall = async ({
  url,
  method = 'GET',
  data = [],
  cache_type = 'no-cache',
  onStart,
  onSuccess,
  onError,
  tag,
}: {
  url: string;
  method?: string;
  data?: unknown;
  onStart?: () => void;
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
  cache_type?: 'no-cache' | 'force-cache' | 'no-store';
  tag: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  const baseUrl = await apiUrl();
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
      cache: cache_type,
      next: { tags: [tag] },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData?.error.message || 'Something went wrong');
    }

    // Call onSuccess callback if provided
    //if (onSuccess) onSuccess(responseData);

    return responseData;
  } catch (error: unknown) {
    const errorMessage =
      (error as CustomError)?.message || 'An unexpected error occurred';
    // Call onError callback if provided
    //if (onError) onError(errorMessage);
    if (errorMessage === 'Invalid or expired token') {
      //logoutAction();
    }
    return {
      error: {
        title: 'Error!',
        description: errorMessage,
        duration: 3000,
      },
    };
  }
};

export default apiCall;
