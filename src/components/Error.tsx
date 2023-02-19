import React from 'react';

type Props = {
	children: React.ReactNode;
};

const Error = ({ children }: Props) => {
	return (
		<div className='flex flex-col py-2 bg-red-200 text-center'>
			<p className='p-2 my-2 text-md font-medium text-red-600'>{children}</p>
		</div>
	);
};

export default Error;
