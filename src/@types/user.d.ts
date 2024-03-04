type User = {
	id: number
	email: string
	login: string
	avatar_url: string
	is_premium: boolean
	bust: number
	role: Role
	status?: Status
	two_factor?: boolean
	community_member: Community
	community: Community
}

interface Community {
	id: string
	avatar: string
	banner_url: string
	balance: number
	description: string
	community_name: string
	creator_id: string
	_count: {
		members: number
	}
}

interface CommunityProfile extends Omit<Community, '_count'> {
	creator: User
	members: User[]
}

type Role = {
	id: string
	key: string
	title: string
}

type Status = {
	id: string
	created_at: string
	pack_id: string
	path: string
}

type AuthResponse =
	| {
			accessToken: string
			user: User
	  } & { message: string }

type UpdateUserField = {
	login: string
	email: string
}
