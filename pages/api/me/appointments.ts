import method from "micro-method-router";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAppointmentByUserId } from "controllers/appointment";
import { authMiddleware } from "lib/middlewares";

//Gets user's appointment
async function getHandler(req: NextApiRequest, res: NextApiResponse, token) {
	try {
		const userOrders = await getAppointmentByUserId(token.userId);
		if (userOrders.length !== 0) {
			res.status(200).send(userOrders);
		} else {
			res.status(400).send({ message: "There aren't orders with this userId" });
		}
	} catch (error) {
		res.status(400).send({ error: error });
	}
}

const handler = method({
	get: getHandler,
});

export default authMiddleware(handler);
