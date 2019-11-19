import { createContext } from 'react';

const defaultContext = {
	setNetwork: () => {},
	network: {
		name: '',
		id: '',
		description: '',
	},
};

export default createContext(defaultContext);
