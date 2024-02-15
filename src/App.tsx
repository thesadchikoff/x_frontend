import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERYE_KEYS, ROUTES } from "./constants";
import { UserProvider } from "./contexts";
import { LoadingScreen } from "./screens/loading/LoadingScreen";
import userService from "./services/user/user.service";
import { OnlyAuth, OnlyUnAuth } from "./hoc/ProtectedRouter";
import HomeScreen from "./screens/home/HomeScreen";
import { Profile } from "./screens/profile/Profile";
import { SettingsScreen } from "./screens/settings/SettingsScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { PrivateLayout, PublicLayout } from "./layouts";
import { RouterList } from "./router/router-list";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERYE_KEYS.GET_PROFILE],
    queryFn: userService.profile,

    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
    if (isError) {
      setUser(null);
    }
  }, [data, isSuccess, isError]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <UserProvider user={user} setUser={setUser}>
        <Toaster richColors />
        <BrowserRouter>
          <Routes>
            {RouterList.map((route) => {
              if (route.isProtected) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <OnlyAuth
                        component={
                          <PrivateLayout>
                            <route.component />
                          </PrivateLayout>
                        }
                      />
                    }
                  />
                );
              }
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <OnlyUnAuth
                      component={
                        <PublicLayout>
                          <route.component />
                        </PublicLayout>
                      }
                    />
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
