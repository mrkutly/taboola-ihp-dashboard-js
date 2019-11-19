import { useEffect, useContext, useState } from 'react';
import ModePubsCard from './ModePubsCard';
import { ModeListStyles } from '../analysis/ModePlacements';
import { DividerStyles } from '../analysis/ModeUsage';
import { DownloadLinkStyles } from '../analysis/ModeUsageList';
import Loading from '../Loading';
import NetworkContext from '../../lib/networkContext';
import NetworkDataContext from '../../lib/networkDataContext';
import networkArchitectureEffect from '../../lib/hooks/network/networkArchitectureEffect';
import makeCSVHref from '../../utils/makeCSVHref';

const Architecture = () => {
	const { network } = useContext(NetworkContext);
	const { data, setData } = useContext(NetworkDataContext);
	let [error, setError] = [null, () => {}];

	if (!data.architecture) {
		[error, setError] = useState();
		useEffect(networkArchitectureEffect({ network, setData, setError, data }), []);
	}

	if (error) return <p>{error.message}</p>;
	if (!data.architecture) return <Loading message="getting network architecture data" />;

	const makePubsListHref = () => {
		const rows = data.architecture.network_publishers.map((pub) => pub.split(' - '));
		const headers = ['Publisher Name', 'Publisher ID'];
		return makeCSVHref({ rows, headers });
	};

	const makeModeDataHref = () => {
		const rows = data.architecture.data.map((datum) => {
			const { without_abp, num_placements, num_publishers, num_views, publishers, placements } = datum;
			const formattedPubs = `"${publishers.join(', ')}"`;
			const formattedPlacements = `"${placements.join(', ')}"`;
			return [without_abp, num_publishers, num_placements, num_views, formattedPubs, formattedPlacements];
		});
		const headers = [
			'Mode',
			'Number of Publishers',
			'Number of Placements',
			`Number of Page Views (${data.architecture.daterange})`,
			'Publishers',
			'Placements',
		];
		return makeCSVHref({ rows, headers });
	};

	return (
		<>
			<h1 style={{ marginBottom: 0 }}>Publishers using network loader</h1>
			<DownloadLinkStyles href={makePubsListHref()} download={`${network.name}_publishers.csv`}>
				Download this list
			</DownloadLinkStyles>
			<ul>
				{data.architecture.network_publishers.map((pub) => (
					<li key={pub}>{pub}</li>
				))}
			</ul>
			<DividerStyles noColor />
			<h1 style={{ marginBottom: 0 }}>Mode Usage in Network</h1>
			<DownloadLinkStyles href={makeModeDataHref()} download={`${network.name}_mode-usage.csv`}>
				Download this list
			</DownloadLinkStyles>
			<ModeListStyles>
				{data.architecture.data.map((pubsData) => (
					<ModePubsCard data={pubsData} key={pubsData.mode} />
				))}
			</ModeListStyles>
		</>
	);
};

export default Architecture;
