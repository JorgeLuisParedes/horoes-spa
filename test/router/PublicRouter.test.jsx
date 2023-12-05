import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { PublicRouter } from '../../src/router/PublicRouter';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Pruebas en <PublicRouter />', () => {
	test('Debe de mostrar el children si no está aunteticado', () => {
		const contextValue = {
			logged: false,
		};

		render(
			<AuthContext.Provider value={contextValue}>
				<PublicRouter>
					<h1>Ruta pública</h1>
				</PublicRouter>
			</AuthContext.Provider>,
		);

		expect(screen.getByText('Ruta pública')).toBeTruthy();
	});

	test('Debe de navegar si está autenticado', () => {
		const contextValue = {
			logged: true,
			user: {
				id: 123,
				name: 'Jorge Luis Paredes',
			},
		};

		render(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={['/login']}>
					<Routes>
						<Route
							path='login'
							element={
								<PublicRouter>
									<h1>Ruta pública</h1>
								</PublicRouter>
							}
						></Route>
						<Route path='marvel' element={<h1>Página Marvel</h1>}></Route>
					</Routes>
				</MemoryRouter>
			</AuthContext.Provider>,
		);

		expect(screen.getByText('Página Marvel')).toBeTruthy();
	});
});
