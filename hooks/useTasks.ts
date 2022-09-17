import fetcher from '@lib/fetcher';
import { Task } from '@prisma/client';
import useSWR from 'swr';

const useTasks = () => {
	const { data, error, mutate } = useSWR<Task[]>('/api/tasks/get', fetcher.get);

	return {
		tasks: data,
		isLoading: !error && !data,
		isError: error,
		mutate,
	}
}

export default useTasks;