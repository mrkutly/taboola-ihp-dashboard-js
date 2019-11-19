import Adapter from '../../Adapter';

export default ({ network, setData, setError, data }) => {
	return () => {
		async function getData() {
			try {
				const networkId = Number(network.id);
				const response = await Adapter.getNetworkModesByPublisher(networkId);

				if (response instanceof Error) throw response;

				const modesByPub = response.data[0];

				setData({
					...data,
					modesByPub,
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
