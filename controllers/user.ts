import { Auth } from 'models/auth'
import { User } from 'models/user'

export async function getUserData(userId: string) {
	const user = new User(userId)
	await user.pull()
	if (user) {
		return user.data
	} else {
		return null
	}
}

export async function getUserAppointment(userId: string) {
	const user = new User(userId)
	await user.pull()
	if (user) {
		return user.data.appointment
	} else {
		return null
	}
}

export async function updateUser(userId: string, data: any) {
	const user = new User(userId)
	await user.pull()
	if (data.email) {
		const auth = await Auth.findByEmail(user.data.email)
		user.data.email = data.email
		auth.data.email = data.email
		auth.push()
	}
	if (data.fullName) {
		user.data.fullName = data.fullName
	}
	if (data.address) {
		user.data.address = data.address
	}
	if (data.document) {
		user.data.document = data.document
	}
	if (data.phoneNumber) {
		user.data.phoneNumber = data.phoneNumber
	}
	await user.push()
	return user.data
}
