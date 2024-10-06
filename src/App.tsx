import { Box } from "@mui/material";

import { AppRouter } from "./AppRouter";
import { Navbar } from "./components/Navbar";
import { SipCalculator } from "./components/sip/Calculator";

function App() {
	return (
		<Box className="App">
			<Navbar />
			<AppRouter />
		</Box>
	);
}

export default App;
