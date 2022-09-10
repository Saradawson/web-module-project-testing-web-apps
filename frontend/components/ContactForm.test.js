import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const error = 'Error: firstName must have at least 5 characters.';
   const firstNameInput = screen.getByLabelText(/first name*/i);
   userEvent.type(firstNameInput, 'sara');
   await waitFor (() => {
    const firstNameError = screen.queryByText(error);
    expect(firstNameError).toBeInTheDocument();
   }) 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstNameError = 'Error: firstName must have at least 5 characters.';
    const lastNameError = 'Error: lastName is a required field.';
    const emailError = 'Error: email must be a valid email address.';

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const errors = screen.queryByText(firstNameError, lastNameError, emailError);
        expect(errors). toBeInTheDocument();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
