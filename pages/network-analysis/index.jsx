import NetworkSearchPage from '../../components/network-analysis/NetworkSearchPage';
import withAuth from '../../lib/withAuth';

const Index = () => <NetworkSearchPage />;

export default withAuth(Index);
