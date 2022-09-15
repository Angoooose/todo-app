import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const Input: FC<InputProps> = (props) => {
	return (
		<input
			{...props}
			className={"border border-zinc-500 bg-inherit rounded-md p-2 appearance-none outline-none focus:border-violet-500 transition-colors" + ' ' + props.className}
		/>
	);
}