import Adapter from '../../Adapter';

export default ({ network, setData, setError, data }) => {
	return () => {
		async function getData() {
			try {
				const networkId = Number(network.id);
				const response = await Adapter.getModesInNetworkLoader(networkId);

				if (response instanceof Error) throw response;

				const modesInNetworkLoader = response.data[0];

				setData({
					...data,
					modesInNetworkLoader,
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
