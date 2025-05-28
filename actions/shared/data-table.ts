'use server';

import apiCall from '../../base-api/api';

export const fetchedDataTable = async (
    url: string,
    tag: string,
    currentPage: number,
    itemsPerPage: number
) => {
    const response = apiCall({
        url: `${url}?page=${currentPage}&limit=${itemsPerPage}`,
        tag: tag,
    });
    const data = await response;
    return data;
};

export const fetchTotalItems = async (url: string, tag: string) => {
    const response = await apiCall({
        url: `${url}/count`,
        tag: tag,
    });
    return response.count;
};

export const fetchedUserTable = async (url: string, tag: string) => {
    const response = apiCall({ url: url, tag: tag });
    const data = await response;
    return data;
};
