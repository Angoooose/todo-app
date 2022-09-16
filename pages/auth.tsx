import { Button, Input } from '@components/common';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const Auth: NextPage = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSignIn = (e: FormEvent) => {
		e.preventDefault();

		if (!email || !password || email === '' || password === '') {
			return;
		}

		signIn('credentials-provider', {
			redirect: false,
			email,
			password,
		});
	}

	return (
		<div className="p-6 bg-zinc-900 flex flex-col max-w-sm m-auto translate-y-1/3 rounded-md shadow-md">
			<form onSubmit={handleSignIn} className="flex flex-col">
				<h3 className="font-bold text-2xl text-center mb-3">todo-app</h3>
				<Input placeholder="Email" className="my-1" onChange={(e) => setEmail(e.target.value)}/>
				<Input placeholder="Password" className="my-1" type="password" onChange={(e) => setPassword(e.target.value)}/>
				<Button className="mt-3" type="submit" disabled={!email || !password || email === '' || password === ''}>
					Login
				</Button>
			</form>
		</div>
	)
}

export default Auth;