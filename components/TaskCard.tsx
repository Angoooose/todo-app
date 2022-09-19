import { Checkbox, IconButton } from '@components/common';
import { Task } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { ArrowsPointingOutIcon, TrashIcon } from '@heroicons/react/24/solid';

interface TaskCardProps {
	task: Task;
	onDelete: () => any;
	onComplete: () => any;
	onSelect: () => any;
}

export const TaskCard: FC<TaskCardProps> = ({ onDelete, onComplete, onSelect, task }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<motion.div
			className="flex items-center p-3 my-1 w-full h-14 bg-zinc-900 rounded-md shadow-md select-none"
			onMouseOver={() => setIsHovered(true)} 
			onMouseOut={() => setIsHovered(false)}
			initial={{ y: 15, opacity: 0 }}
			animate={{ y: 0, scale: 1, opacity: 1 }}
			exit={{ scale: 0.8, opacity: 0 }}
			transition={{ type: 'spring', damping: 15 }}
			layoutId={task.id}
			layout
		>
			<Checkbox
				isChecked={task.complete}
				onCheck={onComplete}
				className="mr-3"
			/>
			<div className={`transition-opacity flex items-center relative ${task.complete ? 'opacity-50' : ''}`}>
				{task.title}
				<AnimatePresence>
					{task.complete && (
						<motion.hr
							className="absolute"
							initial={{ width: 0 }}
							animate={{ width: '100%' }}
							exit={{ width: 0 }}
							transition={{ duration: 0.5 }}
						/>
					)}
				</AnimatePresence>
			</div>
			<AnimatePresence>
				{isHovered && (
					<motion.div className="flex items-start ml-auto" transition={{ type: 'spring' }} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}>
						<IconButton className="text-red-500 hover:bg-red-500" onClick={onDelete}>
							<TrashIcon height={18} width={18}/>
						</IconButton>
						<IconButton className="text-blue-500 hover:bg-blue-500 ml-1" onClick={onSelect}>
							<ArrowsPointingOutIcon height={18} width={18}/>
						</IconButton>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}