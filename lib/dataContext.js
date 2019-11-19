import { createContext } from 'react';

const defaultContext = {
	setData: () => {},
	data: {
		modePlacement: null,
		modeUsage: null,
		modeViews: null,
		modeList: null,
	},
};

export default createContext(defaultContext);
