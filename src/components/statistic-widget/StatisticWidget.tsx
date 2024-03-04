import { useThemeContext } from '@/hooks/useThemeContext'
import { cn } from '@/utils/helpers'

import { ProgresBar } from '../progress-bar/ProgresBar'

export const StatisticWidget = () => {
	const { theme } = useThemeContext()
	return (
		<>
			<h1 className='text-xl font-medium'>Ваша статистика</h1>
			<div
				className={cn(
					'p-5 bg-indicator-white border rounded-xl flex flex-col gap-5 shadow-sm',
					{
						'bg-dark-foreground border-dark': theme === 'dark',
					}
				)}
			>
				<div
					className={cn(
						'grid gap-10',
						'mobile:grid-cols-1',
						'tablet:grid-cols-3',
						'desktop:grid-cols-5'
					)}
				>
					<ProgresBar
						title='Задач выполнено'
						currentValue={5}
						totalValue={24}
					/>
					<ProgresBar
						title='Задач воркспейса'
						currentValue={17}
						totalValue={17}
					/>
					<ProgresBar
						title='Тестовых задач'
						currentValue={12}
						totalValue={19}
					/>
				</div>
			</div>
		</>
	)
}
