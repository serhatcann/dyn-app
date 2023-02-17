import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
	onAuthStateChanged,
	UserCredential,
} from 'firebase/auth';
import { auth } from '../library/firebase';

type UserCtx = {
	registerUser: (user: MyUser) => Promise<UserCredential>;
	user: User | null;
};

const userCtx: UserCtx = {} as UserCtx;

const UserContext = createContext(userCtx);

type AuthProviderProps = {
	children?: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	const registerUser = (user: MyUser) => {
		return createUserWithEmailAndPassword(auth, user.email, user.password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log(user);

			setUser(user);
		});

		return () => {
			unsubscribe;
		};
	}, []);

	const values = {
		registerUser,
		user,
	};
	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
