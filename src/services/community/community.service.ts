import { api } from '@/api/instance'

class CommunityService {
	async getAll() {
		const { data } = await api.get<Community[]>('/community')
		return data
	}
	async getCommunityById(id: string) {
		const { data } = await api.get<Community>(`/community/${id}`)
		return data
	}
}
export default new CommunityService()
