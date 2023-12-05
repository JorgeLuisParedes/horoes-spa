import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Prueba en <AppRouter />', () => {
	test('Debe de mostrar el login si no está autenticado', () => {
		const contextValue = {
			logged: false,
		};

		render(
			<MemoryRouter initialEntries={['/marvel']}>
				<AuthContext.Provider value={contextValue}>
					<AppRouter />
				</AuthContext.Provider>
			</MemoryRouter>,
		);

		expect(screen.getAllByText('Login').length).toBe(2);
	});

	test('Debe de mostrar el componente de Marvel si está autenticado', () => {
		const contextValue = {
			logged: true,
			user: {
				id: 123,
				name: 'Jorge Luis Paredes',
			},
		};

		render(
			<MemoryRouter initialEntries={['/marvel']}>
				<AuthContext.Provider value={contextValue}>
					<AppRouter />
				</AuthContext.Provider>
			</MemoryRouter>,
		);

		// expect(screen.getByText('Marvel Comics')).toBeTruthy();
		expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
	});
});
