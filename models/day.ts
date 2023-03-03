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
	static async createNewDay(date: string) {
		const newDaySnap = await collection.doc(date).set({
			appointments: [],
		})
		const newDay = new Day(date)
		newDay.pull()
		return newDay
	}

	static async findDayById(dayId) {
		const daySnap = new Day(dayId)
		await daySnap.pull()
		return daySnap.data
	}
}
