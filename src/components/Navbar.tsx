import path from "path";

import { Box } from "@mui/material";
import { useMemo } from "react";
import { PiGraph } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const routes = useMemo(() => {
		return [
			{
				name: "Home",
				path: "/",
			},
			{
				name: "SIP Calculator",
				path: "/sip-calculator",
			},
			{
				name: "SWP Calculator",
				path: "/swp-calculator",
			},
			{
				name: "Retirement Calculator",
				path: "/retirement-calculator",
			},
		];
	}, []);

	const location = useLocation();

	const activeRoute = useMemo(() => {
		return location.pathname;
	}, [location.pathname]);

	return (
		<Box className={"nav-bar"}>
			<Box className={"brand-name"}>
				<PiGraph /> <h1>FinPy</h1>
			</Box>
			<Box className={"nav-links"}>
				{routes.map((route) => {
					return (
						<Link
							key={route.path}
							to={route.path}
							className={
								activeRoute === route.path ? "active" : ""
							}
						>
							{route.name}
						</Link>
					);
				})}
			</Box>
		</Box>
	);
};
