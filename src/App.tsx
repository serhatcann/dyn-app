import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ALL_ROUTES, HOME, SIGN_IN, SIGN_UP } from './constant';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './helpers/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
	return (
		<div>
			<h1 className='text-center text-3xl font-bold'>Dyn Media App</h1>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path={SIGN_IN} element={<SignIn />} />
						<Route path={SIGN_UP} element={<SignUp />} />
						<Route element={<ProtectedRoute />}>
							<Route path={HOME} element={<Home />} />
						</Route>
						<Route path={ALL_ROUTES} element={<ProtectedRoute />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
