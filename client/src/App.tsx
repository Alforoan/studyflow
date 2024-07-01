import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Landing from "./pages/Landing";
import Loading from "./components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';
import ErrorPage from './pages/ErrorPage';
import Analytics from './pages/Analytics';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const {isAdmin} = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Landing /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/" />}
        />
        <Route
          path="/admin_dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/callback"
          element={isAuthenticated ? <Home /> : <Navigate to="/home" />}
        />
        <Route
          path="/analytics"
          element={isAuthenticated ? <Analytics /> : <Navigate to="/home" />}
        />
        <Route
          path="*"
          element={
            isAuthenticated ? <ErrorPage /> : <Navigate to="/home" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
