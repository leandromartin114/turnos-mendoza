import admin from 'firebase-admin'
import * as dotenv from 'dotenv'
dotenv.config()

var serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION)

if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	})
}

export const firestore = admin.firestore()
