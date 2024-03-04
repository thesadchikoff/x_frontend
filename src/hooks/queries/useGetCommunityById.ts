import { QUERYE_KEYS } from '@/constants'
import communityService from '@/services/community/community.service'
import { useQuery } from '@tanstack/react-query'

export const useGetCommunityById = (id: string) => {
	return useQuery({
		queryKey: [QUERYE_KEYS.GET_COMMUNITY_BY_ID, id],
		queryFn: () => communityService.getCommunityById(id),
	})
}
