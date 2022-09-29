import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
	return (
		<input
			{...props}
			className={twMerge('border border-zinc-600 bg-inherit rounded-md p-2 appearance-none outline-none focus:border-violet-500 transition-colors', props.className)}
			ref={ref}
		/>
	);
});