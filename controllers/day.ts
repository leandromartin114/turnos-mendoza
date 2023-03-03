import { User } from 'models/user'
import { Day } from 'models/day'
import { sendAppointmentByEmail } from 'lib/sendgrid'

export async function checkUserAppointment(userId) {
	const user = new User(userId)
	await user.pull()
	let result
	if (user.data.appointment) {
		result = true
	} else {
		result = false
	}
	return result
}
// grabar el appo en el user y mandar por mail la confirmación
export async function generateNewAppointment(date, data) {
	const cleanDate = date.toString()
	const existantDay = await Day.findDayById(cleanDate)
	if (existantDay) {
		if (existantDay.appointments.length < 10) {
			const day = new Day(date)
			await day.pull()
			day.data.appointments.push(data)
			await day.push()
			return day.data
		} else {
			return null
		}
	} else {
		const newDay = await Day.createNewDay(cleanDate)
		const day = new Day(date)
		await day.pull()
		day.data.appointments.push(data)
		await day.push()
		return day.data
	}
}

export async function getAppointments(date) {
	const order = await Day.findDayById(date)
	return order
}
