// Imports
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
// To Test
import Home from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';
import { UserContext, UserCtx } from '../context/AuthContext';
// Tests
describe('Renders sign in page correctly', async () => {
	it('Should render the header correctly', async () => {
		// Setup
		render(<Home />, { wrapper: BrowserRouter });
		const h1 = await screen.queryByText('Home');

		// Expectations
		expect(h1).not.toBeNull();
	});

	it('Should render user info', async () => {
		// Setup

		// Test the user context directly

		const myPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('resolved');
			}, 300);
		});

		const values: UserCtx = {
			registerUser: (user: MyUser) => myPromise,
			userAuth: null,
			userInfo: {
				email: 'serhat@test.com',
				sport: 'Football',
				team: 'Besiktas',
			},
			logOut: function (): Promise<void> {
				throw new Error('Function not implemented.');
			},
			signIn: (user: MyUser) => myPromise,
		};

		render(
			<UserContext.Provider value={values}>
				<Home />
			</UserContext.Provider>,
			{ wrapper: BrowserRouter },
		);
		const emailText = await screen.queryByText('User Email: serhat@test.com');
		const favoritesText = await screen.queryByText(
			'Favorite Sport/Team: Football / Besiktas',
		);

		// Expectations
		expect(emailText).not.toBeNull();
		expect(favoritesText).not.toBeNull();
	});
});
