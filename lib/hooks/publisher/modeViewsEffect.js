import Adapter from '../../Adapter';

export default ({ publisher, setData, setError, data }) => {
	return () => {
		async function getData() {
			try {
				const pubId = Number(publisher.id);
				const response = await Adapter.getShortAnalysis(pubId);

				if (response instanceof Error) throw response;

				const { json_response, daterange } = response.data[0];
				const formattedDateRange = daterange.split(' - ').join(' and ');

				setData({
					...data,
					modeViews: {
						json_response,
						daterange: formattedDateRange,
					},
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
