import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOME, SIGN_UP } from '../constant';
import { UserAuth } from '../context/AuthContext';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { signIn } = UserAuth();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		await signIn({ email, password });
		navigate(HOME);
		try {
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
			<form onSubmit={handleSubmit}>
				<div className='flex flex-col py-2'>
					<label className='py-2 font-medium'>Email Address</label>
					<input
						className='border p-3'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='flex flex-col py-2'>
					<label className='py-2 font-medium'>Password</label>
					<input
						className='border p-3'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default SignIn;
