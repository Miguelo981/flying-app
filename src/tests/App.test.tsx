import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import App from '@/App'

describe(('App'), () => {
    test('hotel results should be fetched', async () => {
        const user = await userEvent.setup()
        const screen = render(<App />);

        expect(screen.getByText('Loading...')).toBeDefined();

        await waitFor(() => {
            expect(screen.getByRole('article')).toBeDefined();
        });

        const link = screen.getByTestId('hotel-id');

        expect(link).toBeDefined();

        await user.click(link)
    })
})