import { firestore, rtdb } from 'lib/firebase'

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
		const newAppo = await realTimeRef
			.child(date)
			.child('appointments')
			.push(data)
	}

	static async findDayById(dayId: string) {
		const daySnap = new Day(dayId)
		await daySnap.pull()
		return daySnap.data
	}

	static async getRTDayAppointments(date: string) {
		// buscar en la real time db y obtener el length de cada dia
	}
}
