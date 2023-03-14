import test from 'ava'
import { createAuthAndAdmin, getAdminData, updateAdmin } from './admin'

test('it has to return a json with the admin data', async (t) => {
	const payload = 'learoldan.dev@gmail.com'
	const out = await getAdminData('228KQbTlp3CwucYH78Ha')
	t.deepEqual(payload, out.email)
})

test('it has to return a json with the updated admin data', async (t) => {
	const payload = 'Leandro'
	const mockData = {
		fullName: 'Leandro',
		email: 'learoldan.dev@gmail.com',
		phoneNumber: 2614444444,
	}
	const out = await updateAdmin('228KQbTlp3CwucYH78Ha', mockData)
	t.deepEqual(payload, out.fullName)
})

test('it has to return false if the admin exists', async (t) => {
	const payload = false
	const mockData = {
		fullName: 'Leandro',
		email: 'learoldan.dev@gmail.com',
		phoneNumber: 2612222222,
	}
	const out = await createAuthAndAdmin(mockData)
	t.deepEqual(payload, out)
})
