import { QUERYE_KEYS } from '@/constants'
import userService from '@/services/user/user.service'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

export const useUploadUserAvatar = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: QUERYE_KEYS.UPLOAD_AVATAR,
		mutationFn: userService.uploadAvatar,
		onSuccess() {
			toast.success('Фото профиля обновлено')
			queryClient.invalidateQueries({ queryKey: QUERYE_KEYS.GET_PROFILE })
		},
		onError(error) {
			toast.error(error.message)
		},
	})
}
