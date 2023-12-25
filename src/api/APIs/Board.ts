// Example of a file src/api/yourApiFunctions.ts

import axiosInstance from '../axiosInstance';

export const getBoardListsByBoardId = async (boardId: any) => {
  const response = await axiosInstance.get(`/boards/${boardId}/lists`);
  return response;
};
