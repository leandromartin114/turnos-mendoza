import test from 'ava'
import { getUserData, getUserAppointment, updateUser } from './user'

test('it has to return a json with the user data', async (t) => {
	const payload = 'leandromartin_17@hotmail.com'
	const out = await getUserData('pvL4e3hp2tmuw2C3UA1C')
	t.deepEqual(payload, out.email)
})

test('it has to return a json with the updated user data', async (t) => {
	const payload = 'Leandro'
	const mockData = {
		fullName: 'Leandro',
		email: 'leandromartin_17@hotmail.com',
		address: 'Calle Libertad',
		document: 311111111,
		phoneNumber: 2614444444,
	}
	const out = await updateUser('pvL4e3hp2tmuw2C3UA1C', mockData)
	t.deepEqual(payload, out.fullName)
})

test('it has to return a string with the appointment date', async (t) => {
	const payload = '2023-03-08'
	const out = await getUserAppointment('pvL4e3hp2tmuw2C3UA1C')
	t.deepEqual(payload, out)
})
