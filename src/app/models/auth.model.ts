//estructura de datos
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}
