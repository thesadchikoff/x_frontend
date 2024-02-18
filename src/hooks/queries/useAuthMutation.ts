import { AuthServerError } from "@/api/api.types";
import { QUERYE_KEYS } from "@/constants";
import { useUser } from "@/contexts";
import userService from "@/services/user/user.service";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface Props {
  options: UseMutationOptions;
}
export const useAuthMutation = (options: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();
  const { from } = location.state || { from: { pathname: "/" } };
  return useMutation<AuthResponse, AuthServerError, AuthAndRegisterFormField>({
    mutationKey: [QUERYE_KEYS.LOGIN],
    mutationFn: userService.login,
    ...options,
    onSuccess(data) {
      if (data?.message) {
        toast.success("Success", {
          description: data.message,
        });
      }
      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
      navigate(from);
      toast.success("Success", {
        description: `${data.user.email}, вы успешно авторизовались`,
      });
    },
    onError(error) {
      console.log(error);
      toast.error("Error", {
        description: error.response.data.message,
      });
    },
  });
};
