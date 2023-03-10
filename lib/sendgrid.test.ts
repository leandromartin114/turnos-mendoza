import test from 'ava'
import {
	sendCodeByEmail,
	sendAppointmentByEmail,
	sendDeletedAppointmentByEmail,
} from './sendgrid'

test('it has to send the code and return true', async (t) => {
	const payload = true
	const mockEmail = 'leandromartin_17@hotmail.com'
	const mockCode = 12345
	const out = await sendCodeByEmail(mockEmail, mockCode)
	t.deepEqual(payload, out)
})

test('it has to send the appointment and return true', async (t) => {
	const payload = true
	const mockData = {
		fullName: 'Leandro',
		email: 'leandromartin_17@hotmail.com',
		date: '2023-03-08',
		id: 'a0sdf80a80f8',
		document: 31111111,
		userId: 'fa9sdf789a80a8f',
	}
	const out = await sendAppointmentByEmail(mockData)
	t.deepEqual(payload, out)
})

test('it has to send the canceled appointment and return true', async (t) => {
	const payload = true
	const mockData = {
		fullName: 'Leandro',
		email: 'leandromartin_17@hotmail.com',
		date: '2023-03-08',
		id: 'a0sdf80a80f8',
		document: 31111111,
		userId: 'fa9sdf789a80a8f',
	}
	const out = await sendDeletedAppointmentByEmail(mockData)
	t.deepEqual(payload, out)
})
