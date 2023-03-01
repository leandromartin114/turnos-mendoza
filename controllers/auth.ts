import { Auth } from 'models/auth'
import { User } from 'models/user'
import gen from 'random-seed'
import addMinutes from 'date-fns/addMinutes'
import { generateToken } from 'lib/jwt'
import { sendCodeByEmail } from 'lib/sendgrid'
import { UserData } from 'lib/types'

const random = gen.create()

// Find a user in auth collection with an email
export async function findAuth(email: string) {
	const auth = await Auth.findByEmail(email)
	if (auth) {
		return auth
	} else {
		return null
	}
}

// Find a user and if it doesn't exist, create one
export async function createAuthAndUser(data: UserData) {
	const auth = await findAuth(data.email)
	if (auth) {
		console.log('The user already exists')
		return false
	} else {
		const newUser = await User.createNewUser({
			fullName: data.fullName,
			email: data.email,
			phoneNumber: data.phoneNumber,
			address: data.address,
			document: data.document,
			appointment: 0,
		})
		const newAuth = await Auth.createNewAuth({
			email: data.email,
			userId: newUser.id,
			code: 0,
			expires: new Date(),
		})
		return newUser
	}
}

// Send code to the user email for login
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
		console.error("The user doesn't exist")
		return false
	}
}

// Generates the token for user authentication
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
