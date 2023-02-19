// Imports
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// To Test

import Button from '../components/Button';
// Tests
describe('Renders the button component', async () => {
	it('Button and its props', () => {
		render(<Button type='submit' label={'Test Button'} />);
		const button = document.querySelector('button') as HTMLButtonElement | null;

		// button exists in the form component
		expect(button).toBeTruthy();

		// is empty
		expect(button?.textContent).toBe('Test Button');

		if (button) {
			// test the button text
			button.textContent = 'Test Button';
			expect(button.textContent).toBe('Test Button');

			const user = userEvent.setup();
			// test the type prop
			expect(button.type).toBe('submit');
			async () => {
				const spyAnchorTag = vi.spyOn(user, 'click');

				await user.click(screen.getByAltText('Test Button'));

				expect(spyAnchorTag).toHaveBeenCalledOnce();
			};
		}
	});
});
