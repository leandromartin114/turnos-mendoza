import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserAppointment } from 'controllers/user'
import { authMiddleware, CORSMiddleware } from 'lib/middlewares'

//Get user's appointment
async function getHandler(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		const userAppo = await getUserAppointment(token.userId)
		if (!userAppo) {
			res.status(400).send({ message: "The user doesn't have any appointment" })
		} else {
			res.status(200).send(userAppo)
		}
	} catch (error) {
		res.status(400).send({ error: error })
	}
}
const authorizedHandler = authMiddleware(getHandler)

const handler = method({
	get: authorizedHandler,
})

export default CORSMiddleware(handler)
