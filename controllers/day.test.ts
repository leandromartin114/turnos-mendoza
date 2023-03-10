import test from 'ava'
import {
	checkUserAppointment,
	recordUserAppo,
	generateNewAppointment,
	deleteAppointment,
	getAppointments,
	getRealTimeAppointments,
} from './day'

test('it has to return true if the user has an appointment', async (t) => {
	const payload = true
	const out = await checkUserAppointment('pvL4e3hp2tmuw2C3UA1C')
	t.deepEqual(payload, out)
})

test('it has to return true after the date is recorded', async (t) => {
	const payload = true
	const out = await recordUserAppo('2023-03-08', 'pvL4e3hp2tmuw2C3UA1C')
	t.deepEqual(payload, out)
})

// it tests generating and deleting appointments
test('it has to return an array of the appointments by date', async (t) => {
	t.plan(2)
	const payload = 'pvL4e3hp2tmuw2C3UA1C'
	const mockData = {
		document: 3111111,
		email: 'leandromartin_17@hotmail.com',
		fullName: 'Leandro',
		userId: 'pvL4e3hp2tmuw2C3UA1C',
	}
	const res = await generateNewAppointment('2023-03-08', mockData)
	const out = res.appointments.find((a) => {
		if (a.userId === mockData.userId) {
			return a
		}
	})
	const id = out.id
	t.deepEqual(payload, out.userId)
	const payload2 = 0
	const del = await deleteAppointment('2023-03-08', 'pvL4e3hp2tmuw2C3UA1C')
	const out2 = del.appointments.length
	t.deepEqual(payload2, out2)
})
