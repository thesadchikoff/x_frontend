import { useUser } from "@/contexts";
import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProtectedRoute {
  onlyUnAuth: boolean;

  component: JSX.Element;
}

const ProtectedRoute = ({
  onlyUnAuth = false,

  component,
}: IProtectedRoute): JSX.Element => {
  const { user } = useUser();
  console.log(user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnlyAuth = (props: any) => (
  <ProtectedRoute onlyUnAuth={false} {...props} />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnlyUnAuth = (props: any) => (
  <ProtectedRoute onlyUnAuth={true} {...props} />
);
