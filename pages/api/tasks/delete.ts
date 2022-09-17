import prisma from '@lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const token = await getToken({ req });

	if (!token) {
		return res.status(401).end();
	}

	if (!req.query.taskId) {
		return res.status(400).end();
	}
	
	await prisma.task.deleteMany({
		where: {
			id: req.query.taskId as string,
			ownerId: token.userId,
		}
	});

	return res.status(200).end();
}