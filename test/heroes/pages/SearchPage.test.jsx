import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

describe('Pruebas en <SearchPage />', () => {
	beforeEach(() => jest.clearAllMocks());

	test('Debe de mostrarse correctamente con valores por defecto', () => {
		const { container } = render(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>,
		);

		expect(container).toMatchSnapshot();
	});

	test('Debe de mostra a Batman y el input con el valor del queryString', () => {
		render(
			<MemoryRouter initialEntries={['/serach?q=batman']}>
				<SearchPage />
			</MemoryRouter>,
		);

		const input = screen.getByRole('textbox');
		expect(input.value).toBe('batman');

		const img = screen.getByRole('img');
		expect(img.src).toContain('http://localhost/assets/heroes/dc-batman.jpg');

		const alert = screen.getByLabelText('alert-danger');
		expect(alert.style.display).toBe('none');
	});

	test('Debe de motrar un error si no se encuentra el hero (batman123)', () => {
		render(
			<MemoryRouter initialEntries={['/serach?q=batman123']}>
				<SearchPage />
			</MemoryRouter>,
		);

		const alert = screen.getByLabelText('alert-danger');
		expect(alert.style.display).not.toBe('none');
	});

	test('Debe de llamar el navigate a la pantalla nueva', () => {
		render(
			<MemoryRouter initialEntries={['/serach']}>
				<SearchPage />
			</MemoryRouter>,
		);

		const input = screen.getByRole('textbox');
		const form = screen.getByRole('form');

		fireEvent.change(input, {
			target: { name: 'searchText', value: 'superman' },
		});
		fireEvent.submit(form);

		expect(mockUseNavigate).toHaveBeenCalledWith('?q=superman');
	});
});
