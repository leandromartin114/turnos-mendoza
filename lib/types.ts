type UserData = {
	fullName: string
	email: string
	phoneNumber: number
	address: string
	document: number
	appointment?: string
}

type AppoData = {
	fullName: string
	email: string
	document: number
	userId: string
	id?: string
	date?: string
}

export type { UserData, AppoData }
