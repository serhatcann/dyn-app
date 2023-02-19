type MyUser = {
	email: string;
	password: string;
	sport?: string;
	team?: string;
};

type HTMLInputTypes =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week'
	| (string & {});

type InputProps = {
	name: string;
	type: HTMLInputTypes;
	label: string;
	required?: boolean;
};

type ButtonProps = {
	label: string;
	type?: 'button' | 'submit';
	style?: string;
	onClick?: () => void;
};
