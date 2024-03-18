import { ChangeProfileForm, UploadAvatar } from '@/components'
import Button from '@/components/button/Button'
import ChangePasswordForm from '@/components/change-password-form/ChangePasswordForm'
import { TwoFactorForm } from '@/components/two-factor-form/TwoFactorForm'
import { ROUTES } from '@/constants'
import { useUser } from '@/contexts'
import { useDeactivateTwoFaMutation } from '@/hooks/queries/useDeactivateTwoFaMutation'
import { useThemeContext } from '@/hooks/useThemeContext'
import { cn } from '@/utils/helpers'
import { ChevronLeft } from 'lucide-react'
import { FaTelegram } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export const SettingsScreen = () => {
	const { user } = useUser()
	const navigate = useNavigate()
	const { theme } = useThemeContext()
	const { mutate } = useDeactivateTwoFaMutation()
	return (
		<div
			className={cn('bg-primary-50 flex-1', {
				'bg-dark': theme === 'dark',
			})}
		>
			<div className='flex flex-col gap-10'>
				<div
					onClick={() => navigate(ROUTES.PROFILE)}
					className='flex cursor-pointer items-center gap-2 text-xs !opacity-65'
				>
					<ChevronLeft size={16} />
					<span>В профиль</span>
				</div>
				<h1 className='text-xl font-medium'>Настройки</h1>
				<div
					className={cn(
						'mobile:grid-cols-1 desktop:grid-cols-1 bg-indicator-white grid gap-10 rounded-xl border p-5 shadow-sm',
						{
							'bg-dark-foreground border-dark': theme === 'dark',
						}
					)}
				>
					<UploadAvatar />
					<div className='grid gap-10 mobile:grid-cols-1 desktop:grid-cols-2 '>
						<ChangeProfileForm />
						<ChangePasswordForm />

						{user?.two_factor ? (
							<Button
								icon={<FaTelegram className='text-[20px]' />}
								onClick={() => mutate}
								title='Отключить 2FA'
								variant='ghost'
							/>
						) : (
							<TwoFactorForm />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
