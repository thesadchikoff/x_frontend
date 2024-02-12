import { AuthServerError } from '@/api/api.types'
import { QUERYE_KEYS } from '@/constants'
import { useUser } from '@/contexts'
import userService from '@/services/user/user.service'
import { useMutation } from 'react-query'

import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useRegisterMutation = () => {
	const navigate = useNavigate()
	const { setUser } = useUser()
	return useMutation<AuthResponse, AuthServerError, AuthAndRegisterFormField>({
		mutationKey: QUERYE_KEYS.REGISTER,
		mutationFn: userService.register,
		onSuccess(data) {
			localStorage.setItem('token', data.accessToken)
			setUser(data.user)
			navigate('/')
			toast.success('Success', {
				description: `Аккаунт создан`,
			})
		},
		onError(error) {
			console.log(error)
			toast.error('Error', {
				description: error?.response
					? error.response.data.message
					: 'Сервер не отвечает',
			})
		},
	})
}
