import { useThemeContext } from '@/hooks/useThemeContext'
import { cn } from '@/utils/helpers'
import { Loader2 } from 'lucide-react'

export const LoadingScreen = () => {
	const { theme } = useThemeContext()
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center w-full h-full bg-primary-50',
				{
					'bg-dark': theme === 'dark',
				}
			)}
		>
			<Loader2 className='animate-spin' size={25} color='blue' />
		</div>
	)
}
