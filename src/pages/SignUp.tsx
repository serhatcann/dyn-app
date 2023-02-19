import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';
import { HOME, SIGN_IN } from '../constant';
import { UserAuth } from '../context/AuthContext';

interface FormElements extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
	sport: HTMLInputElement;
	team: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

const SignUp = () => {
	const navigate = useNavigate();
	const { registerUser } = UserAuth();

	const handleSubmit = async (e: React.FormEvent<MyFormElement>) => {
		e.preventDefault();

		const email = e.currentTarget.elements.email?.value;
		const password = e.currentTarget.elements.password?.value;
		const sport = e.currentTarget.elements.sport?.value;
		const team = e.currentTarget.elements.team?.value;

		if (!email || !password || !sport || !team) return;

		try {
			await registerUser({ email, password, sport, team });
			navigate(HOME);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		document.title = 'Sign Up - Dyn Media';
	}, []);

	return (
		<div className='max-w-[700px] mx-auto my-16 p-4'>
			<div>
				<h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
				<p className='py-2'>
					Already have an account yet?{' '}
					<Link to={SIGN_IN} className='underline'>
						Sign in.
					</Link>
				</p>
			</div>
			<form onSubmit={handleSubmit}>
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
				<InputGroup
					name='sport'
					type='text'
					label='Favorite Sport'
					required={true}
				/>
				<InputGroup
					name='team'
					type='text'
					label='Favorite Team'
					required={true}
				/>
				<Button
					label='Sign Up'
					type='submit'
					style=' w-full border-blue-500 bg-blue-600 hover:bg-blue-500 text-white'
				/>
			</form>
		</div>
	);
};

export default SignUp;
