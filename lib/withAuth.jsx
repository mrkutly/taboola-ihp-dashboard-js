import { useContext, useEffect } from 'react';
import Loading from '../components/Loading';
import AuthContext from './authContext';

const storageKey = 'ihpDashboard';

const withAuth = (WrappedComponent) => (props) => {
	const { authentication, setAuthentication } = useContext(AuthContext);

	useEffect(() => {
		if (!authentication.isAuthorized) {
			const authStorage = localStorage.getItem(storageKey);

			if (authStorage) {
				const { token, expires } = JSON.parse(authStorage);

				if (token && expires && Date.now() < Number(expires)) {
					setAuthentication({
						token,
						expires,
						isAuthorized: true,
					});

					return;
				}
			}

			if (window.location.hash) {
				const splitHash = window.location.hash.split(/[#=&]/).filter((str) => str.length > 0);
				const params = splitHash.reduce((acc, el, idx) => {
					if (idx % 2 === 0) {
						acc[el] = splitHash[idx + 1];
					}
					return acc;
				}, {});

				localStorage.setItem(
					storageKey,
					JSON.stringify({
						token: params.access_token,
						expires: Date.now() + Number(params.expires_in) * 1000,
					}),
				);

				setAuthentication({
					token: params.access_token,
					expires: Date.now() + Number(params.expires_in) * 1000,
					isAuthorized: true,
				});

				return;
			}

			window.location.replace(
				`${process.env.AUTHENTICATION_URL}${process.env.AUTHENTICATION_PATHNAME}?client_id=${process.env.CLIENT_ID}&redirect_uri=${window.location.href}&response_type=${process.env.RESPONSE_TYPE}`,
			);
		}
	}, []);

	if (!authentication.token) return <Loading message="authenticating" />;
	return <WrappedComponent {...props} />;
};

export default withAuth;
