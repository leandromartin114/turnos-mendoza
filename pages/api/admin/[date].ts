import type { NextApiRequest, NextApiResponse } from 'next'
import method from 'micro-method-router'
import { authMiddleware, CORSMiddleware } from 'lib/middlewares'
import { getRealTimeAppointments } from 'controllers/day'

//Gets real time appointments count by day
async function getHandler(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		const count = await getRealTimeAppointments(req.query.date as string)
		if (count) {
			res.status(200).send(count)
		} else {
			res.status(400).send({ message: "There isn't appointments for that day" })
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
