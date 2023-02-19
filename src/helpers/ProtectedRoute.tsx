import { Navigate, Outlet } from 'react-router-dom';
import { SIGN_IN } from '../constant';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
	const { userAuth } = UserAuth();
	if (!userAuth) {
		return <Navigate to={SIGN_IN} />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
