import { createContext, useState, useContext, ReactNode } from "react";
import { Board } from "../types";
import usePostNewTemplate from "../hooks/usePostNewTemplate";
import usePostTemplateCard from "../hooks/usePostTemplateCard";

// Define the context shape
interface TemplateContextType {
  templateQuery: string;
  setTemplateQuery: (query: string) => void;
  handleUpdateSearchQuery: (query: string) => void;
  toggleIsSearching: () => void;
  isSearching: boolean;
  isTemplate: boolean;
  setIsTemplate: (isTemplate: boolean) => void;
  handleUploadNewTemplate: (template: Board) => void;
  uploadedTemplateNames: string[];
  setUploadedTemplateNames: (names: string[]) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined
);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [templateQuery, setTemplateQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isTemplate, setIsTemplate] = useState<boolean>(false);
  const [uploadedTemplateNames, setUploadedTemplateNames] = useState<string[]>(
    []
  );

  const { postNewTemplate } = usePostNewTemplate();
  const { postTemplateCard } = usePostTemplateCard();

  const handleUpdateSearchQuery = (query: string) => {
    setTemplateQuery(query);
  };

  const toggleIsSearching = () => {
    setIsSearching((prev) => !prev);
  };

  const handleUploadNewTemplate = (template: Board) => {
    // UNCOMMENT WHEN ROUTE IS COMPLETED. MAY NEED ASYNC/AWAIT IF ISSUES UPLOADING ALL AT ONCE
    // postNewTemplate(template);
    // template.cards!.forEach((card) => {
    //   postTemplateCard(card, template.uuid);
    // });

    setUploadedTemplateNames((prev) => [...prev, template.name]);
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
        handleUploadNewTemplate,
        uploadedTemplateNames,
        setUploadedTemplateNames,
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
