import { createContext, useContext } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	UserCredential,
} from 'firebase/auth';
import { auth } from '../library/firebase';

type UserCtx = {
	registerUser: (user: User) => Promise<UserCredential>;
};

const userCtx: UserCtx = {} as UserCtx;

const UserContext = createContext(userCtx);

type AuthProviderProps = {
	children?: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const registerUser = (user: User) => {
		return createUserWithEmailAndPassword(auth, user.email, user.password);
	};

	return (
		<UserContext.Provider value={{ registerUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
