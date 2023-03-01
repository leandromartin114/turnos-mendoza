import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createAuthAndUser, sendCode } from 'controllers/auth'
import { bodySchemaMiddleware, CORSMiddleware } from 'lib/middlewares'
import { newUserBodySchema } from 'lib/schemas'
import { emailCleaner } from 'lib/email-cleaner'

//Searches user and if it does not exist, creates a new one
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const auth = await createAuthAndUser(req.body)
		if (!auth) {
			return res.status(400).send({ message: 'The user already exists' })
		} else {
			const email = emailCleaner(req.body.email)
			const code = await sendCode(email)
			return res.status(200).send({
				message: 'the code was sent to ' + auth.data.email,
				code: code,
			})
		}
	} catch (error) {
		return res.status(400).send({ message: 'error: ' + error })
	}
}

const validateHandler = bodySchemaMiddleware(newUserBodySchema, postHandler)

const handler = method({
	post: validateHandler,
})

export default CORSMiddleware(handler)
