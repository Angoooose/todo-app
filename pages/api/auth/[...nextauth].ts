import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import prisma from '@lib/prisma';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			id: 'credentials-provider',
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' },
			},
			authorize: async (credentials) => {
				if (!credentials?.email || !credentials?.password) throw new Error('Bad request');

				// Will improve later
				const user = await prisma.user.findFirst({
					where: {
						email: credentials?.email,
						password: credentials?.password,
					},
					select: {
						id: true,
						createdAt: true,
						email: true,
						password: false,
					}
				});

				if (user) {
					return user;
				} else {
					throw new Error('Failed to authenticate');
				}
			},
		})
	],
	session: {
		strategy: 'jwt',
	},
});