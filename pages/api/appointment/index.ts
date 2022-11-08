import method from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import {} from "controllers/appointment";
import { authMiddleware } from "lib/middlewares";

//Creates a new appointment
async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
	res.send(token.userId);
}

const handler = method({
	get: postHandler,
});

export default authMiddleware(handler);
