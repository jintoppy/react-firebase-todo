import React, { ReactElement, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { collection, addDoc } from 'firebase/firestore';

import { AddTodo } from './add-todo';
import userEvent from '@testing-library/user-event';

const setup = (jsx: ReactElement) => {
    return {
        user: userEvent,
        ...render(jsx),
    };
};

jest.mock('firebase/firestore');

describe('<AddTodo />', () => {
    (addDoc as jest.Mock).mockImplementation(jest.fn());
    it('should render', () => {
        render(<AddTodo />);
        const inputEl = screen.getByLabelText('Add Todo');
        expect(inputEl).toBeInTheDocument();
    });

    it('should trigger addDoc on enter keypress', async () => {
        const { user } = setup(<AddTodo />);
        const inputEl = screen.getByLabelText('Add Todo');
        await user.type(inputEl, 'hello{Enter}');
        expect(addDoc).toHaveBeenCalledWith(undefined, {
            title: 'hello',
            isCompleted: false,
            userId: undefined,
        });
    });
});
