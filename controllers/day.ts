import { User } from 'models/user'
import { Day } from 'models/day'
import {} from 'lib/sendgrid'

//debe chequear si el date seleccionado existe o crearlo
//si existe chequea que no esté completo
//luego debe crear dentro del date un appo nuevo con la data
export async function generateNewAppointment(date, data) {
	const cleanDate = date.toDateString()
	const existantDay = await Day.findDayById(cleanDate)
	if (existantDay) {
		console.log(existantDay)
	} else {
		console.log('No existe')
	}
}

// export async function getAppointmentByUserId(userId: string) {
// 	const result = await Day.findUserAppointment(userId)
// 	console.log(result)

// 	return result.map((o) => {
// 		return o.data()
// 	})
// }

export async function getAppointments(date) {
	const order = await Day.findDayById(date)
	return order
}
