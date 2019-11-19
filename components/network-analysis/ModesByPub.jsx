import { useEffect, useContext, useState } from 'react';
import Loading from '../Loading';
import { DividerStyles } from '../analysis/ModeUsage';
import { DownloadLinkStyles } from '../analysis/ModeUsageList';
import NetworkContext from '../../lib/networkContext';
import NetworkDataContext from '../../lib/networkDataContext';
import modesByPublisherEffect from '../../lib/hooks/network/modesByPublisherEffect';
import makeCSVHref from '../../utils/makeCSVHref';

const ModesByPub = () => {
	const { network } = useContext(NetworkContext);
	const { data, setData } = useContext(NetworkDataContext);
	let [error, setError] = [null, () => {}];

	if (!data.modesByPub) {
		[error, setError] = useState();
		useEffect(modesByPublisherEffect({ network, setData, setError, data }), []);
	}

	if (error) return <p>{error.message}</p>;
	if (!data.modesByPub) return <Loading message="getting mode data" />;

	const makeHref = () => {
		const rows = Object.keys(data.modesByPub['modes-by-publisher']).map((pub) => {
			const modes = data.modesByPub['modes-by-publisher'][pub].join(', ');
			return [pub, `"${modes}"`];
		});
		const headers = ['Publisher', 'Modes'];
		return makeCSVHref({ rows, headers });
	};

	return (
		<>
			<h1 style={{ marginBottom: 0 }}>Publisher Mode Usage</h1>
			<DownloadLinkStyles href={makeHref()} download={`${network.name}_modes-by-publisher`}>
				Download this list
			</DownloadLinkStyles>
			<ul>
				{Object.keys(data.modesByPub['modes-by-publisher']).map((pubName) => (
					<li key={pubName}>
						<h2>{pubName}</h2>
						<ul>
							{data.modesByPub['modes-by-publisher'][pubName].map((mode) => (
								<li key={`${pubName}-${mode}-${Math.floor(Math.random() * 1000)}`}>{mode}</li>
							))}
						</ul>
						<DividerStyles />
					</li>
				))}
			</ul>
		</>
	);
};

export default ModesByPub;
