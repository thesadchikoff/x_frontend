import { AxiosResponse } from "axios";

export interface AuthServerError extends AxiosResponse {
  response: {
    data: Error;
  };
}

interface Error {
  statusCode: number;
  message: string | string[];
}
