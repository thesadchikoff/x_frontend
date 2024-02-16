import { QUERYE_KEYS } from "@/constants";
import packService from "@/services/pack/pack.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePatchIcon = () => {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationKey: [QUERYE_KEYS.PATCH_ICON_FOR_USER],
    mutationFn: packService.uploadIconForUser,
    onSuccess() {
      queryCLient.invalidateQueries({ queryKey: [QUERYE_KEYS.GET_PROFILE] });
    },
    onError(errror) {
      toast.error(errror.message);
    },
  });
};
