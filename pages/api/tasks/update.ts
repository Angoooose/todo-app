import prisma from '@lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const token = await getToken({ req });

	if (!token) {
		return res.status(401).end();
	}

	if (!req.body.taskId || !req.body.data) {
		return res.status(400).end();
	}

	if (req.body.createdAt) {
		req.body.createdAt = undefined;
	}
	
	await prisma.task.updateMany({
		where: {
			id: req.body.taskId as string,
			ownerId: token.userId,
		},
		data: {
			...req.body.data,
		}
	});

	return res.status(200).end();
}