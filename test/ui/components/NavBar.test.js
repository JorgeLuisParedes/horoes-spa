import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

describe('Pruebas en el <NavBar />', () => {
	const contextValue = {
		logged: true,
		user: {
			id: 123,
			name: 'Jorge Luis Paredes',
		},
		logout: jest.fn(),
	};

	beforeEach(() => jest.clearAllMocks());

	test('Debe de mostrar el nombre del usuario', () => {
		render(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter>
					<Navbar />
				</MemoryRouter>
			</AuthContext.Provider>,
		);

		expect(screen.getByText('Jorge Luis Paredes')).toBeTruthy();
	});

	test('Debe de llamar el logout y navigate cuando se hace click en el botón', () => {
		render(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter>
					<Navbar />
				</MemoryRouter>
			</AuthContext.Provider>,
		);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		fireEvent.click(logoutButton);
		expect(contextValue.logout).toHaveBeenCalled();
		expect(mockUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
	});
});
