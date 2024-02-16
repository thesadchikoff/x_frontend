type User = {
  id: number;
  email: string;
  login: string;
  avatar_url: string;
  is_premium: boolean;
  status?: Status;
};

type Status = {
  id: string;
  created_at: string;
  pack_id: string;
  path: string;
};

type AuthResponse = {
  accessToken: string;
  user: User;
};

type UpdateUserField = {
  login: string;
  email: string;
};
