import { firestore } from 'lib/firebase'
import { AdminData } from 'lib/types'

const collection = firestore.collection('admins')
export class Admin {
	ref: FirebaseFirestore.DocumentReference
	data: any
	id: string
	constructor(id: string) {
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
	static async createNewAdmin(data: AdminData) {
		const newAdminSnap = await collection.add(data)
		const newAdmin = new Admin(newAdminSnap.id)
		newAdmin.data = data
		return newAdmin
	}
}
