import Strike from '@/assets/strike.png'
import Button from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { useRegisterMutation } from '@/hooks/queries/useRegisterMutation'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const RegisterScreen = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm<AuthAndRegisterFormField>({
		mode: 'onChange',
	})
	const { mutate, isLoading } = useRegisterMutation()
	const registerSubmit = handleSubmit(({ email, password }) => {
		mutate({ email, password })
	})
	return (
		<div className='flex flex-col items-center justify-center flex-1 gap-10 bg-primary-50'>
			<img src={Strike} width={300} height={300} />
			<h1 className='text-lg font-semibold'>Регистрация в системе</h1>
			<form onSubmit={registerSubmit} className='flex flex-col gap-5 w-[300px]'>
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
						minLength: {
							value: 6,
							message: 'Длина пароля должна составлять как минимум 6 символов',
						},
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
					title='Регистрация'
					type='submit'
					disabled={(isDirty && !isValid) || isLoading}
					size='md'
					icon={isLoading && <Loader2 className='animate-spin' />}
				/>
				<span className='text-xs text-center text-secondary'>
					Уже есть аккаунт?{' '}
					<Link className='font-semibold text-brand' to={'/login'}>
						Авторизуйся
					</Link>
				</span>
			</form>
		</div>
	)
}

export default RegisterScreen
