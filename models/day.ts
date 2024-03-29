import { firestore, rtdb } from 'lib/firebase'
import _ from 'lodash'

const collection = firestore.collection('days')
const realTimeRef = rtdb.ref('days')

export class Day {
	ref: FirebaseFirestore.DocumentReference
	data: any
	id: string
	constructor(id) {
		this.id = id
		this.ref = collection.doc(id)
	}

	async pull() {
		const snap = await this.ref.get()
		this.data = snap.data()
	}

	async push() {
		this.ref.update(this.data)
	}

	static async createNewDay(date: string) {
		const newDaySnap = await collection.doc(date).set({
			appointments: [],
		})
		const newDay = new Day(date)
		newDay.pull()
		return newDay
	}

	static async createNewRealTimeAppo(date: string, data: any) {
		await realTimeRef
			.child(date)
			.child('appointments')
			.child(data.userId)
			.set(data)
	}

	static async deleteRealTimeAppo(date: string, userId: string) {
		await realTimeRef.child(date).child('appointments').child(userId).remove()
	}

	static async findDayById(dayId: string) {
		const daySnap = new Day(dayId)
		await daySnap.pull()
		return daySnap.data
	}

	static async getRTDayAppointments(date: string) {
		const appos = await realTimeRef.child(date).child('appointments').get()
		return appos.numChildren()
	}
}
