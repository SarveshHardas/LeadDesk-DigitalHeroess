export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin';
  createdAt: string;
}

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  role: 'admin';
  expiresAt: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserSession | null;
  loading: boolean;
}
