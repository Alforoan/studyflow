import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        {/* <Route path="/logout" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

