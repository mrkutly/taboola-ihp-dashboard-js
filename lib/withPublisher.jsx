import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import PubContext from './pubContext';
import Loading from '../components/Loading';

const withPublisher = (WrappedComponent) => (props) => {
	const { publisher } = useContext(PubContext);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (publisher.id.length === 0) {
			router.push('/analysis');
			return;
		}

		setLoading(false);
	}, []);

	if (loading) return <Loading message="checking session for publisher" />;

	return <WrappedComponent {...props} />;
};

export default withPublisher;
