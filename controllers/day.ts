import uniqid from 'uniqid'
import _ from 'lodash'
import { User } from 'models/user'
import { Day } from 'models/day'
import {
	sendAppointmentByEmail,
	sendDeletedAppointmentByEmail,
} from 'lib/sendgrid'
import { AppoData } from 'lib/types'

// Checks if the user has an appointment
export async function checkUserAppointment(userId: string) {
	const user = new User(userId)
	await user.pull()
	let result
	if (user.data.appointment === 'no') {
		result = false
	} else {
		result = true
	}
	return result
}
// Records the date at user entity
async function recordUserAppo(date: string, userId: string) {
	const user = new User(userId)
	await user.pull()
	user.data.appointment = date
	await user.push()
}

// Creates an appointment and send the detail by email
export async function generateNewAppointment(date: string, data: AppoData) {
	const cleanDate = date.toString()
	const appoData = {
		id: uniqid(),
		date: cleanDate,
		...data,
	}
	const existantDay = await Day.findDayById(cleanDate)
	if (existantDay) {
		if (existantDay.appointments.length < 10) {
			const day = new Day(cleanDate)
			await day.pull()
			day.data.appointments.push(appoData)
			await Day.createNewRealTimeAppo(cleanDate, appoData)
			await day.push()
			await recordUserAppo(cleanDate, data.userId)
			await sendAppointmentByEmail(appoData)
			return day.data
		} else {
			return null
		}
	} else {
		const newDay = await Day.createNewDay(cleanDate)
		const day = new Day(cleanDate)
		await day.pull()
		day.data.appointments.push(appoData)
		await Day.createNewRealTimeAppo(cleanDate, appoData)
		await day.push()
		await recordUserAppo(cleanDate, data.userId)
		await sendAppointmentByEmail(appoData)
		return day.data
	}
}

// Deletes an appointment
export async function deleteAppointment(date: string, userId: string) {
	const cleanDate = date.toString()
	const day = await new Day(cleanDate)
	await day.pull()
	const newArrayOfAppointments = day.data.appointments
	const removed = _.remove(newArrayOfAppointments, (a: any) => {
		return a.userId === userId
	})
	await sendDeletedAppointmentByEmail(removed[0])
	day.data.appointments = newArrayOfAppointments
	await day.push()
	return day.data
}

// Gets all the appointments by date
export async function getAppointments(date) {
	const cleanDate = date.toString()
	const day = await Day.findDayById(cleanDate)
	return day
}
