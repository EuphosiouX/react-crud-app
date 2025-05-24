import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

// Mock the Logout component
jest.mock('../index', () => () => <div>Logout</div>);

describe('Header Component', () => {
  test('renders the header title and buttons', () => {
    const mockSetIsAdding = jest.fn();
    const mockSetIsAuthenticated = jest.fn();

    render(<Header setIsAdding={mockSetIsAdding} setIsAuthenticated={mockSetIsAuthenticated} />);

    expect(screen.getByText('Employee Management Software')).toBeInTheDocument();
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('calls setIsAdding when Add Employee button is clicked', () => {
    const mockSetIsAdding = jest.fn();

    render(<Header setIsAdding={mockSetIsAdding} setIsAuthenticated={() => {}} />);

    fireEvent.click(screen.getByText('Add Employee'));
    expect(mockSetIsAdding).toHaveBeenCalledWith(true);
  });
});
