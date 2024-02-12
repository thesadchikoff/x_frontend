import { AuthServerError } from "@/api/api.types";
import { QUERYE_KEYS } from "@/constants";
import userService from "@/services/user/user.service";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
  console.log("Get Profile");
  return useQuery<User, AuthServerError>({
    queryKey: [QUERYE_KEYS.GET_PROFILE],
    queryFn: userService.profile,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
