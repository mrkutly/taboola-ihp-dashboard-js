import { ListItemStyles, CardStyles } from '../analysis/ModePlacementsCard';
import { DividerStyles } from '../analysis/ModeUsage';
import formatNumber from '../../utils/formatNumber';

const ModePubsCard = (props) => {
	const { num_placements, num_publishers, num_views, placements, publishers, without_abp } = props.data;

	return (
		<ListItemStyles>
			<h3>{without_abp}</h3>
			<CardStyles>
				<div>
					<h4>Placements</h4>
					<ul>
						{placements.map((placement) => (
							<li key={`${without_abp}-${placement}-${num_views}`}>{placement}</li>
						))}
					</ul>
				</div>
				<div>
					<h4>Mode Data</h4>
					<ul>
						<li>Number of placements: {num_placements}</li>
						<li>Number of views: {formatNumber(num_views)}</li>
					</ul>
				</div>
				<div>
					<h4>Publishers ({num_publishers})</h4>
					<ul>
						{publishers.map((publisher) => (
							<li key={`${without_abp}-${publisher}-${num_views}`}>{publisher}</li>
						))}
					</ul>
				</div>
			</CardStyles>
			<DividerStyles />
		</ListItemStyles>
	);
};

export default ModePubsCard;
