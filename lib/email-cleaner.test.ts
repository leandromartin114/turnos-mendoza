import test from 'ava'
import { emailCleaner } from 'lib/email-cleaner'

test('it has to return a valid lowercase email', (t) => {
	const payload = 'email@email.com'
	const emailMock = 'EMaiL@emaIl.com'
	const out = emailCleaner(emailMock)
	t.deepEqual(payload, out)
})
