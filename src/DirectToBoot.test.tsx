import {render, screen } from '@testing-library/react';
import React from 'react';
import {DirectToBoot} from './DirectToBoot';

describe('Direct To Boot', () => {
    it('renders a section for direct to boot', () => {
        render(<DirectToBoot orderId="order-id" />);
        expect(screen.getByText('Direct To Boot')).toBeInTheDocument();
        expect(screen.getByText('We are preparing your order...')).toBeInTheDocument();
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });
    }
);
