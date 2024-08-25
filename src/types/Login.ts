export interface AuthData {
  accessToken: string;
}

export interface ApiResponse {
  data: AuthData;
  result: {
    responseCode: number;
    responseDescription: string;
  };
}
