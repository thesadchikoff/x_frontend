import { AuthServerError } from "@/api/api.types";
import { QUERYE_KEYS } from "@/constants";
import userService from "@/services/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProfileUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<User, AuthServerError, UpdateUserField>({
    mutationKey: [QUERYE_KEYS.UPDATE_PROFILE],
    mutationFn: userService.updateProfile,
    onSuccess() {
      toast.success("Success", {
        description: "Профиль успешно обновлен",
      });
      queryClient.invalidateQueries({ queryKey: [QUERYE_KEYS.GET_PROFILE] });
    },
    onError(error) {
      toast.error(error.response.data.message);
    },
  });
};
