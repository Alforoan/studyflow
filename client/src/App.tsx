import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Landing from "./pages/Landing";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Navbar />
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<Landing />} />
        ) : (
          <Route path="/" element={<Navigate to="/home" />} />
        )}
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        {/* <Route path="/logout" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;