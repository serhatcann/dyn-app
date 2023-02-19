// Imports
import { describe, it, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
// To Test

import InputGroup from '../../components/InputGroup';
// Tests
describe('InputGroup', async () => {
	it('Should render the input field and its props', () => {
		render(<InputGroup name='email' type='email' label={'Email Address'} />);
		const input = document.querySelector('input') as HTMLInputElement | null;

		// input exists in the form component
		expect(input).toBeTruthy();

		// is empty
		expect(input?.textContent).toBe('');

		if (input) {
			// test the input text
			input.textContent = 'serhatcan@test.com';
			expect(input.textContent).toBe('serhatcan@test.com');

			// test the type prop
			expect(input.type).toBe('email');

			// test the name prop
			expect(input.name).toBe('email');

			// test the value prop
			fireEvent.change(input, {
				target: {
					value: 'serhatcan@test',
				},
			});
			expect(input.value).toBe('serhatcan@test');
		}
	});
});
