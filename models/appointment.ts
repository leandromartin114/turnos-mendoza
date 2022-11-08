import { firestore } from "lib/firebase";

const collection = firestore.collection("appointments");
export class Appointment {
	ref: FirebaseFirestore.DocumentReference;
	data: any;
	id: string;
	constructor(id) {
		this.id = id;
		this.ref = collection.doc(id);
	}
	async pull() {
		const snap = await this.ref.get();
		this.data = snap.data();
	}
	async push() {
		this.ref.update(this.data);
	}
	static async createNewDate() {
		const date = new Date();
		const id = date.toDateString();
		const newAppoSnap = await collection.doc(id).set({
			appointments: [],
		});
		return newAppoSnap;
	}
	static async createNewAppointment(id: string, data: any) {
		const newAppoSnap = await collection.doc(id).get();
		return newAppoSnap;
	}
	static async findUserAppointment(userId) {
		const snap = await collection.where("userId", "==", userId).get();
		return snap.docs;
	}
	static async findAppointmentById(appoId) {
		const appoSnap = new Appointment(appoId);
		await appoSnap.pull();
		return appoSnap.data;
	}
}
