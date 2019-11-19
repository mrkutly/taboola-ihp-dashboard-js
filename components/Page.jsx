import React from 'react';
import { useRouter } from 'next/router';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import SideNav, { sideNavWidth } from './SideNav';

const publisherAnalysisNavLinks = [
	{
		text: 'List All Modes',
		href: '/analysis/mode-list',
	},
	{
		text: 'Page Views',
		href: '/analysis/mode-views',
	},
	{
		text: 'Placements',
		href: '/analysis/mode-placements',
	},
	{
		text: 'Mode Usage',
		href: '/analysis/mode-usage',
	},
];

const networkAnalysisNavLinks = [
	{
		text: 'Network Architecture',
		href: '/network-analysis/architecture',
	},
	{
		text: 'Modes By Publisher',
		href: '/network-analysis/modes-by-publisher',
	},
	{
		text: 'Modes In Loader',
		href: '/network-analysis/modes-in-loader',
	},
];

const theme = {
	colors: {
		primary: '#282c34',
		secondary: '#007bff',
		accent: '#ffd355',
		background: 'white',
		black: '#1a1a1a',
		lightGrey: '#cacaca',
	},
	maxWidth: '1500px',
};

const StyledPage = styled.div`
	min-width: 735px;
	color: ${(props) => props.theme.colors.primary};
`;

const Inner = styled.main`
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
	padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-size: 10px;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	body {
		background: ${(props) => props.theme.colors.background};
		padding: 0;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2;
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
	}
	a {
		text-decoration: none;
		color: ${theme.colors.black};
	}
`;
const Page = (props) => {
	const router = useRouter();
	const pubPaths = publisherAnalysisNavLinks.map((link) => link.href);
	const networkPaths = networkAnalysisNavLinks.map((link) => link.href);
	const analysisPaths = [...pubPaths, ...networkPaths];
	const shouldRenderSideNav = analysisPaths.includes(router.pathname);
	const links = router.pathname.match(/network-analysis/g) ? networkAnalysisNavLinks : publisherAnalysisNavLinks;

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<StyledPage>
				<Header />
				{shouldRenderSideNav && <SideNav links={links} />}
				<Inner style={shouldRenderSideNav ? { marginLeft: sideNavWidth } : {}}>{props.children}</Inner>
			</StyledPage>
		</ThemeProvider>
	);
};

export default Page;
