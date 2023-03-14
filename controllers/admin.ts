import { Auth } from 'models/auth'
import { Admin } from 'models/admin'
import { AdminData } from 'lib/types'
import { findAuth } from './auth'

// Finds an admin and if it doesn't exist, creates one
export async function createAuthAndAdmin(data: AdminData) {
	const auth = await findAuth(data.email)
	if (auth) {
		console.log('The admin already exists')
		return false
	} else {
		const newAdmin = await Admin.createNewAdmin({
			fullName: data.fullName,
			email: data.email,
			phoneNumber: data.phoneNumber,
		})
		const newAuth = await Auth.createNewAuth({
			email: data.email,
			adminId: newAdmin.id,
			code: 0,
			expires: new Date(),
		})
		return newAdmin
	}
}

// Gets the admin profile info
export async function getAdminData(adminId: string) {
	const admin = new Admin(adminId)
	await admin.pull()
	if (admin) {
		return admin.data
	} else {
		return null
	}
}

// Updates the admin data
export async function updateAdmin(adminId: string, data: any) {
	const admin = new Admin(adminId)
	await admin.pull()
	if (data.email) {
		const auth = await Auth.findByEmail(admin.data.email)
		admin.data.email = data.email
		auth.data.email = data.email
		auth.push()
	}
	if (data.fullName) {
		admin.data.fullName = data.fullName
	}
	if (data.phoneNumber) {
		admin.data.phoneNumber = data.phoneNumber
	}
	await admin.push()
	return admin.data
}
