import { useRouter } from 'next/router';
import styled from 'styled-components';

const PublisherCard = ({ publisher, setPublisher }) => {
	const router = useRouter();
	const { name, id, description } = publisher;

	const goToPub = () => {
		setPublisher(publisher);
		router.push('/analysis/mode-list');
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

export const PubCardStyles = styled.li`
	width: max-content;
	cursor: pointer;
	padding: 5px 5px 5px 0;
	font-size: 1.8rem;
	font-weight: 500;
	margin: 10px;

	span {
		margin-right: 10px;
		margin-left: 10px;
	}

	&:hover,
	&:focus {
		color: ${(props) => props.theme.colors.secondary};
	}
`;

export default PublisherCard;
