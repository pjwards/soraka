export interface UserResponse {
  id: string;
  email: string;
  name: string;
}

export interface ErrorResponse {
  code: number;
  error_subcode: number;
  fbtrace_id: string;
  message: string;
  type: string;
}