import test from 'ava'
import {
	checkUserAppointment,
	recordUserAppo,
	deleteUserAppo,
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

// it tests recording and deleting the date at user
test('it has to return true after the date is recorded and when it is deleted', async (t) => {
	t.plan(2)
	const payload = true
	const out = await recordUserAppo('2023-03-08', 'pvL4e3hp2tmuw2C3UA1C')
	t.deepEqual(payload, out)
	const out2 = await deleteUserAppo('pvL4e3hp2tmuw2C3UA1C')
	t.deepEqual(payload, out2)
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

test('it has to return an array with the day appointments', async (t) => {
	const payload = typeof []
	const out = await getAppointments('2023-03-08')
	const res = typeof out
	t.deepEqual(payload, res)
})

test('it has to return the number of day appointments in the rtdb', async (t) => {
	const payload = typeof 1
	const out = await getRealTimeAppointments('2023-03-08')
	const res = typeof out
	t.deepEqual(payload, res)
})
