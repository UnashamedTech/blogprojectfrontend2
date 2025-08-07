'use server';

import { GetRequest } from '@/base-api/method';

const Url = {
  adminProfile: `admin/user/user`,
};

export const fetchAdminProfile = async (id: string) => {
  try {
    const getRequest = new GetRequest(
      `${Url.adminProfile}/${id}`,
      'fetchAdminProfile'
    );
    const data = await getRequest.getData();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch admin profile.');
  }
};
