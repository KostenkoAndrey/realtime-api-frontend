export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface GoogleFormData {
  code: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
}

interface User {
  id?: string | null;
  name: string | null;
  email: string | null;
}

export interface AuthState {
  user: Partial<User>;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

export interface RequestEmail {
  email: string;
}
