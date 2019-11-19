import { useRouter } from 'next/router';
import { PubCardStyles } from '../analysis/PublisherCard';

const NetworkCard = ({ network, setNetwork }) => {
	const router = useRouter();
	const { name, id, description } = network;

	const goToPub = () => {
		setNetwork(network);
		router.push('/network-analysis/architecture');
	};

	return (
		<PubCardStyles role="link" tabIndex={0} onClick={() => goToPub()} onKeyPress={(e) => e.which === 13 && goToPub()}>
			<span>
				{description} ({id})
			</span>
			-<span>{name}</span>
		</PubCardStyles>
	);
};

export default NetworkCard;
