import Modal from '@/components/modal/Modal.tsx'
import { useUser } from '@/contexts'
import { useCommunityQuery } from '@/hooks/queries/useCommunityQuery'
import { useThemeContext } from '@/hooks/useThemeContext'
import { LoadingScreen } from '@/screens/loading/LoadingScreen'
import { cn } from '@/utils/helpers'
import { UsersRound } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '..'
import Button from '../button/Button'
import CommunityAvatar from '../community-avatar/CommunityAvatar'

export const CommunityList = () => {
	const { theme } = useThemeContext()
	const { data, isLoading, isSuccess, isError } = useCommunityQuery()
	const navigate = useNavigate()
	const { user } = useUser()
	const [isShowModal, setIsShowModal] = useState(false)
	const [isShowPremiumPermittedModal, setIsShowPremiumPermittedModal] =
		useState(false)
	const CommunityList = () => {
		if (isSuccess && data) {
			return data.map(community => {
				return (
					<div
						onClick={() => navigate(`/community/${community.id}`)}
						className={cn(
							'bg-indicator-white hover:border-primary-500 flex cursor-pointer items-center justify-between rounded-xl border p-5 transition-colors duration-300',
							{
								'bg-dark-foreground border-dark': theme === 'dark',
							}
						)}
					>
						<div className='flex items-center gap-4'>
							<CommunityAvatar url={community.avatar_url} />
							<span>{community.community_name}</span>
						</div>
						<div
							className={cn(
								'flex items-center gap-2 rounded-xl border px-4 py-2',
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
			className={cn('bg-primary-50 flex h-full w-full flex-col gap-5', {
				'bg-dark': theme === 'dark',
			})}
		>
			<div className='flex items-center justify-between w-full gap-10'>
				<h1 className='text-2xl font-medium'>Список сообществ</h1>
				<Button
					title='Создать своё'
					onClick={
						user?.is_premium
							? () => setIsShowModal(true)
							: () => setIsShowPremiumPermittedModal(true)
					}
					variant='ghost'
				/>
			</div>
			{isShowModal && (
				<Modal
					title={'Создание сообщества'}
					onClose={
						user?.is_premium
							? () => setIsShowModal(false)
							: () => setIsShowPremiumPermittedModal(false)
					}
				>
					<div className='flex flex-col gap-5'>
						<Input placeholder='Название сообщества' />
						<Input placeholder='Описание сообщества' />
						<Button title='Создать' />
					</div>
				</Modal>
			)}
			{isShowPremiumPermittedModal && (
				<Modal
					title={'Создание сообщества'}
					onClose={() => setIsShowPremiumPermittedModal(false)}
				>
					<div className='flex flex-col gap-5'>
						<p>
							Создание сообществ доступно только пользователям с Premium
							аккаунтом
						</p>
						<Button title='Приобрести' />
					</div>
				</Modal>
			)}
			<CommunityList />
		</div>
	)
}
