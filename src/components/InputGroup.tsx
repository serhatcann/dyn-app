import React from 'react';

const InputGroup = ({ name, type, label, required }: InputProps) => {
	return (
		<div className='flex flex-col py-2'>
			<label className='py-2 font-medium'>{label}</label>
			<input
				className='border p-3'
				type={type}
				name={name}
				required={required}
			/>
		</div>
	);
};

export default InputGroup;
