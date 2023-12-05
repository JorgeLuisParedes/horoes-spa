import { authReducer, types } from '../../../src/auth/';

describe('Pruebas en authReducer', () => {
	const initialState = {
		logged: false,
	};
	test('Debe de rerornar el estado por defecto', () => {
		const newState = authReducer(initialState, {});
		// expect(newState).toBe(initialState);
		expect(newState).toEqual(initialState);
	});

	test('Debe de (login) llamar el login y autenticar el user', () => {
		const user = {
			id: 123,
			name: 'Jorge Luis Paredes',
		};
		const action = {
			type: types.login,
			payload: user,
		};
		const newState = authReducer(initialState, action);
		expect(newState).toEqual({
			logged: true,
			user: action.payload,
		});
	});

	test('Debe de (logout) borrar el name del usuario y logged en false', () => {
		const actionLogin = {
			type: true,
			payload: {
				id: 123,
				name: 'Jorge Luis Paredes',
			},
		};

		const actionLogout = {
			type: types.logout,
		};
		const newState = authReducer(actionLogin, actionLogout);
		expect(newState).toEqual({ logged: false });
	});
});
