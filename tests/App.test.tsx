import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import App from '../src/App';

describe(('App'), () => {
    test('should sum clicks counts', async () => {
        const user = await userEvent.setup()
        const screen = render(<App />);

        const btn = screen.getByRole('button');

        expect(btn).toBeDefined();
        expect(btn.textContent?.includes('count is 0'));

        await user.click(btn);
        expect(btn.textContent?.includes('count is 1'));
        await user.click(btn);
        await user.click(btn);
        expect(btn.textContent?.includes('count is 3'));
        
        screen.debug();
    })
})