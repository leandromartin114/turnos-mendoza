import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendToken } from 'controllers/auth'
import { emailCleaner } from 'lib/email-cleaner'
import { getTokenBodySchema } from 'lib/schemas'
import { CORSMiddleware, bodySchemaMiddleware } from 'lib/middlewares'

//Generates the token if the email and code match
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const email = emailCleaner(req.body.email)
		const token = await sendToken(email, req.body.code)
		if (!token) {
			res.status(401).send({ message: 'Wrong email or code' })
		} else if (token === true) {
			res.status(401).send({ message: 'Expired code' })
		} else {
			res.status(200).send({ token })
		}
	} catch (error) {
		res.status(400).send({ error: error })
	}
}
const verifiedHandler = bodySchemaMiddleware(getTokenBodySchema, postHandler)

const handler = method({
	post: verifiedHandler,
})

export default CORSMiddleware(handler)
