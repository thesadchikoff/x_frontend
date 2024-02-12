import Coin from '@/assets/gem.png'
import Button from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { useAuthMutation } from '@/hooks/queries/useAuthMutation'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm<AuthAndRegisterFormField>({
		mode: 'onChange',
	})
	const { mutate, isLoading } = useAuthMutation()

	const loginSubmit = handleSubmit(({ email, password }) => {
		mutate({ email, password })
	})

	return (
		<div className='flex flex-col items-center justify-center flex-1 gap-10 bg-primary-50'>
			<img src={Coin} width={200} height={200} />
			<h1 className='text-lg font-semibold'>Вход в систему</h1>
			<form className='flex flex-col gap-5 w-[300px]' onSubmit={loginSubmit}>
				<Input
					placeholder='Почта'
					type='email'
					{...register('email', {
						required: {
							value: true,
							message: 'Это поле является обязательным',
						},
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Почта указана некорректно',
						},
					})}
					{...(errors.email && {
						error: !!errors.email.message,
						helperText: errors.email.message,
					})}
				/>
				<Input
					placeholder='Пароль'
					type='password'
					{...register('password', {
						required: {
							value: true,
							message: 'Это поле является обязательным',
						},
					})}
					{...(errors.password && {
						error: !!errors.password.message,
						helperText: errors.password.message,
					})}
				/>
				<Button
					type='submit'
					title='Войти'
					disabled={(isDirty && !isValid) || isLoading}
					size='md'
					icon={isLoading && <Loader2 className='animate-spin' />}
				/>

				<span className='text-xs text-center text-secondary'>
					Нет аккаунта?{' '}
					<Link className='font-semibold text-brand' to={'/register'}>
						Зарегистрируйся
					</Link>
				</span>
			</form>
		</div>
	)
}

export default LoginScreen
