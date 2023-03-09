import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createAuthAndAdmin, sendCode } from 'controllers/admin'
import { bodySchemaMiddleware, CORSMiddleware } from 'lib/middlewares'
import { newAdminBodySchema } from 'lib/schemas'
import { emailCleaner } from 'lib/email-cleaner'

//Searches admin and if it does not exist, creates a new one
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const auth = await createAuthAndAdmin(req.body)
		if (!auth) {
			return res.status(400).send({ message: 'The admin already exists' })
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

const validateHandler = bodySchemaMiddleware(newAdminBodySchema, postHandler)

const handler = method({
	post: validateHandler,
})

export default CORSMiddleware(handler)
