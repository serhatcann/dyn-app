// Imports
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
// To Test
import SignIn from '../pages/SignIn';
import { BrowserRouter } from 'react-router-dom';

// Tests
describe('Renders sign in page correctly', async () => {
	it('Should render the header correctly', async () => {
		// Setup
		render(<SignIn />, { wrapper: BrowserRouter });
		const h1 = await screen.queryByText('Sign in to your account');

		// Expectations
		expect(h1).not.toBeNull();
	});
});
