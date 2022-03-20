export interface HTTPError {
  errorCode: number;
}

export const isInstanceOfHTTPError = (object: any): object is HTTPError => {
  try {
    return 'errorCode' in object;
  } catch (e) {
    return false;
  }
};
