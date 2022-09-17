import { Checkbox, IconButton } from '@components/common';
import { Task } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

interface TaskCardProps {
	task: Task;
	onDelete: () => any;
}

export const TaskCard: FC<TaskCardProps> = ({ onDelete, task }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [checked, setChecked] = useState<boolean>(false);

	return (
		<motion.div
			className="flex items-center p-3 my-1 w-full h-14 bg-zinc-900 rounded-md shadow-md"
			onMouseOver={() => setIsHovered(true)} 
			onMouseOut={() => setIsHovered(false)}
			initial={{ y: 15, opacity: 0 }}
			animate={{ y: 0, scale: 1, opacity: 1 }}
			exit={{ scale: 0.8, opacity: 0 }}
			transition={{ type: 'spring', damping: 15 }}
			layout
		>
			<Checkbox
				isChecked={checked}
				onCheck={(c) => setChecked(c)}
				className="mr-3"
			/>
			{task.title}
			<AnimatePresence>
				{isHovered && (
					<motion.div className="flex items-start ml-auto" transition={{ type: 'spring' }} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}>
						<IconButton buttonColor='red' onClick={onDelete}>
							<TrashIcon height={18} width={18}/>
						</IconButton>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}