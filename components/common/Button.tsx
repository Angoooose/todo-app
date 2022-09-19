import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: FC<ButtonProps> = (props) => {
	return (
		<button {...props} className={"appearance-none p-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-md" + ' ' + props.className}>
			{props.children}
		</button>
	);
}

interface IconButtonProps extends ButtonProps {
	buttonColor?: string;
}

export const IconButton: FC<IconButtonProps> = ({ buttonColor, ...props }) => {
	const color = buttonColor ? buttonColor : 'violet';

	console.log(color);

	return (
		<button {...props} className={`appearance-none p-2 text-${color}-500 bg-zinc-800 hover:bg-${color}-500 hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm rounded-lg` + ' ' + props.className}>
			{props.children}
		</button>
	);
}