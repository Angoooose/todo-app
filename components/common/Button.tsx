import { ButtonHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: FC<ButtonProps> = (props) => {
	return (
		<button {...props} className={twMerge('appearance-none p-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-md', props.className)}>
			{props.children}
		</button>
	);
}

export const IconButton: FC<ButtonProps> = (props) => {
	return (
		<button {...props} className={twMerge('appearance-none p-2 text-violet-500 bg-zinc-800 hover:bg-violet-500 hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm rounded-lg', props.className)}>
			{props.children}
		</button>
	);
}