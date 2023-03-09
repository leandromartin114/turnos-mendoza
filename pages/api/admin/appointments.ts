import type { NextApiRequest, NextApiResponse } from 'next'
import method from 'micro-method-router'
import { authMiddleware, CORSMiddleware } from 'lib/middlewares'
import { getAppointments } from 'controllers/day'

//Gets appointments by date
async function getHandler(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		const appos = await getAppointments(req.body.date)
		if (appos) {
			res.status(200).send(appos)
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
