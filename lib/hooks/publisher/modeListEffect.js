import Adapter from '../../Adapter';

export default ({ publisher, setData, setError, data }) => {
	return () => {
		async function getData() {
			try {
				const pubId = Number(publisher.id);
				const response = await Adapter.getModes(pubId);

				if (response instanceof Error) throw response;

				const modeList = response.data[0].json_response;

				setData({
					...data,
					modeList,
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
