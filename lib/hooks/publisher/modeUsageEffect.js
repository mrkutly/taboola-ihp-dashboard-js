import Adapter from '../../Adapter';

export default ({ publisher, setData, setError, data }) => {
	return () => {
		async function getModeActivity() {
			try {
				const publisherId = Number(publisher.id);
				const res = await Adapter.getModesComparison(publisherId);

				if (res instanceof Error) throw res;

				const formattedDateRange = res.data[0].daterange.split(' - ').join(' and ');
				setData({
					...data,
					modeUsage: {
						...res.data[0],
						daterange: formattedDateRange,
					},
				});
			} catch (err) {
				setError(err);
			}
		}

		getModeActivity();
	};
};
