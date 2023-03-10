import test from 'ava'
import { generateToken, decodeToken } from 'lib/jwt'

test('it has to generate the token and decode it', (t) => {
	const payload = { id: 1234 }
	const token = generateToken(payload)
	const out = decodeToken(token)
	delete out.iat
	t.deepEqual(payload, out)
})
