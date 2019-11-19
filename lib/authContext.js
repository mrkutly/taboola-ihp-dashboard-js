import { createContext } from 'react';

const defaultContext = {
	setAuthentication: () => {},
	authentication: {
		token: null,
		expires: null,
		isAuthorized: false,
	},
};

export default createContext(defaultContext);
