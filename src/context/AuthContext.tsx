import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth, firestore } from '../library/firebase';
import { addDoc, collection } from 'firebase/firestore';

type UserCtx = {
	registerUser: (user: MyUser) => Promise<void>;
	user: User | null;
	logOut: () => Promise<void>;
	signIn: (user: MyUser) => Promise<void>;
};

const userCtx: UserCtx = {} as UserCtx;

const UserContext = createContext(userCtx);

type AuthProviderProps = {
	children?: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	const registerUser = async (user: MyUser) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				user.email,
				user.password,
			);

			const { email } = response.user;
			const docRef = await addDoc(collection(firestore, 'favorites'), {
				email: email,
				sport: user.sport,
				team: user.team,
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (error) {
			console.log(error);
		}
	};

	const signIn = async (user: MyUser) => {
		try {
			const response = await signInWithEmailAndPassword(
				auth,
				user.email,
				user.password,
			);
			const { email } = response.user;
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const values = {
		registerUser,
		signIn,
		user,
		logOut,
	};
	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
