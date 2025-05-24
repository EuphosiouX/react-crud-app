import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table';

const employees = [
  {
    id: 1,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    salary: 60000,
    date: '2023-06-01',
  }
];

test('renders employee in table view', () => {
  render(<Table employees={employees} handleEdit={() => {}} handleDelete={() => {}} />);
  expect(screen.getByText('Jane')).toBeInTheDocument();
  expect(screen.getByText('Smith')).toBeInTheDocument();
});
