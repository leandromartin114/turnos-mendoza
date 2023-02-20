import { User } from 'models/user'
import { Day } from 'models/day'
import { sgMail } from 'lib/sendgrid'
import * as _ from 'lodash'

//debe chequear si el date seleccionado existe o crearlo
//si existe chequea que no esté completo
//luego debe crear dentro del date un appo nuevo con la data
export async function generateNewAppointment(date, data) {}

export async function getAppointmentByUserId(userId: string) {
	const result = await Day.findUserAppointment(userId)
	return result.map((o) => {
		return o.data()
	})
}

export async function getAppointments(date) {
	const order = await Day.findDayById(date)
	return order
}
