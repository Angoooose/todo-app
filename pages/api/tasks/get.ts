import prisma from '@lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const token = await getToken({ req });

	if (!token) {
		return res.status(401).end();
	}
	
	const tasks = await prisma.task.findMany({
		where: {
			ownerId: token.userId,
		}
	});

	return res.status(200).send(tasks);
}