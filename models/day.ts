import { firestore } from 'lib/firebase'

const collection = firestore.collection('day')

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
	static async createNewDay() {
		const date = new Date()
		const id = date.toDateString()
		const newDaySnap = await collection.doc(id).set({
			appointments: [],
		})
		return newDaySnap
	}
	static async findUserAppointment(userId) {
		const snap = await collection.get()
		const doc = snap.docs.find((d) => {
			const appos = d.data().appointments
			return appos.find((a) => {
				return a.userId === userId
			})
		})

		return snap.docs
	}
	static async findDayById(dayId) {
		const daySnap = new Day(dayId)
		await daySnap.pull()
		return daySnap.data
	}
}