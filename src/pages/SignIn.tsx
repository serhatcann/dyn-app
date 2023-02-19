import { Link, useNavigate } from 'react-router-dom';
import InputGroup from '../components/InputGroup';
import { HOME, SIGN_UP } from '../constant';
import { UserAuth } from '../context/AuthContext';
import { useRef } from 'react';

interface FormElements extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const SignIn = () => {
	const navigate = useNavigate();
	const { signIn } = UserAuth();

	const formRef = useRef<HTMLFormElement | null>(null);

	const handleSubmit = async (e: React.FormEvent<MyFormElement>) => {
		e.preventDefault();

		const email = e.currentTarget.elements.email?.value;
		const password = e.currentTarget.elements.password?.value;

		if (!email || !password) return;

		try {
			await signIn({ email, password });
			navigate(HOME);
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div className='max-w-[700px] mx-auto my-16 p-4'>
			<div>
				<h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
				<p className='py-2'>
					Don't have an account yet?{' '}
					<Link to={SIGN_UP} className='underline'>
						Sign up.
					</Link>
				</p>
			</div>
			<form onSubmit={handleSubmit} ref={formRef}>
				<InputGroup
					name='email'
					type='email'
					label='Email Address'
					required={true}
				/>
				<InputGroup
					name='password'
					type='password'
					label='Password'
					required={true}
				/>
				<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default SignIn;
