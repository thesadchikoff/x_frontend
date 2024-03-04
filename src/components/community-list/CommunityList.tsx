import { useCommunityQuery } from '@/hooks/queries/useCommunityQuery'
import { useThemeContext } from '@/hooks/useThemeContext'
import { LoadingScreen } from '@/screens/loading/LoadingScreen'
import { cn } from '@/utils/helpers'
import { UsersRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'

export const CommunityList = () => {
	const { theme } = useThemeContext()
	const { data, isLoading, isSuccess, isError } = useCommunityQuery()
	const navigate = useNavigate()
	const CommunityList = () => {
		if (isSuccess && data) {
			return data.map(community => {
				return (
					<div
						onClick={() => navigate(`/community/${community.id}`)}
						className={cn(
							'p-5 border bg-indicator-white rounded-xl flex justify-between items-center hover:border-primary-500 cursor-pointer transition-colors duration-300',
							{
								'bg-dark-foreground border-dark': theme === 'dark',
							}
						)}
					>
						<div className='flex items-center gap-4'>
							<img
								src='https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								alt=''
								className='rounded-full w-[58px] h-[58px] object-cover'
							/>
							<span>{community.community_name}</span>
						</div>
						<div
							className={cn(
								'flex items-center gap-2 px-4 py-2 border rounded-xl',
								{
									'border-dark bg-dark': theme === 'dark',
								}
							)}
						>
							<UsersRound size={16} />
							<span>{community._count.members}</span>
						</div>
					</div>
				)
			})
		}
		if (isSuccess && !data) {
			return (
				<div className='flex items-center justify-center flex-1'>
					<span className='!opacity-50'>😴 Список сообществ пока нет</span>
				</div>
			)
		}
		if (isLoading) {
			return <LoadingScreen />
		}
		if (isError) {
			return (
				<div className='flex items-center justify-center flex-1'>
					<span className='!opacity-50'>
						⛔️ Произошла ошибка при получении сообществ
					</span>
				</div>
			)
		}
	}
	return (
		<div
			className={cn('flex flex-col w-full h-full bg-primary-50 gap-5', {
				'bg-dark': theme === 'dark',
			})}
		>
			<div className='flex items-center justify-between w-full gap-10'>
				<h1 className='text-2xl font-medium'>Список сообществ</h1>
				<Button title='Создать своё' variant='ghost' />
			</div>
			<CommunityList />
		</div>
	)
}
