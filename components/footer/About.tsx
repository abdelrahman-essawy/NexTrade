import Link from "next/link";
import logoImg from "../../assets/logo-no-background.svg";

export default function FooterAbout({
	companyTitle,
}: {
	companyTitle?: string;
}) {
	const title = companyTitle || "NexTrade";
	return (
		<>
			<div className="page-footer__logo">
				<Link href="/">
					<a>
						<img src={logoImg.src} width={100} height={100} alt={title} />
					</a>
				</Link>
			</div>
			<div className="page-footer__company-info">
				<p className="title">{title}</p>
			</div>
			<div className="page-footer__disclaimer">
				<p className="text-muted small">
					NexTrade is an innovative e-commerce platform that offers a seamless
					shopping experience, connecting customers with a wide range of
					products from various sellers. With cutting-edge technology and
					user-friendly features, NexTrade makes online shopping convenient and
					efficient.
				</p>
			</div>
		</>
	);
}
