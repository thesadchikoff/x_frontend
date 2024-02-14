import Status from '@/assets/status.gif'
import { BookHeart } from 'lucide-react'
import { useRef } from 'react'
import styles from './ContextStatus.module.scss'

export const ContextStatus = () => {
	const containerRef = useRef(null)
	const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
		const container = containerRef.current
		const scrollAmount = 50
		// @ts-ignore
		container.scrollLeft += event.deltaY > 0 ? scrollAmount : -scrollAmount
	}
	return (
		<div className={styles.status_context_menu} onWheel={handleWheelScroll}>
			{/* <header className={styles.header}>
				<span className={styles.title}>Выберите статус</span>
			</header> */}
			<div className={styles.body}>
				{Array.from(Array(130)).map(item => {
					return (
						<img
							key={String(item)}
							src={Status}
							alt=''
							width={40}
							height={40}
							className='rounded-full'
						/>
					)
				})}
			</div>
			<div
				onWheel={handleWheelScroll}
				className={styles.footer}
				ref={containerRef}
			>
				<p className='flex items-center gap-5 px-4 py-1'>
					<BookHeart size={20} className='text-indicator-medium' />
				</p>
			</div>
		</div>
	)
}
