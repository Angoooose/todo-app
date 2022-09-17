import prisma from '@lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const token = await getToken({ req });

	if (!token) {
		return res.status(401).end();
	}

	if (!req.body.title) {
		return res.status(400).end();
	}
	
	await prisma.task.create({
		data: {
			ownerId: token.userId,
			title: req.body.title,
			description: req.body.description,
		}
	});

	return res.status(201).end();
}