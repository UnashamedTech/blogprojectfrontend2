'use server';

import { GetRequest } from '@/base-api/method';

const Url = {
    userProfile: `admin/user`,
};

export const fetchUserProfile = async (userId: string, id: string) => {
    try {
        const getRequest = new GetRequest(
            `${Url.userProfile}/${id}/user/${userId}`,
            'fetchUserProfile'
        );
        const data = await getRequest.getData();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch user profile.');
    }
};
