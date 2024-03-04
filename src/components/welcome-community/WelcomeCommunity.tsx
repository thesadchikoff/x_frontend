import Community from '@/assets/community.png'
import Button from '@/components/button/Button'
import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './WelcomeCommunity.module.scss'

interface WelcomeCommunityProps {
	setState?: Dispatch<SetStateAction<'list' | 'welcome'>>
}
export const WelcomeCommunity = ({ setState }: WelcomeCommunityProps) => {
	const navigate = useNavigate()
	return (
		<div className='flex flex-col h-full'>
			<div className='flex items-center justify-center w-full select-none'>
				<img src={Community} alt='' width={700} height={700} />
			</div>
			<div className='flex flex-col items-center justify-between h-full gap-5'>
				<h1 className={styles.title}>
					Сообщество - это энергичные команды людей, объединенные общей целью и
					стремлением к совместному достижению результатов!
				</h1>
				<Button
					onClick={() => navigate({ search: 'community_list' })}
					title='Найти своё'
					variant='ghost'
				/>
			</div>
		</div>
	)
}
