import test from 'ava'
import { createAuthAndAdmin, getAdminData, updateAdmin } from './admin'

test('it has to return a json with the admin data', async (t) => {
	const payload = 'leandromartin_17@hotmail.com'
	const out = await getAdminData('pvL4e3hp2tmuw2C3UA1C')
	t.deepEqual(payload, out.email)
})

test('it has to return a json with the updated admin data', async (t) => {
	const payload = 'Leandro'
	const mockData = {
		fullName: 'Leandro',
		email: 'leandromartin_17@hotmail.com',
		phoneNumber: 2614444444,
	}
	const out = await updateAdmin('pvL4e3hp2tmuw2C3UA1C', mockData)
	t.deepEqual(payload, out.fullName)
})

test('it has to return false if the admin exists', async (t) => {
	const payload = false
	const mockData = {
		fullName: 'Leandro',
		email: 'leandromartin_17@hotmail.com',
		phoneNumber: 2612222222,
	}
	const out = await createAuthAndAdmin(mockData)
	t.deepEqual(payload, out)
})
