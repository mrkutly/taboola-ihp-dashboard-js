import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import NetworkContext from './networkContext';
import Loading from '../components/Loading';

const withNetwork = (WrappedComponent) => (props) => {
	const { network } = useContext(NetworkContext);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (network.id.length === 0) {
			router.push('/analysis');
			return;
		}

		setLoading(false);
	}, []);

	if (loading) return <Loading message="checking session for network" />;

	return <WrappedComponent {...props} />;
};

export default withNetwork;
