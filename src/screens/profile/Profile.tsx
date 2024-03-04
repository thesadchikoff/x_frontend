import { AvatarPremium } from '@/components/avatar-premium/AvatarPremium'
import ErrorBoundary from '@/components/error/ErrorBoundary'
import { PremiumBadge } from '@/components/premium-badge/PremiumBadge'
import { StatisticWidget } from '@/components/statistic-widget/StatisticWidget'
import { ROUTES } from '@/constants'
import { useUser } from '@/contexts'
import { useThemeContext } from '@/hooks/useThemeContext'
import { cn } from '@/utils/helpers'
import { declineMembers } from '@/utils/helpers/decline-members.helper'
import { Gift, Settings2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Profile.module.scss'

export const Profile = () => {
	const { user } = useUser()
	const { theme } = useThemeContext()
	const navigate = useNavigate()

	return (
		<div
			className={cn('flex flex-1 ', {
				'bg-dark': theme === 'dark',
				'bg-primary-50': theme === 'light',
			})}
		>
			<div className='flex flex-col w-full gap-10'>
				<div className='flex items-center justify-between'>
					<h1 className='text-xl font-medium'>Ваш профиль</h1>
				</div>
				<div
					className={cn(styles.profile_info, {
						'bg-dark-foreground border border-dark': theme === 'dark',
						'bg-indicator-white border': theme === 'light',
					})}
				>
					<div className='flex items-center gap-5'>
						<div className='flex flex-col'>
							<div className='flex items-center gap-5'>
								<AvatarPremium user={user} />

								<div className='flex flex-col gap-1'>
									<div className='flex items-center gap-4'>
										<span className='font-medium'>{user?.email}</span>
										<ErrorBoundary>
											<PremiumBadge />
										</ErrorBoundary>
									</div>

									{user?.login && (
										<span className='text-xs font-medium !opacity-50'>
											@{user!.login}
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
					<Link
						to={ROUTES.SETTINGS}
						className='p-2 rounded-full hover:bg-brand hover:bg-opacity-15'
					>
						<Settings2 className='stroke-primary-800' />
					</Link>
				</div>
				{user?.community_member && (
					<div className='flex flex-col gap-10'>
						<h1 className='text-xl font-medium'>Ваше сообщество</h1>
						<div
							onClick={() => navigate(`/community/${user.community_member.id}`)}
							className={cn(
								'p-5 bg-indicator-white border rounded-xl flex justify-between items-center shadow-sm transition-colors duration-300 hover:border-primary-500 cursor-pointer',
								{
									'bg-dark-foreground border-dark': theme === 'dark',
								}
							)}
						>
							<div className='flex items-center gap-3'>
								<img
									src='https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
									alt=''
									className='rounded-full w-[58px] h-[58px] object-cover'
								/>
								<div className='flex flex-col gap-2'>
									<span className='text-xl'>
										{user.community_member.community_name}
									</span>
									<span className='text-xs !opacity-50'>
										{user.community_member._count.members +
											' ' +
											declineMembers(user.community_member._count.members)}
									</span>
								</div>
							</div>
							<div className='flex items-center gap-3'>
								<Gift />
								<span className='text-xl font-medium'>
									{user.community_member.balance}
								</span>
							</div>
						</div>
					</div>
				)}
				{user?.is_premium && <StatisticWidget />}
				<div className='grid gap-5 desktop:grid-cols-5 tablet:grid-cols-3 mobile:grid-cols-1'></div>
			</div>
		</div>
	)
}
