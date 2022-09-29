import { Checkbox, IconButton, Input } from '@components/common';
import { Task } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState, KeyboardEvent, useRef, useEffect } from 'react';
import { ArrowsPointingOutIcon, CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface TaskCardProps {
	task: Task;
	onDelete: () => any;
	onComplete: () => any;
	onSelect: () => any;
	onEdit: (newTitle: string) => Promise<any>;
}

export const TaskCard: FC<TaskCardProps> = ({ task, onDelete, onComplete, onSelect, onEdit }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [updatedTitle, setUpdatedTitle] = useState<string>(task.title);
	const inputRef = useRef<HTMLInputElement>(null);

	const contentAnimations = {
		initial: { y: 20, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: -20, opacity: 0 },
		transition: { duration: 0.3 },
	}

	const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && isEdit && updatedTitle !== task.title) {
			onEdit(updatedTitle).then(() => setIsEdit(false));
		}
	}

	useEffect(() => {
		if (isEdit) {
			setTimeout(() => {
				inputRef?.current?.focus();
			}, 200);
		}
	}, [isEdit]);

	return (
		<motion.div
			className="flex items-center p-3 my-1 w-full h-14 bg-zinc-900 rounded-md shadow-md select-none overflow-hidden relative"
			onMouseOver={() => setIsHovered(true)} 
			onMouseOut={() => setIsHovered(false)}
			initial={{ y: 15, opacity: 0 }}
			animate={{ y: 0, scale: 1, opacity: 1 }}
			exit={{ scale: 0.8, opacity: 0 }}
			transition={{ type: 'spring', damping: 15 }}
			layoutId={task.id}
			layout
		>
			<AnimatePresence>
				{!isEdit ? (
					<motion.div
						key={`content-${isEdit}`}
						className="flex absolute w-full"
						{...contentAnimations}
					>
						<Checkbox
							isChecked={task.complete}
							onCheck={onComplete}
							className="mr-3"
						/>
						<div className={`transition-opacity flex items-center relative whitespace-nowrap overflow-hidden text-ellipsis ${task.complete ? 'opacity-50' : ''}`}>
							{task.title}
							<AnimatePresence>
								{task.complete && (
									<motion.hr
										className="absolute"
										initial={{ width: 0 }}
										animate={{ width: '100%' }}
										exit={{ width: 0 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				) : (
					<motion.div
						className="flex w-full"
						{...contentAnimations}
					>
						<Input
							className="py-1 w-full mr-2"
							placeholder="Task Title"
							value={updatedTitle}
							onChange={(e) => setUpdatedTitle(e.target.value)}
							onKeyDown={handleSubmit}
							ref={inputRef}
						/>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{(isHovered && !isEdit) && (
					<motion.div className="flex items-start ml-auto bg-zinc-900 z-10" transition={{ type: 'spring' }} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}>
						<IconButton className="text-red-500 hover:bg-red-500" onClick={onDelete}>
							<TrashIcon height={18} width={18}/>
						</IconButton>
						<IconButton className="text-green-400 hover:bg-green-400 ml-1" onClick={() => setIsEdit(true)}>
							<PencilIcon height={18} width={18}/>
						</IconButton>
						<IconButton className="text-blue-500 hover:bg-blue-500 ml-1" onClick={onSelect}>
							<ArrowsPointingOutIcon height={18} width={18}/>
						</IconButton>
					</motion.div>
				)}

				{isEdit && (
					<div className="flex items-center ml-auto">
						<IconButton className="text-red-500 hover:bg-red-500" onClick={() => setIsEdit(false)}>
							<XMarkIcon height={18} width={18}/>
						</IconButton>
						<IconButton
							className="text-green-400 hover:bg-green-400 ml-1"
							onClick={() => onEdit(updatedTitle).then(() => setIsEdit(false))}
							disabled={updatedTitle === task.title || updatedTitle === ''}
						>
							<CheckIcon height={18} width={18}/>
						</IconButton>
					</div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}