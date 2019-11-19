import { useState, useContext } from 'react';
import styled from 'styled-components';
import PubSearchForm from '../SearchForm';
import NetworkCard from './NetworkCard';
import Loading from '../Loading';
import NetworkContext from '../../lib/networkContext';

const NetworkSearchPage = () => {
	const [state, setState] = useState({
		error: null,
		results: [],
		loading: false,
	});
	const { setNetwork } = useContext(NetworkContext);
	const { loading, error, results } = state;

	return (
		<Container>
			<h1>Find your network to get their analysis.</h1>
			<PubSearchForm setSearchState={setState} searchState={state} network />
			{error && <p>{error.message}</p>}
			{loading && <Loading />}
			{results.length > 0 && <h2>Results</h2>}
			<ul>
				{results.map((network) => (
					<NetworkCard network={network} key={network.id} setNetwork={setNetwork} />
				))}
			</ul>
		</Container>
	);
};

const Container = styled.div`
	max-width: 800px;
	margin: 5vh auto;
	padding: 2vh 2vw;
`;

export default NetworkSearchPage;
