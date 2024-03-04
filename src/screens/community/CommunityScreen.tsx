import { CommunityList } from '@/components/community-list/CommunityList'
import { WelcomeCommunity } from '@/components/welcome-community/WelcomeCommunity'
import { useUser } from '@/contexts'
import { Navigate, useLocation } from 'react-router-dom'

export const CommunityScreen = () => {
	const { user } = useUser()
	const path = useLocation()

	if (user?.community_member) {
		return <Navigate to={`/community/${user.community_member.id}`} />
	}
	if (path.search === '?community_list') {
		return <CommunityList />
	}
	return <WelcomeCommunity />
}
