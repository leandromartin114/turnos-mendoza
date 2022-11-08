import { firestore } from "lib/firebase";

type userData = {
	email: string;
	fullName: string;
	address: string;
	document: number;
};
const collection = firestore.collection("users");
export class User {
	ref: FirebaseFirestore.DocumentReference;
	data: any;
	id: string;
	constructor(id: string) {
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
	static async createNewUser(data: userData) {
		const newUserSnap = await collection.add(data);
		const newUser = new User(newUserSnap.id);
		newUser.data = data;
		return newUser;
	}
}
