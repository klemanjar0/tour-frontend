import { ENDPOINT, withServer } from '../api';

export const appendImageURL = (response: any) => {
  const fileId = response.profile.fileId;
  const url = withServer(ENDPOINT.GET_FILE(fileId));
  return {
    ...response,
    profile: {
      ...response.profile,
      imageUrl: fileId === null ? undefined : url,
    },
  };
};
