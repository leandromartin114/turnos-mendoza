import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateNewAppointment, checkUserAppointment } from 'controllers/day'
import { authMiddleware, CORSMiddleware } from 'lib/middlewares'

//Creates a new appointment
async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
	const userHasDate = await checkUserAppointment(token.userId)
	if (userHasDate) {
		res.status(400).send({ message: 'The user has an appointment' })
	}
	try {
		const data = {
			userId: token.userId,
			...req.body.data,
		}
		const newDay = await generateNewAppointment(req.body.date, data)
		if (newDay) {
			res.status(200).send(newDay)
		} else {
			res.status(400).send({ message: 'Day complete. Choose another date' })
		}
	} catch (error) {
		res.status(400).send({ error: error })
	}
}

const authorizedHandler = authMiddleware(postHandler)

const handler = method({
	post: authorizedHandler,
})

export default CORSMiddleware(handler)
