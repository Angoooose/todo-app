import { Button, Input } from '@components/common';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const Auth: NextPage = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [authType, setAuthType] = useState<'login'|'create'>('login');

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
				<div className="flex flex-row items-center text-center mb-2 cursor-pointer bg-zinc-800 rounded-md shadow-md relative select-none">
					<motion.div
						className={`absolute w-1/2 h-full bg-violet-500 rounded-md ${authType === 'login' ? 'left-0' : 'right-0'}`}
						transition={{
							type: 'spring',
							stiffness: 700,
							damping: 40
						}}
						layout
					/>
					<div className={`grow basis-0 z-10 p-2 transition-colors ${authType !== 'login' ? 'text-zinc-400' : ''}`} onClick={() => setAuthType('login')}>Login</div>
					<div className={`grow basis-0 z-10 p-2 transition-colors ${authType !== 'create' ? 'text-zinc-400' : ''}`}  onClick={() => setAuthType('create')}>Create Account</div>
				</div>
				<Input placeholder="Email" className="my-1" onChange={(e) => setEmail(e.target.value)}/>
				<Input placeholder="Password" className="my-1" type="password" onChange={(e) => setPassword(e.target.value)}/>
				<Button className="mt-3" type="submit" disabled={!email || !password || email === '' || password === ''}>
					<motion.div
						key={authType}
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{authType === 'login' ? 'Login' : 'Create Account'}
					</motion.div>
				</Button>
			</form>
		</div>
	);
}

export default Auth;