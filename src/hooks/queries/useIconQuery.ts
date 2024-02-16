import { QUERYE_KEYS } from "@/constants";
import packService from "@/services/pack/pack.service";
import { useQuery } from "@tanstack/react-query";

export const useIconsQuery = (activePackId: { params: string }) => {
  const id = activePackId.params;
  return useQuery({
    queryKey: [QUERYE_KEYS.GET_ICONS, id],
    queryFn: () => packService.getIconsByPackId(id),
  });
};
