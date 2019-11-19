import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import PubContext from '../../lib/pubContext';
import DataContext from '../../lib/dataContext';
import ModePlacementsCard from './ModePlacementsCard';
import Loading from '../Loading';
import modePlacementsEffect from '../../lib/hooks/publisher/modePlacementsEffect';
import { DownloadLinkStyles } from './ModeUsageList';
import makeCSVHref from '../../utils/makeCSVHref';
import formatNumber from '../../utils/formatNumber';

const PageViews = () => {
	const { publisher } = useContext(PubContext);
	const { data, setData } = useContext(DataContext);
	let [error, setError] = [null, () => {}];

	if (!data.modePlacement) {
		[error, setError] = useState();
		useEffect(modePlacementsEffect({ publisher, setData, setError, data }), []);
	}

	if (error) return <p>Error: {error.message}</p>;
	if (!data.modePlacement) return <Loading message="getting each mode's placement data" />;

	const makeHref = () => {
		const rows = data.modePlacement.json_response.map((modeObj) => {
			const { without_abp, num_placements, num_publishers, num_views, placements, publishers } = modeObj;
			const formattedPlacements = `"${placements.join(', ')}"`;
			const formattedPublishers = `"${publishers.join(', ')}"`;
			return [
				without_abp,
				num_placements,
				num_publishers,
				`"${formatNumber(num_views)}"`,
				formattedPlacements,
				formattedPublishers,
			];
		});
		const headers = [
			'Mode Name',
			'Number of Placements',
			'Number of Publishers',
			'Page Views',
			'Placement Names',
			'Publishers',
		];
		return makeCSVHref({ rows, headers });
	};

	return (
		<ModeDataStyles>
			<h1>{publisher.description}</h1>
			<h2>Placement Data Per Mode</h2>
			<DownloadLinkStyles href={makeHref()} download={`${publisher.name}_mode-placements.csv`}>
				Download this list
			</DownloadLinkStyles>
			<ModeListStyles>
				{data.modePlacement.json_response.map((datum) => (
					<ModePlacementsCard modeData={datum} publisher={publisher.name} key={`${datum.mode}-${datum.num_views}`} />
				))}
			</ModeListStyles>
		</ModeDataStyles>
	);
};

export const ModeListStyles = styled.ul`
	list-style: none;
	margin: 0 auto;
	padding-left: 0;
`;

const ModeDataStyles = styled.div`
	max-width: 1200px;

	h1,
	h2 {
		font-weight: 500;
	}

	h2 {
		margin-bottom: 0;
	}
`;

export default PageViews;
