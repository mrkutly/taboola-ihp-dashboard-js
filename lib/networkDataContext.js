import { createContext } from 'react';

const defaultContext = {
	setData: () => {},
	data: {
		architecture: null,
	},
};

export default createContext(defaultContext);
