import { QUERYE_KEYS } from "@/constants";
import userService from "@/services/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeactivateTwoFaMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERYE_KEYS.DEACTIVATE_TWO_FA],
    mutationFn: userService.deactivateTwoFactor,
    onSuccess(data) {
      toast.info(data.message);
      queryClient.invalidateQueries({ queryKey: [QUERYE_KEYS.GET_PROFILE] });
    },
  });
};
