import { createContext } from 'react';

const defaultContext = {
	setPublisher: () => {},
	publisher: {
		name: '',
		id: '',
		description: '',
	},
};

export default createContext(defaultContext);
