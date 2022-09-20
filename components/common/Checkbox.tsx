import { CheckIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps {
	isChecked: boolean;
	onCheck: (checked: boolean) => any;
	className?: string
}

export const Checkbox: FC<CheckboxProps> = ({ isChecked, onCheck, className }) => {
	return (
		<div className={twMerge('flex justify-center items-center cursor-pointer', className)}>
			<input
				checked={isChecked}
				onChange={() => onCheck(!isChecked)}
				type="checkbox"
				className={`appearance-none h-5 w-5 border border-zinc-600 rounded-full cursor-pointer transition-all ${isChecked ? 'bg-violet-500 border-violet-500' : ''}`}
			/>
			<AnimatePresence>
				{isChecked && (
					<motion.div
						className="absolute"
						initial={{ scale: 0 }}
						animate={{ scale: 1}}
						exit={{ scale: 0 }}
						onClick={() => onCheck(!isChecked)}
					>
						<CheckIcon height={15} width={15}/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}