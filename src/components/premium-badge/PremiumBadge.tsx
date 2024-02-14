import Status from '@/assets/status.gif'
import { useUser } from '@/contexts'
import { useEffect, useState } from 'react'
import { ContextStatus } from '../context-status/ContextStatus'

export const PremiumBadge = () => {
	const { user } = useUser()
	const [isOpenContext, setIsOpenContext] = useState(false)

	useEffect(() => {
		// Добавляем обработчик клика на весь документ
		document.addEventListener('click', handleClickOutside)
		// Добавляем обработчик нажатия на клавишу Escape
		document.addEventListener('keydown', handleEscape)

		return () => {
			// Удаляем обработчики при размонтировании компонента
			document.removeEventListener('click', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [])

	const handleClickOutside = event => {
		// Проверяем, является ли цель события потомком компонента ContextStatus
		if (!event.target.closest('.context-status')) {
			setIsOpenContext(false)
		}
	}

	const handleEscape = event => {
		if (event.key === 'Escape') {
			setIsOpenContext(false)
		}
	}

	const handleImgClick = () => {
		setIsOpenContext(!isOpenContext)
	}
	if (!user?.is_premium) {
		return null
	}
	return (
		<div className='relative' onClick={e => e.stopPropagation()}>
			<img
				src={Status}
				alt=''
				width={20}
				height={30}
				className='rounded-full cursor-pointer'
				onClick={handleImgClick}
			/>
			{isOpenContext && <ContextStatus />}
		</div>
	)
}
