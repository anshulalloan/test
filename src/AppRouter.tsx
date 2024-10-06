import { Route, Routes } from "react-router-dom";

import { SipCalculator } from "./components/sip/Calculator";

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<SipCalculator />}
			/>
			<Route
				path="/sip-calculator"
				element={<SipCalculator />}
			/>
		</Routes>
	);
};
