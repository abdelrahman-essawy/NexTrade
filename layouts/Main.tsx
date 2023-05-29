import dynamic from "next/dynamic";
import { ReactNode, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AlertWidget from "../components/Alert";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../redux/store";
import clsx from "clsx";
const AsideMenu = dynamic(() => import("../components/AsideMenu"), {
	ssr: false,
});
import AsideBackdrop from "../components/asideMenu/Backdrop";
import HorizontalMenu from "../components/HorizontalMenu";
import CallToOrder from "../components/header/CallToOrder";
import { IMenuItem } from "../@types/components";
import { IBasicSettings } from "../@types/settings";
import { useDispatch } from "react-redux";
import { setBasicSettings } from "../redux/reducers/app";

const shopBaseUrl = process.env.BOUNDLESS_BASE_URL || "";

export default function MainLayout({
	children,
	title,
	metaData,
	mainMenu,
	footerMenu,
	noIndex,
	basicSettings,
}: IMainLayoutProps) {
	const dispatch = useDispatch();
	const { canonicalUrl, imgUrl, description } = metaData || {};
	const asideIsOpened = useAppSelector(
		(state: RootState) => state.asideMenu.isOpened
	);

	useEffect(() => {
		if (basicSettings) {
			dispatch(setBasicSettings(basicSettings));
		}
	}, [dispatch, basicSettings]);

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />

				<meta property="og:type" content="website" />
				<meta property="og:title" content={title || "NexTrade E-Commerce"} />
				<meta property="og:url" content={canonicalUrl || shopBaseUrl} />
				<meta
					property="og:image"
					content={imgUrl || shopBaseUrl + "/logo-black.png"}
				/>
				{description && (
					<meta
						property="og:description"
						content={
							description ||
							"NexTrade is an innovative e-commerce platform that offers a seamless shopping experience, connecting customers with a wide range of products from various sellers. With cutting-edge technology and user-friendly features, NexTrade makes online shopping convenient and efficient."
						}
					/>
				)}

				<title>{title || "NexTrade E-Commerce"}</title>

				<link
					rel="preconnect"
					href={
						process.env.BOUNDLESS_API_BASE_URL ||
						"https://api.boundless-commerce.com"
					}
					crossOrigin={"crossOrigin"}
				/>
				{noIndex && <meta name="robots" content="noindex" />}
			</Head>
			<AlertWidget />
			<div
				className={clsx("page-layout page-layout_main sample-theme", {
					"page-layout_aside-opened": asideIsOpened,
				})}
			>
				<CallToOrder />
				<Header companyTitle="NexTrade" />
				{mainMenu && <HorizontalMenu menuList={mainMenu} />}
				<main className="page-layout__main">{children}</main>
				<Footer menuList={footerMenu} />
				<AsideBackdrop />
			</div>
			<AsideMenu menuList={mainMenu} />
			<script src="https://cdn.botpress.cloud/webchat/v0/inject.js"></script>
			<script
				src="https://mediafiles.botpress.cloud/f8ca3b6a-ced0-4add-ac88-58a8a63cfbd6/webchat/config.js"
				defer
			></script>
		</>
	);
}

interface IMainLayoutProps {
	children: ReactNode | ReactNode[];
	title?: string;
	metaData?: IMetaData;
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
	noIndex?: boolean;
	basicSettings?: IBasicSettings;
}

interface IMetaData {
	canonicalUrl?: string;
	imgUrl?: string | null;
	description?: string | null;
}
