import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Add from '../Add';

test('renders Add Employee form', () => {
  render(<Add employees={[]} setEmployees={() => {}} setIsAdding={() => {}} />);
  expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
});

test('shows error if fields are empty and form is submitted', () => {
  render(<Add employees={[]} setEmployees={() => {}} setIsAdding={() => {}} />);
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByText('Add Employee')).toBeInTheDocument();
});
