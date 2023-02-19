import React from 'react';

const Button = ({ label, type, style, onClick }: ButtonProps) => {
	return (
		<button
			className={`border p-4 my-2 ${style}`}
			type={type}
			onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
