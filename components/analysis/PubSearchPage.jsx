import { useState, useContext } from 'react';
import styled from 'styled-components';
import SearchForm from '../SearchForm';
import PublisherCard from './PublisherCard';
import Loading from '../Loading';
import PubContext from '../../lib/pubContext';

const PubSearchPage = () => {
	const [state, setState] = useState({
		error: null,
		results: [],
		loading: false,
	});
	const { setPublisher } = useContext(PubContext);
	const { loading, error, results } = state;

	return (
		<Container>
			<h1>Find your publisher to get their analysis.</h1>
			<SearchForm setSearchState={setState} searchState={state} />
			{error && <p>{error.message}</p>}
			{loading && <Loading />}
			{results.length > 0 && <h2>Results</h2>}
			<ul>
				{results.map((pub) => (
					<PublisherCard publisher={pub} key={pub.id} setPublisher={setPublisher} />
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

export default PubSearchPage;
