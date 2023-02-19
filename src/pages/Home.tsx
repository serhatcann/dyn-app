import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../constant';
import Button from '../components/Button';
import { useEffect } from 'react';

const Home = () => {
	const { userInfo, logOut } = UserAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate(SIGN_IN);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		document.title = 'Home - Dyn Media';
	}, []);

	return (
		<div className='max-w-[600px] mx-auto my-16 p-4'>
			<h1 className='text-2xl font-bold py-4'>Home</h1>
			<p>User Email: {userInfo && userInfo.email}</p>
			<p>
				Favorite Sport/Team: {userInfo?.sport} / {userInfo?.team}
			</p>
			<Button label='Logout' style='px-6 py-2 my-4' onClick={handleLogout} />
		</div>
	);
};

export default Home;
