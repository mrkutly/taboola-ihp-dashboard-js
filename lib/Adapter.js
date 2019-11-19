const headers = {
	Accepts: 'application/json',
	'Cache-Control': 'no-cache',
	'Content-Type': 'application/json',
};

const Adapter = {
	async getShortAnalysis(publisherId) {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-short-pv-reader?publisher=${publisherId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getLongAnalysis(publisherId) {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-pv-reader?publisher=${publisherId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getModes(publisherId) {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-list-modes?publisher=${publisherId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getModesComparison(publisherId) {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-compare-modes?publisher=${publisherId}`);
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getPublisher(publisherId) {
		try {
			const res = await fetch('http://ps001.taboolasyndication.com:7777', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					query: `{
							allPublishers(id:${publisherId}){
								id
								name
								description
							}
						}
						`,
				}),
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getNetwork(networkId) {
		try {
			const res = await fetch('http://ps001.taboolasyndication.com:7777', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					query: `{
							allNetworks(id:${networkId}){
								id
								name
								description
							}
						}
						`,
				}),
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},

	async getNetworkArchitecture(networkId) {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-network-architecture?network=${networkId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},

	async getNetworkModesByPublisher(networkId) {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-network-modes-by-publisher?network=${networkId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},

	async getModesInNetworkLoader(networkId) {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-network-level-loader?network=${networkId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getNetworkLoaderUsage(networkId) {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-level-loaders?network=${networkId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
};

export default Adapter;
