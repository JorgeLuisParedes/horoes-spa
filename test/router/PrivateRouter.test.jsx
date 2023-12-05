import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { PrivateRouter } from '../../src/router/PrivateRouter';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRouter />', () => {
	test('Debe de mostrar el children si está autenticado', () => {
		Storage.prototype.setItem = jest.fn();

		const contextValue = {
			logged: true,
			user: {
				id: 123,
				name: 'Jorge Luis Paredes',
			},
		};

		render(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={['/search?q=batman']}>
					<PrivateRouter>
						<h1>Ruta pública</h1>
					</PrivateRouter>
				</MemoryRouter>
			</AuthContext.Provider>,
		);

		expect(screen.getByText('Ruta pública')).toBeTruthy();
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'lastPath',
			'/search?q=batman',
		);
	});
});
