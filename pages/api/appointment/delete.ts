import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteAppointment, checkUserAppointment } from 'controllers/day'
import { authMiddleware, CORSMiddleware } from 'lib/middlewares'

//Deletes an appointment
async function deleteHandler(req: NextApiRequest, res: NextApiResponse, token) {
	const userHasDate = await checkUserAppointment(token.userId)
	if (userHasDate) {
		try {
			const deleted = await deleteAppointment(req.body.date, token.userId)
			res.status(200).send(deleted)
		} catch (error) {
			res.status(400).send({ error: error })
		}
	} else {
		res.status(400).send({ message: "The user doesn't have an appointment" })
	}
}

const authorizedHandler = authMiddleware(deleteHandler)

const handler = method({
	delete: authorizedHandler,
})

export default CORSMiddleware(handler)
