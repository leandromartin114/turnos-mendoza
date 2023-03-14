import type { NextApiRequest, NextApiResponse } from 'next'
import method from 'micro-method-router'
import {
	bodySchemaMiddleware,
	authMiddleware,
	CORSMiddleware,
} from 'lib/middlewares'
import { updateAdmin } from 'controllers/admin'
import { newAdminBodySchema } from 'lib/schemas'

//Updates admin info
async function patchHandler(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		const adminUpdated = await updateAdmin(token.userId, req.body)
		res.status(200).send(adminUpdated)
	} catch (error) {
		res.status(400).send({ error: error })
	}
}

const authorizedHandler = authMiddleware(patchHandler)

const validateHandler = bodySchemaMiddleware(
	newAdminBodySchema,
	authorizedHandler
)

const handler = method({
	patch: validateHandler,
})

export default CORSMiddleware(handler)
