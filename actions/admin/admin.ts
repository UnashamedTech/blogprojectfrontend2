'use server';
import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PatchRequest,
} from '@/base-api/method';
import { inviteUserProps, addCategoryProps,  updateCategoryProps } from '@/types/requests';
const Url = {
  userDelete: `admin/user/user`,
  inviteUser: `admin/user/invite`,
  categoryDelete: `admin/user/user`,
   addCategory: `admin/user/invite`,
    updateCategory: `admin/category/update`,
  blogDelete: `admin/blog/delete`,
};

export const inviteUser = async (body: inviteUserProps) => {
  const postRequest = new PostRequest(`${Url.inviteUser}`, 'invite-user', body);
  const data = postRequest.postData();
  return data;
};

export const deleteUser = async (id: string) => {
  const deleteRequest = new DeleteRequest(
    `${Url.userDelete}/${id}`,
    'delete-user'
  );
  const data = await deleteRequest.deleteData();
  return data;
};

export const addCategory = async (body: addCategoryProps) => {
  const postRequest = new PostRequest(`${Url.addCategory}`, 'add-category', body);
  const data = postRequest.postData();
  return data;
};

export const deleteCategory = async (id: string) => {
  const deleteRequest = new DeleteRequest(
    `${Url.categoryDelete}/${id}`,
    'delete-category'
  );
  const data = await deleteRequest.deleteData();
  return data;
};

export const updateCategory = async (id: string, body: updateCategoryProps) => {
  const patchRequest = new PatchRequest(
    `${Url.updateCategory}/${id}`,
    'update-category',
    body
  );
  const data = await patchRequest.patchData();
  return data;
};


export const deleteBlog = async (id: string) => {
  const deleteRequest = new DeleteRequest(
    `${Url.blogDelete}/${id}`,
    'delete-blog'
  );
  const data = await deleteRequest.deleteData();
  return data;
};

export const TableData = async (url: string, tag: string) => {
  const getRequest = new GetRequest(url, tag);
  const data = await getRequest.getData();
  return data;
};
