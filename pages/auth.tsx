import { Button, Input } from '@components/common';
import { NextPage } from 'next';

const Auth: NextPage = () => {
	return (
		<div className="p-6 bg-zinc-900 flex flex-col max-w-sm m-auto translate-y-1/3 rounded-md shadow-md">
			<h3 className="font-bold text-2xl text-center mb-3">todo-app</h3>
			<Input placeholder="Email" className="my-1"/>
			<Input placeholder="Password" className="my-1"/>
			<Button className="mt-3">Login</Button>
		</div>
	)
}

export default Auth;