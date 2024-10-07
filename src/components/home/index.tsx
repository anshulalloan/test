import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { routes } from "../Navbar";

const HomePage = () => {
	return (
		<Box className="home-page">
			<h1>Welcome</h1>
			<Box className={"calculators"}>
				{routes.map((route) => {
					return route.path !== "/" ? (
						<Link
							key={route.path}
							to={route.path}
						>
							{route.name}
						</Link>
					) : null;
				})}
			</Box>
		</Box>
	);
};

export default HomePage;
