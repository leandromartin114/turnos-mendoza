import type { NextApiRequest, NextApiResponse } from 'next'
import method from 'micro-method-router'
import {
	bodySchemaMiddleware,
	authMiddleware,
	CORSMiddleware,
} from 'lib/middlewares'
import { updateUser } from 'controllers/user'
import { newUserBodySchema } from 'lib/schemas'

//Updates user info
async function patchHandler(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		const userUpdated = await updateUser(token.userId, req.body)
		res.status(200).send(userUpdated)
	} catch (error) {
		res.status(400).send({ error: error })
	}
}

const authorizedHandler = authMiddleware(patchHandler)

const validateHandler = bodySchemaMiddleware(
	newUserBodySchema,
	authorizedHandler
)

const handler = method({
	patch: validateHandler,
})

export default CORSMiddleware(handler)
