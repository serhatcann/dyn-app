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

type Favorites = {
	sport?: string;
	team?: string;
};

type UserCtx = {
	registerUser: (user: MyUser) => Promise<void>;
	user: User | null;
	favorites: Favorites | null;
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
	const [favorites, setFavorites] = useState<Favorites | null>(null);
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
				console.log('Document written with ID: ', email);
				setFavorites({ sport: user.sport, team: user.team });
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
				setFavorites({ sport, team });
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
		favorites,
		logOut,
	};
	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
