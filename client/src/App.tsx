import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box, useColorModeValue, Flex } from "@chakra-ui/react";
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
import Footer from "./components/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBoard } from "./context/BoardContext";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { isAdmin } = useAuth();
  const { isToastSuccess } = useBoard();

  const bgColor = useColorModeValue("white", "#313338");

 

  useEffect(() => {
    if (isToastSuccess.toLowerCase().includes("error")) {
      toast.error(isToastSuccess, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (isToastSuccess.length > 0) {
      toast.success(isToastSuccess, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [isToastSuccess]);

 if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <HelmetProvider>
      <Router>
        <Flex
          direction="column"
          minHeight="100vh"
          fontFamily="Roboto, Helvetica, sans-serif"
          bg={bgColor}
          className="transition-all duration-500 ease-in-out"
        >
          <Navbar />
        <Box as="main" flex="1" p={4}>
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
              path="/boards/:id"
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
        <Footer />
        </Flex>
      </Router>
      {/* Global ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </HelmetProvider>
  );
}

export default App;

// function App() {
//   const { isAuthenticated, isLoading } = useAuth0();
//   const { isAdmin } = useAuth();

//   const bgColor = useColorModeValue("white", "#313338");

//   if (isLoading) {
//     return <Loading isLoading={isLoading} />;
//   }

//   return (
//     <HelmetProvider>
//       <Router>
//         <Flex
//           direction="column"
//           minH="100vh"
//           fontFamily="Roboto, Helvetica, sans-serif"
//           bg={bgColor}
//           className="transition-all duration-500 ease-in-out"
//         >
//           <Navbar />
//           <Box as="main" flex="1" p={4}>
//             <Routes>
//               <Route
//                 path="/"
//                 element={!isAuthenticated ? <Landing /> : <Navigate to="/home" />}
//               />
//               <Route
//                 path="/home"
//                 element={isAuthenticated ? <Home /> : <Navigate to="/" />}
//               />
//               <Route
//                 path="/templates"
//                 element={isAuthenticated ? <Templates /> : <Navigate to="/" />}
//               />
//               <Route
//                 path="/new"
//                 element={isAuthenticated ? <NewBoard /> : <Navigate to="/" />}
//               />
//               <Route
//                 path="/board"
//                 element={isAuthenticated ? <Board /> : <Navigate to="/" />}
//               />
//               <Route
//                 path="/account"
//                 element={isAuthenticated ? <Account /> : <Navigate to="/" />}
//               />
//               <Route
//                 path="/uploads"
//                 element={
//                   isAuthenticated ? <UserTemplates /> : <Navigate to="/" />
//                 }
//               />
//               <Route
//                 path="/admin_dashboard"
//                 element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
//               />
//               <Route
//                 path="/callback"
//                 element={isAuthenticated ? <Home /> : <Navigate to="/home" />}
//               />
//               <Route
//                 path="*"
//                 element={
//                   isAuthenticated ? (
//                     <ErrorPage />
//                   ) : (
//                     <Navigate to="/home" replace />
//                   )
//                 }
//               />
//             </Routes>
//           </Box>
//           <Footer />
//         </Flex>
//       </Router>
//     </HelmetProvider>
//   );
// }

// export default App;
