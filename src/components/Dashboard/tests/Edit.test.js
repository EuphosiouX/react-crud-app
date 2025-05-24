import React from 'react';
import { render, screen } from '@testing-library/react';
import Edit from '../Edit';

const mockEmployee = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  salary: '50000',
  date: '2023-05-01',
};

test('renders Edit Employee form with populated values', () => {
  render(
    <Edit
      employees={[mockEmployee]}
      selectedEmployee={mockEmployee}
      setEmployees={() => {}}
      setIsEditing={() => {}}
    />
  );
  expect(screen.getByDisplayValue('John')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
});
