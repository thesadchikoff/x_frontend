import { UserContext } from "./UserContext";
import type { UserState } from "./UserContext";

interface UserProviderProps extends UserState {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  user,
  setUser,
  children,
}) => (
  <UserContext.Provider value={{ user, setUser }}>
    {children}
  </UserContext.Provider>
);
