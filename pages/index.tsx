import { Button } from '@components/common';
import { TaskCard } from '@components/TaskCard';
import { TaskModal } from '@components/TaskModal';
import useTasks from '@hooks/useTasks';
import fetcher from '@lib/fetcher';
import { Task } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';

const Home: NextPage = () => {
	const [taskTitle, setTaskTitle] = useState<string>();

	const [selectedTask, setSelectedTask] = useState<Task>();

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
		<div className="max-w-lg m-auto flex flex-col items-center justify-center py-4 px-2">
			<div className="flex justify-center items-center w-full mb-4">
				<hr className="w-full border-zinc-700"/>
				<h1 className="font-bold text-2xl whitespace-nowrap mx-4">todo-app</h1>
				<hr className="w-full border-zinc-700"/>
			</div>

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
						onSelect={() => setSelectedTask(selectedTask?.id === task.id ? undefined : task)}
						key={task.id}
					/>
				))}
			</AnimatePresence>
			
			<AnimatePresence mode="popLayout">
				{selectedTask && (
					<motion.div
						className="absolute bg-zinc-900 bg-opacity-75 top-0 left-0 h-screen w-screen z-10"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ type: 'keyframes' }}
						onClick={() => setSelectedTask(undefined)}
					/>
				)}
				{selectedTask && <TaskModal task={selectedTask} setSelectedTask={setSelectedTask} mutate={mutate}/>}
			</AnimatePresence>
		</div>
	);
}

export default Home;