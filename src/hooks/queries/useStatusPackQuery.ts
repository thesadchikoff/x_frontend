import { QUERYE_KEYS } from "@/constants";
import packService from "@/services/pack/pack.service";
import { useQuery } from "@tanstack/react-query";

export const useStatusPackQuery = () => {
  return useQuery({
    queryKey: [QUERYE_KEYS.GET_PACKS],
    queryFn: packService.getAllPacks,
  });
};
