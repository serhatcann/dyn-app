import { Navigate, Outlet } from 'react-router-dom';
import { SIGN_IN } from '../constant';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
	const { user } = UserAuth();
	if (!user) {
		return <Navigate to={SIGN_IN} />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
