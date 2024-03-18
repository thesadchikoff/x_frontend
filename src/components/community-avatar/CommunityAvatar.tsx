import { useThemeContext } from '@/hooks/useThemeContext'
import { cn } from '@/utils/helpers'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { PiUsersThree } from 'react-icons/pi'

interface CommunityAvatar {
	url: string
}

const CommunityAvatar = ({ url }: CommunityAvatar) => {
	const [isLoadAvatar, setIsLoadAvatar] = useState(false)
	const { theme } = useThemeContext()
	return (
		<>
			{url ? (
				<>
					<img
						src={import.meta.env.VITE_API_URL + '/' + url}
						alt=''
						className={cn('h-[58px] w-[58px] rounded-full object-cover', {
							hidden: !isLoadAvatar,
						})}
						onLoad={() => setIsLoadAvatar(true)}
					/>
					{!isLoadAvatar && (
						<div
							style={{
								background: `linear-gradient(${
									theme === 'dark'
										? '225.00deg, rgb(97, 96, 96) 0%,rgb(32, 32, 32) 100%'
										: '225.00deg, rgb(242, 242, 242) 0%,rgb(197, 197, 197) 100%'
								})`,
							}}
							className='w-[58px] h-[58px] rounded-full flex flex-col items-center justify-center'
						>
							<Loader2
								className={cn('text-2xl text-slate-500 animate-spin', {
									'text-indicator-light': theme === 'dark',
								})}
							/>
						</div>
					)}
				</>
			) : (
				<div
					style={{
						background: `linear-gradient(${
							theme === 'dark'
								? '225.00deg, rgb(97, 96, 96) 0%,rgb(32, 32, 32) 100%'
								: '225.00deg, rgb(242, 242, 242) 0%,rgb(197, 197, 197) 100%'
						})`,
					}}
					className='w-[58px] h-[58px] rounded-full flex flex-col items-center justify-center'
				>
					<PiUsersThree
						className={cn('text-2xl text-slate-500', {
							'text-indicator-light': theme === 'dark',
						})}
					/>
				</div>
			)}
		</>
	)
}

export default CommunityAvatar
