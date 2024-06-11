import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./components/Navbar";
function App() {
	return (
		<Router>
			{/* <h1 className="text-3xl font-bold underline">Studyflow!!!</h1> */}
			<Navbar />
		</Router>
	);
}

export default App;
