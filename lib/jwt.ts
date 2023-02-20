import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export function generateToken(obj) {
	const token = jwt.sign(obj, process.env.JWT_SECRET)
	return token
}

export function decodeToken(token) {
	try {
		return jwt.verify(token, process.env.JWT_SECRET)
	} catch (error) {
		console.error('token incorrecto')
		return error
	}
}
