import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";

import { Toaster } from "sonner";

import { useState } from "react";
import { UserProvider } from "./contexts";
import { LoadingScreen } from "./screens/loading/LoadingScreen";
import { useQuery } from "react-query";
import { QUERYE_KEYS } from "./constants";
import userService from "./services/user/user.service";

function App() {
  const publicRouter = createBrowserRouter(publicRoutes);
  const privateRouter = createBrowserRouter(privateRoutes);
  const [user, setUser] = useState<User | null>(null);
  const { isLoading } = useQuery({
    queryKey: QUERYE_KEYS.GET_PROFILE,
    queryFn: userService.profile,
    onSuccess(data) {
      setUser(data);
    },
    onError() {
      setUser(null);
    },
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <UserProvider user={user} setUser={setUser}>
        <Toaster richColors />
        <RouterProvider router={user ? privateRouter : publicRouter} />
      </UserProvider>
    </>
  );
}

export default App;
