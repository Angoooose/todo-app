import { Button } from '@components/common';
import { TaskCard } from '@components/TaskCard';
import useTasks from '@hooks/useTasks';
import fetcher from '@lib/fetcher';
import { Task } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';

const Home: NextPage = () => {
	const [taskTitle, setTaskTitle] = useState<string>();

	const { tasks, mutate } = useTasks();

	const handleCreate = (e: FormEvent) => {
		e.preventDefault();

		if (taskTitle === '' || !taskTitle) return;

		fetcher.post('/api/tasks/create', {
			title: taskTitle,
		}).then(() => {
			mutate();
			setTaskTitle('');
		});
	}

	const handleDelete = (id: string) => {
		fetcher.delete('/api/tasks/delete', {
			taskId: id,
		}).then(() => {
			mutate();
		});
	}

	const handleUpdate = (id: string, data: Partial<Task>) => {
		fetcher.patch('/api/tasks/update', {
			taskId: id,
			data,
		}).then(() => {
			mutate();
		});
	}

	return (
		<div className="max-w-lg m-auto flex flex-col items-center justify-center py-4">
			<AnimatePresence mode="popLayout">
				<motion.form className="bg-zinc-900 p-2 mb-1 flex items-center w-full rounded-md shadow-md" onSubmit={handleCreate}>
					<input
						placeholder="New Task"
						className="appearance-none outline-none bg-transparent grow pl-1"
						value={taskTitle}
						onChange={(e) => setTaskTitle(e.target.value)}
					/>
					<motion.div transition={{ type: 'spring' }} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} layout>
						<Button className="px-5" disabled={taskTitle === '' || !taskTitle}>Create</Button>
					</motion.div>
				</motion.form>
				{tasks?.map((task) => (
					<TaskCard
						task={task}
						onDelete={() => handleDelete(task.id)}
						onComplete={() => handleUpdate(task.id, { complete: !task.complete })}
						key={task.id}
					/>
				))}
			</AnimatePresence>
		</div>
	);
}

export default Home;