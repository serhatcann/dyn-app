import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOME, SIGN_IN } from '../constant';
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [favSport, setFavSport] = useState('');
	const [favTeam, setFavTeam] = useState('');
	const navigate = useNavigate();
	const { registerUser } = UserAuth();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		await registerUser({ email, password });
		navigate(HOME);
		try {
		} catch (error: any) {
			console.log(error);
		}
	};

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
				<div className='flex flex-col py-2'>
					<label className='py-2 font-medium'>Favorite Sport</label>
					<input
						className='border p-3'
						type='text'
						value={favSport}
						onChange={(e) => setFavSport(e.target.value)}
					/>
				</div>
				<div className='flex flex-col py-2'>
					<label className='py-2 font-medium'>Favorite Team</label>
					<input
						className='border p-3'
						type='text'
						value={favTeam}
						onChange={(e) => setFavTeam(e.target.value)}
					/>
				</div>
				<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUp;
