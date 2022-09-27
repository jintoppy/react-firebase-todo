import React from 'react';
import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

const DummyComp = () => <span>Hello</span>;

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <DummyComp />,
            },
        ],
    },
]);

const renderApp = () => {
    render(<RouterProvider router={router} />);
};

test('renders learn react link', () => {
    renderApp();
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
});
