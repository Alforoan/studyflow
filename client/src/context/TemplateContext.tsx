import { createContext, useState, useContext, ReactNode } from "react";

// Define the context shape
interface TemplateContextType {
  templateQuery: string;
  setTemplateQuery: (query: string) => void;
  handleUpdateSearchQuery: (query: string) => void;
  toggleIsSearching: () => void;
  isSearching: boolean;
  isTemplate: boolean;
  setIsTemplate: (isTemplate: boolean) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined
);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [templateQuery, setTemplateQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isTemplate, setIsTemplate] = useState<boolean>(false);

  const handleUpdateSearchQuery = (query: string) => {
    setTemplateQuery(query);
  };

  const toggleIsSearching = () => {
    setIsSearching((prev) => !prev);
  };

  return (
    <TemplateContext.Provider
      value={{
        templateQuery,
        setTemplateQuery,
        handleUpdateSearchQuery,
        toggleIsSearching,
        isSearching,
        setIsTemplate,
        isTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

// Custom hook to use the context
export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
