import Button from '@/components/button/Button'
import { useUser } from '@/contexts'
import { useGetCommunityById } from '@/hooks/queries/useGetCommunityById'
import { ErrorScreen } from '@/screens/error/ErrorScreen'
import { LoadingScreen } from '@/screens/loading/LoadingScreen'
import { cn } from '@/utils/helpers'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import styles from './CommunityProfile.module.scss'

export const CommunityProfile = () => {
	const { id } = useParams()
	const [bannerLoader, setBannerLoader] = useState(true)
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
					{/* <div className='w-full h-[300px]'>
						<img
							src='https://plus.unsplash.com/premium_photo-1707229723342-1dc24b80ffd6?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt=''
							className='object-cover w-full h-full rounded-xl'
							onLoad={() => setBannerLoader(false)}
						/>
						{bannerLoader && <h1>Баннер загружается...</h1>}
					</div> */}
					<div
						className='flex items-end justify-between h-[300px] rounded-xl'
						style={{
							backgroundImage:
								'url("https://plus.unsplash.com/premium_photo-1707229723342-1dc24b80ffd6?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
						}}
					>
						<div
							className={cn(
								'flex flex-col w-full gap-3 rounded-b-xl',
								styles.info_bg
							)}
						>
							<div className='flex items-center w-full'>
								<div className='flex items-center w-full gap-3'>
									<img
										src='https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
										className='rounded-full w-[58px] h-[58px] object-cover'
									/>
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
