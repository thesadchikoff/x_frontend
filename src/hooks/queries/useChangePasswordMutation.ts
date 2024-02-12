import { AuthServerError } from "@/api/api.types";
import { QUERYE_KEYS } from "@/constants";
import userService from "@/services/user/user.service";
import { useMutation } from "react-query";
import { toast } from "sonner";

export const useChangePasswordMutation = () => {
  return useMutation<User, AuthServerError, ChangePasswordFields>({
    mutationKey: QUERYE_KEYS.CHANGE_PASSWORD,
    mutationFn: userService.changePassword,
    onSuccess() {
      toast.success("Пароль изменен");
    },
    onError(error) {
      toast.error(error.response.data.message);
    },
  });
};
