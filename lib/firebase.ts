import admin from 'firebase-admin'
import * as dotenv from 'dotenv'
dotenv.config()

var serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION)

if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: 'https://turnos-web-4c948-default-rtdb.firebaseio.com',
	})
}

export const firestore = admin.firestore()
export const rtdb = admin.database()
