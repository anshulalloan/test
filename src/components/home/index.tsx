import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { routes } from "../Navbar";

const HomePage = () => {
	return (
		<Box className="home-page">
			<h1>Home Page</h1>
			{routes.map((route) => {
				return (
					<Link
						key={route.path}
						to={route.path}
					>
						{route.name}
					</Link>
				);
			})}
		</Box>
	);
};

export default HomePage;
