import type { NextApiRequest, NextApiResponse } from 'next'
import parseBearerToken from 'parse-bearer-token'
import { decodeToken } from './jwt'
import * as yup from 'yup'
import NextCors from 'nextjs-cors'

// Authentication middleware
export function authMiddleware(callback) {
	return function (req: NextApiRequest, res: NextApiResponse) {
		const token = parseBearerToken(req)
		if (!token) {
			res.status(401).send({ message: 'No token' })
		}
		const decodedToken = decodeToken(token)
		if (decodedToken) {
			callback(req, res, decodedToken)
		} else {
			res.status(401).send({ message: 'Wrong token' })
		}
	}
}

// Yup body validation middleware
export function bodySchemaMiddleware(schema: yup.AnyObjectSchema, callback) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		try {
			const validateOK = await schema.validate(req.body)
			if (validateOK) {
				callback(req, res)
			}
		} catch (error) {
			res.status(422).send({ field: 'body', message: error })
		}
	}
}

// Query and body validation middleware
export function queryAndBodyMid(
	querySch: any,
	bodySch: yup.AnySchema,
	callback
) {
	return async function (req: NextApiRequest, res: NextApiResponse, token) {
		try {
			let query
			if (req.query.data) {
				query = req.query.data
			}
			if (req.query.productId) {
				query = req.query.productId
			}
			const validateQueryOK = await querySch.validate(query)
			const validateBodyOK = await bodySch.validate(req.body)
			if (validateQueryOK && validateBodyOK) {
				callback(req, res, token)
			}
		} catch (error) {
			res.status(422).send({ field: 'query or body', message: error })
		}
	}
}

// CORS middleware
export function CORSMiddleware(callback: (a: any, b: any) => any) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		await NextCors(req, res, {
			methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
			origin: '*',
			optionsSuccessStatus: 200,
		})
		callback(req, res)
	}
}
