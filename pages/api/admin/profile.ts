import type { NextApiRequest, NextApiResponse } from 'next'
import method from 'micro-method-router'
import { authMiddleware, CORSMiddleware } from 'lib/middlewares'
import { getAdminData } from 'controllers/admin'

//Gets admin info
async function getHandler(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		const adminData = await getAdminData(token.userId)
		if (adminData) {
			res.status(200).send(adminData)
		} else {
			res.status(400).send({ message: "There isn't admin data" })
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
