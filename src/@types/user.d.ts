type User = {
  id: number;
  email: string;
  login: string;
  avatar_url: string;
  is_premium: boolean;
};

type AuthResponse = {
  accessToken: string;
  user: User;
};

type UpdateUserField = {
  login: string;
  email: string;
};
