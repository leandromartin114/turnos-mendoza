type UserData = {
	fullName: string
	email: string
	phoneNumber: number
	address: string
	document: number
	appointment?: string
}

type AdminData = {
	fullName: string
	email: string
	phoneNumber: number
}

type AppoData = {
	fullName: string
	email: string
	document: number
	userId: string
	id?: string
	date?: string
}

export type { UserData, AdminData, AppoData }
