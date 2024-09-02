import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Account from "./pages/Account";
import Landing from "./pages/Landing";
import Loading from "./components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import ErrorPage from "./pages/ErrorPage";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import NewBoard from "./pages/NewBoard";
import Board from "./pages/Board";
import UserTemplates from "./pages/UserTemplates";
import Generate from "./pages/Generate";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { isAdmin } = useAuth();

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <HelmetProvider>
      <Router>
        <Box
          minH="100vh"
          fontFamily="Roboto, Helvetica, sans-serif"
          bg={useColorModeValue("white", "#313338")}
          className="transition-all duration-500 ease-in-out"
        >
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
              path="/templates"
              element={isAuthenticated ? <Templates /> : <Navigate to="/" />}
            />
            <Route
              path="/new"
              element={isAuthenticated ? <NewBoard /> : <Navigate to="/" />}
            />
            <Route
              path="/generate"
              element={isAuthenticated ? <Generate /> : <Navigate to="/" />}
            />
            <Route
              path="/board"
              element={isAuthenticated ? <Board /> : <Navigate to="/" />}
            />
            <Route
              path="/account"
              element={isAuthenticated ? <Account /> : <Navigate to="/" />}
            />
            <Route
              path="/uploads"
              element={
                isAuthenticated ? <UserTemplates /> : <Navigate to="/" />
              }
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
              path="*"
              element={
                isAuthenticated ? (
                  <ErrorPage />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
          </Routes>
        </Box>
      </Router>
    </HelmetProvider>
  );
}

export default App;
