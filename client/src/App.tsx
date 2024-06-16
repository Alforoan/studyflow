import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Landing from "./pages/Landing";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Landing /> : <Navigate to="/home" />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
