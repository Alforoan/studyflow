import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
function App() {
	return (
		<Router>
			<Navbar />
			<Home />
		</Router>
	);
}

export default App;
