import * as yup from 'yup'

let newUserBodySchema = yup
	.object()
	.shape({
		fullName: yup.string().required(),
		email: yup.string().email().required(),
		phoneNumber: yup.number().required(),
		address: yup.string().required(),
		document: yup.number().required(),
	})
	.noUnknown(true)
	.strict()

let newAdminBodySchema = yup
	.object()
	.shape({
		fullName: yup.string().required(),
		email: yup.string().email().required(),
		phoneNumber: yup.number().required(),
	})
	.noUnknown(true)
	.strict()

let getTokenBodySchema = yup
	.object()
	.shape({
		email: yup.string().email().required(),
		code: yup.number().required(),
	})
	.noUnknown(true)
	.strict()

let appointmentQuerySchema = yup.mixed()

let appointmentBodySchema = yup
	.array()
	.of(
		yup
			.object()
			.shape({
				appoId: yup.number().required(),
				fullName: yup.string().required(),
				email: yup.string().email().required(),
				date: yup.date().required(),
			})
			.noUnknown(true)
			.strict()
	)
	.strict()

export {
	appointmentQuerySchema,
	appointmentBodySchema,
	newUserBodySchema,
	newAdminBodySchema,
	getTokenBodySchema,
}
