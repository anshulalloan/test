import { Route, Routes } from "react-router-dom";

import HomePage from "./components/home";
import { SipCalculator } from "./components/sip/Calculator";

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<HomePage />}
			/>
			<Route
				path="/sip"
				element={<SipCalculator />}
			/>
		</Routes>
	);
};
