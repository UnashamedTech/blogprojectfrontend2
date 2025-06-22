export interface DecodedToken {
  name?: string;
  email?: string;
  id: string;
  userId?: string;
  imageUrl?: string;
  role?: {
    id: string | null;
    name: string | null;
  };
  roles?: string | string[];
  [key: string]: any;
}
