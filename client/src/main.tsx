import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { DeleteBoardProvider } from "./context/DeleteBoardContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { BoardProvider } from "./context/BoardContext.tsx";
import { TemplateProvider } from "./context/TemplateContext.tsx";
import { ChakraProvider } from "@chakra-ui/react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI || window.location.origin;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
    >
      <BoardProvider>
        <TemplateProvider>
          <DeleteBoardProvider>
            <AuthProvider>
              <ChakraProvider>
                <App />
              </ChakraProvider>
            </AuthProvider>
          </DeleteBoardProvider>
        </TemplateProvider>
      </BoardProvider>
    </Auth0Provider>
  </React.StrictMode>
);
