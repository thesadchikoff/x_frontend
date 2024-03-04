import { QUERYE_KEYS } from '@/constants'
import communityService from '@/services/community/community.service'
import { useQuery } from '@tanstack/react-query'

export const useCommunityQuery = () => {
	return useQuery({
		queryKey: [QUERYE_KEYS.GET_COMMUNITY],
		queryFn: communityService.getAll,
	})
}
