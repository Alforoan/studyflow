import "@testing-library/jest-dom";

interface ImportMetaEnv {
  VITE_AUTH0_DOMAIN: string;
  VITE_AUTH0_CLIENT_ID: string;
  VITE_BACKEND_URL: string;

}

const importMetaEnv: ImportMetaEnv = {
  VITE_AUTH0_DOMAIN: "mock-domain",
  VITE_AUTH0_CLIENT_ID: "mock-client-id",
  VITE_BACKEND_URL: "mock-backend-url",
};

// Assert global as unknown first, then cast to a specific type
(global as unknown as { importMetaEnv: ImportMetaEnv }).importMetaEnv = importMetaEnv;

Object.defineProperty(global, 'import.meta', {
  value: {
    env: importMetaEnv,
  },
});