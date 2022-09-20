import { FC, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const Input: FC<InputProps> = (props) => {
	return (
		<input
			{...props}
			className={twMerge('border border-zinc-600 bg-inherit rounded-md p-2 appearance-none outline-none focus:border-violet-500 transition-colors', props.className)}
		/>
	);
}