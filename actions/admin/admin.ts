'use server';
import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PatchRequest,
} from '@/base-api/method';
import { inviteUserProps } from '@/types/requests';
const Url = {
  userDelete: `admin/user/user`,
  inviteUser: `admin/user/invite`,
};

export const deleteUser = async (id: string) => {
  const deleteRequest = new DeleteRequest(
    `${Url.userDelete}/${id}`,
    'delete-user'
  );
  const data = await deleteRequest.deleteData();
  return data;
};

export const inviteUser = async (body: inviteUserProps) => {
  const postRequest = new PostRequest(`${Url.inviteUser}`, 'invite-user', body);
  const data = postRequest.postData();
  return data;
};

export const TableData = async (url: string, tag: string) => {
  const getRequest = new GetRequest(url, tag);
  const data = await getRequest.getData();
  return data;
};
