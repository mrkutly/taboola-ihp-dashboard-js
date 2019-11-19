import PubSearchPage from '../../components/analysis/PubSearchPage';
import withAuth from '../../lib/withAuth';

const Index = () => <PubSearchPage />;

export default withAuth(Index);
