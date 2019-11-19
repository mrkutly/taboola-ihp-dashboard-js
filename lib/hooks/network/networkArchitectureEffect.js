import Adapter from '../../Adapter';

export default ({ network, setData, setError, data }) => {
	return () => {
		async function getData() {
			try {
				const pubId = Number(network.id);
				const response = await Adapter.getNetworkArchitecture(pubId);

				if (response instanceof Error) throw response;

				const architecture = response.data[0];

				setData({
					...data,
					architecture,
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
