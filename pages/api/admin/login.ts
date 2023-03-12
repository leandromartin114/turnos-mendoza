import method from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendCode } from 'controllers/auth'
import { emailCleaner } from 'lib/email-cleaner'
import { CORSMiddleware } from 'lib/middlewares'

//Searches admin by email and if it does exist generates a number code and sends it by email
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const email = emailCleaner(req.body.email)
		const code = await sendCode(email)
		if (code) {
			return res
				.status(200)
				.send({ message: 'the code was sent to ' + email, code: code })
		} else {
			return res.status(400).send({ message: "the admin doesn't exist" })
		}
	} catch (error) {
		return res.status(400).send({ message: 'error: ' + error })
	}
}

const handler = method({
	post: postHandler,
})

export default CORSMiddleware(handler)
