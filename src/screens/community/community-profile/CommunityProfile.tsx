import Button from '@/components/button/Button'
import CommunityAvatar from '@/components/community-avatar/CommunityAvatar'
import { useUser } from '@/contexts'
import { useGetCommunityById } from '@/hooks/queries/useGetCommunityById'
import { ErrorScreen } from '@/screens/error/ErrorScreen'
import { LoadingScreen } from '@/screens/loading/LoadingScreen'
import { cn } from '@/utils/helpers'
import { Navigate, useParams } from 'react-router-dom'
import styles from './CommunityProfile.module.scss'

export const CommunityProfile = () => {
	const { id } = useParams()
	const { data, isLoading, isError, isSuccess } = useGetCommunityById(id)
	const { user } = useUser()

	if (isLoading) {
		return <LoadingScreen />
	}
	if (isError) {
		return <ErrorScreen />
	}
	if (isSuccess && data) {
		if (user?.community_member) {
			if (user?.community_member.id !== data?.id) {
				return <Navigate to='/' />
			}
			return (
				<div className='flex flex-col gap-10'>
					<div
						className='flex h-[300px] items-end justify-between rounded-xl'
						style={{
							backgroundImage: `url(${data?.banner_url})`,
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
						}}
					>
						<div
							className={cn(
								'flex w-full flex-col gap-3 rounded-b-xl',
								styles.info_bg
							)}
						>
							<div className='flex items-center w-full'>
								<div className='flex items-center w-full gap-3'>
									<CommunityAvatar url={data.avatar_url} />
									<span className='text-xl font-medium'>
										{data?.community_name}
									</span>
								</div>
								{user.community && user.community.id === data.id && (
									<Button title='Управлять' size='xs' />
								)}
							</div>
							<div />
							<div>
								<span>{data.balance}</span>
							</div>
						</div>
					</div>
				</div>
			)
		}
		return <Navigate to='/community?community_list' />
	}
}
