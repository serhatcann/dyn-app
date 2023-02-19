import { Link, useNavigate } from 'react-router-dom';
import InputGroup from '../components/InputGroup';
import { HOME, SIGN_UP } from '../constant';
import { UserAuth } from '../context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import Error from '../components/Error';

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
	const [error, setError] = useState();

	const formRef = useRef<HTMLFormElement | null>(null);

	const handleSubmit = async (e: React.FormEvent<MyFormElement>) => {
		e.preventDefault();

		const email = e.currentTarget.elements.email?.value;
		const password = e.currentTarget.elements.password?.value;

		if (!email || !password) return;

		try {
			const response = await signIn({ email, password });
			if (response?.message) return setError(response.message);
			if (response?.email) navigate(HOME);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		document.title = 'Sign In - Dyn Media';
	}, []);

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
				{error && <Error>{error}</Error>}
				<Button
					label='Sign In'
					type='submit'
					style=' w-full border-blue-500 bg-blue-600 hover:bg-blue-500 text-white'
				/>
			</form>
		</div>
	);
};

export default SignIn;
