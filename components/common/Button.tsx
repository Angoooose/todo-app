import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: FC<ButtonProps> = (props) => {
	return (
		<button {...props} className={"appearance-none p-2 bg-violet-500 hover:bg-violet-600 transition-colors rounded-md" + ' ' + props.className}>
			{props.children}
		</button>
	);
}