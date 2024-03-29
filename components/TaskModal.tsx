import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useDebounce } from '@hooks/useDebounce';
import { useEphemeral } from '@hooks/useEphemeral';
import fetcher from '@lib/fetcher';
import { getTimestamp } from '@lib/time';
import { Task } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, FC, PropsWithChildren, useEffect, useState } from 'react';

interface TaskModalProps {
	task: Task;
	setSelectedTask: Dispatch<Task|undefined>;
	mutate: () => any;
}

export const TaskModal: FC<TaskModalProps> = ({ task, setSelectedTask, mutate }) => {
	const [description, setDescription] = useState<string>(task.description || '');
	const [isSaved, setIsSaved] = useEphemeral<boolean>(1500);

	const debouncedDescription = useDebounce(description, 500);

	useEffect(() => {
		if (debouncedDescription !== task.description) {
			fetcher.patch('/api/tasks/update', {
				taskId: task.id,
				data: {
					description: debouncedDescription,
				}
			}).then(() => {
				mutate();
				setIsSaved(true);
			});
		}
	}, [debouncedDescription]);

	return (
		<motion.div
			className="bg-zinc-900 absolute top-5 w-full max-w-2xl h-80 z-20 p-4 rounded-md border border-zinc-800"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.15 } }}
			transition={{ duration: 0.2, delay: 0.15 }}
			layoutId={task.id}
		>
			<h1 className="font-medium text-2xl pb-1 mb-2 border-b border-zinc-600 flex items-center justify-between">
				{task.title}
				<button onClick={() => setSelectedTask(undefined)} className="appearance-none rounded-full h-8 w-8 hover:bg-zinc-800 transition-colors flex justify-center items-center">
					<XMarkIcon height={22} width={22}/>
				</button>
			</h1>
			<div className="flex items-center mb-2">
				<Tag textColor={'text-violet-400'}>
					<ClockIcon height={15} width={15} className="mr-1"/>
					Created on {getTimestamp(task.createdAt)}
				</Tag>
				{(task.complete && task.completedAt) ? (
					<Tag textColor={'text-green-400'}>
						<CheckIcon height={15} width={15} className="mr-1"/>
						Complete on {getTimestamp(task.completedAt)}
					</Tag>
				) : (
					<Tag textColor={'text-red-400'}>
						<XMarkIcon height={15} width={15} className="mr-1"/>
						Incomplete
					</Tag>
				)}
			</div>
			<textarea
				placeholder="Add a description"
				className="appearance-none outline-none resize-none w-full h-40 p-2 rounded-md bg-transparent border border-zinc-600 focus:border-violet-500 transition-colors"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<AnimatePresence>
				{isSaved && (
					<motion.div className="text-green-400 text-sm flex items-center" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 5, opacity: 0 }} transition={{ type: 'tween' }}>
						<CheckIcon height={15} width={15} className="mr-1"/>
						Saved
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

interface TagProps extends PropsWithChildren {
	textColor?: string;
}

const Tag: FC<TagProps> = ({ textColor, children }) => {
	return (
		<div className={`flex items-center py-0.5 px-1 mx-1 first:ml-0 rounded-sm bg-zinc-800 text-sm ${textColor}`}>
			{children}
		</div>
	);
}