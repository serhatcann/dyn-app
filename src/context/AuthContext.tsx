import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth, firestore } from '../library/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type UserInfo = {
	email: string;
	sport?: string;
	team?: string;
};

type UserCtx = {
	registerUser: (user: MyUser) => Promise<any>;
	userAuth: User | null;
	userInfo: UserInfo | null;
	logOut: () => Promise<void>;
	signIn: (user: MyUser) => Promise<any>;
};

const userCtx: UserCtx = {} as UserCtx;

const UserContext = createContext(userCtx);

type AuthProviderProps = {
	children?: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [userAuth, setUserAuth] = useState<User | null>(null);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const registerUser = async (user: MyUser) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				user.email,
				user.password,
			);

			const { email } = response.user;
			if (email) {
				await setDoc(doc(firestore, 'favorites', email), {
					sport: user.sport,
					team: user.team,
				});
				setUserInfo({ email, sport: user.sport, team: user.team });
				return email;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const signIn = async (signInuser: MyUser) => {
		try {
			await signInWithEmailAndPassword(
				auth,
				signInuser.email,
				signInuser.password,
			);
			const docRef = doc(firestore, 'favorites', signInuser.email);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const { sport, team } = docSnap.data();
				setUserInfo({ email: signInuser.email, sport, team });
				return signInuser.email;
			} else {
				console.log('No such document!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUserAuth(user);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const values = {
		registerUser,
		signIn,
		userAuth,
		userInfo,
		logOut,
	};
	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
