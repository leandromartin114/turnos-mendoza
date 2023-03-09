import { Auth } from 'models/auth'
import { Admin } from 'models/admin'
import gen from 'random-seed'
import addMinutes from 'date-fns/addMinutes'
import { generateToken } from 'lib/jwt'
import { sendCodeByEmail } from 'lib/sendgrid'
import { AdminData } from 'lib/types'

const random = gen.create()

// Finds an admin in auth collection with an email
export async function findAuth(email: string) {
	const auth = await Auth.findByEmail(email)
	if (auth) {
		return auth
	} else {
		return null
	}
}

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
			userId: newAdmin.id,
			code: 0,
			expires: new Date(),
		})
		return newAdmin
	}
}

// Sends code to the admin email for login
export async function sendCode(email: string) {
	const auth = await findAuth(email)
	if (auth) {
		const code = random.intBetween(10000, 99999)
		const now = new Date()
		const tenMinutesExpDate = addMinutes(now, 10)
		auth.data.code = code
		auth.data.expires = tenMinutesExpDate
		await auth.push()
		await sendCodeByEmail(email, code)
		return code
	} else {
		console.error("The admin doesn't exist")
		return false
	}
}

// Generates the token for admin authentication
export async function sendToken(email: string, code: number) {
	const auth = await Auth.findByEmailAndCode(email, code)
	if (!auth) {
		return null
	}
	const expired = auth.isCodeExpired()
	if (expired) {
		console.error('Expired code')
		return expired
	} else {
		const token = generateToken({ userId: auth.data.userId })
		const now = new Date()
		auth.data.expires = now
		auth.push()
		return token
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
