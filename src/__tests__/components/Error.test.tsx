// Imports
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
// To Test

import Error from '../../components/Error';
// Tests
interface Props {
	children?: React.ReactNode;
}
describe('Error', async () => {
	it('Should render the component with children', async () => {
		render(<Error>Error message</Error>);

		const h1 = await screen.queryByText('Error message');

		// Expectations
		expect(h1).not.toBeNull();
	});
});
