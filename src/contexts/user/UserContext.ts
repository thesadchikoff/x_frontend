import { createContext } from "react";

export interface UserState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserState>({
  user: null,
  setUser: () => {},
});
