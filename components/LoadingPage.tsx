import { motion } from 'framer-motion';
import { FC } from 'react';

export const LoadingPage: FC = () => {
	return (
		<div className="flex h-screen">
			<div className="m-auto text-center">
				<h1 className="font-bold text-3xl">todo-app</h1>
				<div className="w-full h-1 bg-zinc-600 mt-3 relative">
					<motion.div
						className="w-10 h-1 bg-violet-500 absolute"
						initial={{ left: 0, right: 'unset' }}
						animate={{ right: 0, left: 'unset' }}
						transition={{
							repeat: Infinity,
							duration: 0.75,
							repeatType: 'reverse',
						}}
					/>
				</div>
			</div>
		</div>
	);
}