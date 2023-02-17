import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../constant';

const Home = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate(SIGN_IN);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='max-w-[600px] mx-auto my-16 p-4'>
			<h1 className='text-2xl font-bold py-4'>Home</h1>
			<p>User Email:{user && user.email}</p>
			<p>Favorite Team/Sport:</p>
			<button className='border px-6 py-2 my-4' onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default Home;
