import test from 'ava'
import { findAuth, createAuthAndUser, sendCode, sendToken } from './auth'

test('it has to return the user found', async (t) => {
	const payload = 'leandromartin_17@hotmail.com'
	const email = 'leandromartin_17@hotmail.com'
	const auth = await findAuth(email)
	const out = auth.data.email
	t.deepEqual(payload, out)
})

test('it has to return false if the user exists', async (t) => {
	const payload = false
	const mockData = {
		fullName: 'Leandro',
		email: 'leandromartin_17@hotmail.com',
		phoneNumber: 2612222222,
		address: 'Calle Rosario',
		document: 31111111,
	}
	const out = await createAuthAndUser(mockData)
	t.deepEqual(payload, out)
})

test('it has to return the code sended', async (t) => {
	const payload = typeof 12345
	const email = 'leandromartin_17@hotmail.com'
	const out = await sendCode(email)
	const res = typeof out
	t.deepEqual(payload, res)
})

test('it has to return null', async (t) => {
	const payload = null
	const email = 'leandromartin_17@hotmail.com'
	const code = 12345
	const out = await sendToken(email, code)
	t.deepEqual(payload, out)
})
