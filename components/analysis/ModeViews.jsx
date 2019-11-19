import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';
import PubContext from '../../lib/pubContext';
import DataContext from '../../lib/dataContext';
import modeViewsEffect from '../../lib/hooks/publisher/modeViewsEffect';
import { DownloadLinkStyles, ListItemStyles } from './ModeUsageList';
import makeCSVHref from '../../utils/makeCSVHref';
import formatNumber from '../../utils/formatNumber';

const ModeViews = () => {
	const { publisher } = useContext(PubContext);
	const { data, setData } = useContext(DataContext);
	let [error, setError] = [null, () => {}];

	if (!data.modeViews) {
		[error, setError] = useState();
		useEffect(modeViewsEffect({ publisher, setData, setError, data }), []);
	}

	if (error) return <p>{error.message}</p>;
	if (!data.modeViews) return <Loading message="getting page view data" />;

	const mappedData = data.modeViews.json_response.map((datum, idx) => {
		return (
			<ListItemStyles key={`${datum.MODE}-${datum.num_views}`} gridColumns="1fr 1fr" isEven={idx % 2 === 0}>
				<div key={datum.MODE}>{datum.MODE}</div>
				<div key={datum.num_views}>{formatNumber(datum.num_views)}</div>
			</ListItemStyles>
		);
	});

	const makeHref = () => {
		const rows = data.modeViews.json_response.map(({ MODE, num_views, publisher_id }) => [
			MODE,
			`"${formatNumber(num_views)}"`,
			publisher_id,
		]);
		const headers = ['Mode Name', 'Number of Page Views', 'Publisher ID'];
		return makeCSVHref({ rows, headers });
	};

	return (
		<ContainerStyles id="page-views-per-mode">
			<h1>{publisher.description}</h1>
			<h2>Page views by mode between {data.modeViews.daterange}</h2>
			<DownloadLinkStyles href={makeHref()} download={`${publisher.name}_mode-page-views.csv`}>
				Download this list
			</DownloadLinkStyles>
			<GridStyles>
				<div className="mode heading">Mode</div>
				<div className="num-views heading">Page Views</div>
			</GridStyles>
			<ul style={{ paddingLeft: 0 }}>{mappedData}</ul>
		</ContainerStyles>
	);
};

const ContainerStyles = styled.section`
	width: 900px;

	h1,
	h2 {
		font-weight: 500;
	}

	h2 {
		margin-bottom: 0;
	}

	h1 {
		font-size: 3rem;
	}
`;

const GridStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	font-size: 1.6rem;
	margin-top: 5vh;

	div {
		color: ${(props) => props.theme.colors.primary};
	}

	.heading {
		font-weight: 500;
		font-size: 1.8rem;
	}
`;

export default ModeViews;
