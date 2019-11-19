import styled from 'styled-components';
import makeCSVHref from '../../utils/makeCSVHref';
import formatNumber from '../../utils/formatNumber';

const ModeList = (props) => {
	const makeHref = () => {
		const rows = props.modes.map((mode) => [
			mode.MODE_NAMES,
			`"${formatNumber(mode.number_views)}"`,
			mode.publisher_id,
		]);
		const headers = ['Mode Name', 'Number of Page Views', 'Publisher ID'];
		return makeCSVHref({ rows, headers });
	};

	return (
		<>
			<DownloadLinkStyles
				href={makeHref()}
				download={`${props.pubName}_${props.active ? 'active-' : 'inactive-'}mode-usage.csv`}
			>
				Download this list
			</DownloadLinkStyles>
			<ul style={{ paddingLeft: 0 }}>
				{props.modes.map((mode, idx) => (
					<ListItemStyles key={mode.MODE_NAMES} isEven={idx % 2 === 0} gridColumns="1fr 1fr">
						<div>{mode.MODE_NAMES}</div>
						<div>{formatNumber(mode.number_views)} page views</div>
					</ListItemStyles>
				))}
			</ul>
		</>
	);
};

export const ListItemStyles = styled.li`
	padding: 5px;
	font-weight: 500;
	display: grid;
	grid-template-columns: ${(props) => props.gridColumns};
	width: 900px;
	background: ${(props) => (props.isEven ? '#cacaca7d' : 'white')};
`;

export const DownloadLinkStyles = styled.a`
	color: ${(props) => props.theme.colors.secondary};
	letter-spacing: 0.5px;
	font-size: 1.5rem;
	font-weight: 450;
	padding: 0;
`;

export default ModeList;
