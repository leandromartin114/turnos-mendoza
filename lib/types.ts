type UserData = {
	fullName: string
	email: string
	phoneNumber: number
	address: string
	document: number
	appointment?: string
}

type AppoData = {
	appoId: number
	fullName: string
	email: string
	date: string
}

export type { UserData, AppoData }
