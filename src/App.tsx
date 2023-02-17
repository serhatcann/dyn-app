import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
	return (
		<div>
			<h1 className='text-center text-3xl font-bold'>Dyn Media App</h1>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/home' element={<Home />} />
				</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
