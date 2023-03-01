type UserData = {
	fullName: string
	email: string
	phoneNumber: number
	address: string
	document: number
	appointment?: number
}

type AppoData = {
	appoId: number
	fullName: string
	email: string
	date: string
}

export type { UserData, AppoData }
