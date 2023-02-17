import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
	return (
		<div>
			<h1 className='text-center text-3xl font-bold'>Dyn Media App</h1>
			<Routes>
				<Route path='/' element={<SignIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
