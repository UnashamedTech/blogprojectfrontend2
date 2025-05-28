'use server';
import {
    DeleteRequest,
    GetRequest,
    PostRequest,
    PatchRequest,
} from '@/base-api/method';
const Url = {
    userDelete: `admin/user/user`,
};

export const deleteUser = async (id: string) => {
    const deleteRequest = new DeleteRequest(
        `${Url.userDelete}/${id}`,
        'delete-mentor'
    );
    const data = await deleteRequest.deleteData();
    return data;
};

export const TableData = async (url: string, tag: string) => {
    const getRequest = new GetRequest(url, tag);
    const data = await getRequest.getData();
    return data;
};


