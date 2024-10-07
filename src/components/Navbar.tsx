import path from "path";

import {
	Button,
	Dropdown,
	Menu,
	MenuButton,
	MenuItem,
} from "@mui/joy";
import { Box } from "@mui/material";
import { useMemo, useState, type MouseEvent } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { PiGraph } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

export const routes = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "SIP Calculator",
		path: "/sip",
	},
	{
		name: "SWP Calculator",
		path: "/swp",
	},
	{
		name: "Retirement Calculator",
		path: "/retirement",
	},
];

export const Navbar = () => {
	const location = useLocation();

	const activeRoute = useMemo(() => {
		return location.pathname;
	}, [location.pathname]);

	const [anchorEl, setAnchorEl] =
		useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (
		event: MouseEvent<HTMLButtonElement>
	) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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
			<Dropdown>
				<MenuButton className={"menu-icon"}>
					<BiMenuAltRight />
				</MenuButton>
				<Menu className={"nav-menu"}>
					{routes.map((route) => {
						return (
							<MenuItem
								key={route.path}
								className="menu-item"
							>
								<Link
									to={route.path}
									className={
										activeRoute === route.path
											? "active"
											: ""
									}
								>
									{route.name}
								</Link>
							</MenuItem>
						);
					})}
				</Menu>
			</Dropdown>
		</Box>
	);
};
