import prisma from '@lib/prisma';
import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async ({ body }: NextApiRequest, res: NextApiResponse) => {
    if (!body.email || !body.password) {
        return res.status(400).end();
    }

    const hashedPassword = await hash(body.password, 10);

	const user = await prisma.user.create({
		data: {
            email: body.email,
            password: hashedPassword,
        }
	});

	return res.status(201).json(user);
}