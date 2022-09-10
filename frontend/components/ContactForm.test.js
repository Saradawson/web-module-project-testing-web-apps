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
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const submitButton = screen.getByRole('button');
    const emailError = 'Error: email must be a valid email address.';

    userEvent.type(firstNameInput, 'sarah');
    userEvent.type(lastNameInput, 'dawson');
    userEvent.click(submitButton);

    await waitFor(() => {
        const withoutEmailError = screen.queryByText(emailError);
        expect(withoutEmailError).toBeInTheDocument();
    })


});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailError = 'Error: email must be a valid email address.';
    const emailInput = screen.getByLabelText(/email*/i);

    userEvent.type(emailInput, 'fdsa@');

    await waitFor (() => {
        const nonValidEmailError = screen.queryByText(emailError);
        expect(nonValidEmailError).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const lastNameError = 'Error: lastName is a required field.';
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor (() => {
        const lastNameRequired = screen.queryByText(lastNameError);
        expect(lastNameRequired).toBeInTheDocument();
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);
    const submitButton = screen.getByRole('button');

    const firstName = 'sarah';
    const lastName = 'dawson';
    const email = 'sd@gmail.com';

    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.type(emailInput, email);
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstNameDisplay = screen.getByTestId("firstnameDisplay");
        const LastNameDisplay = screen.getByTestId("lastnameDisplay");
        const emailDisplay = screen.getByTestId("emailDisplay");
        expect(firstNameDisplay).toBeInTheDocument();
        expect(LastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button');

    userEvent.type(firstNameInput, 'sarah');
    userEvent.type(lastNameInput, 'dawson');
    userEvent.type(emailInput, 'sd@gmail.com');
    userEvent.type(messageInput, 'this is my contact form');
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstNameDisplay = screen.getByTestId("firstnameDisplay");
        const LastNameDisplay = screen.getByTestId("lastnameDisplay");
        const emailDisplay = screen.getByTestId("emailDisplay");
        const messageDisplay = screen.getByTestId("messageDisplay");
        expect(firstNameDisplay).toBeInTheDocument();
        expect(LastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    })
});
