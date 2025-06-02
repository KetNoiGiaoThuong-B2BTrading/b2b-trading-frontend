import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import HomePage from './home/HomePage';

describe('App', () => {
    it('Renders Home Page', () => {
        render(<HomePage />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Home Page');
    });
});