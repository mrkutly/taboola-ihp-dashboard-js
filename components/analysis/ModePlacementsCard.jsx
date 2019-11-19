import styled from 'styled-components';
import { DividerStyles } from './ModeUsage';
import formatNumber from '../../utils/formatNumber';

const ModeDataCard = (props) => {
	const { mode, num_placements, num_views, placements, publishers } = props.modeData;
	const [modeName, loader] = mode.split(/[:=]/g).filter((string) => string.length > 3);

	return (
		<ListItemStyles>
			<h3>{modeName}</h3>
			<CardStyles>
				<div>
					<h4>Placements</h4>
					<ul>
						{placements.map((placement) => (
							<li key={`${modeName}-${placement}-${num_views}`}>{placement}</li>
						))}
					</ul>
				</div>
				<div>
					<h4>Mode Data</h4>
					<ul>
						<li>Number of placements: {num_placements}</li>
						<li>Number of views: {formatNumber(num_views)}</li>
						<li>In loader: {loader || props.publisher}</li>
					</ul>
				</div>
				<div>
					<h4>Publishers</h4>
					<ul>
						{publishers.map((publisher) => (
							<li key={`${modeName}-${publisher}-${num_views}`}>{publisher}</li>
						))}
					</ul>
				</div>
			</CardStyles>
			<DividerStyles />
		</ListItemStyles>
	);
};

export const ListItemStyles = styled.li`
	margin: 5vh auto;
	font-size: 1.6rem;

	h3 {
		font-size: 2rem;
		margin-bottom: 0;
		border-bottom: 2px solid ${(props) => props.theme.colors.primary};
		width: max-content;
	}
`;

export const CardStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	ul {
		list-style: none;
		padding-left: 0;
	}
`;

export default ModeDataCard;
