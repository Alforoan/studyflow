import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

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
  templateIsOwned: boolean;
  setTemplateIsOwned: (templateIsOwned: boolean) => void;
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
  const [templateIsOwned, setTemplateIsOwned] = useState<boolean>(false);

  const { postNewTemplate } = usePostNewTemplate();
  const { postTemplateCard } = usePostTemplateCard();

  const handleUpdateSearchQuery = (query: string) => {
    setTemplateQuery(query);
  };

  const toggleIsSearching = () => {
    setIsSearching((prev) => !prev);
  };

  useEffect(() => {
    console.log("TEMPLATE IS OWNED", templateIsOwned);
  }, [templateIsOwned]);

  const handleUploadNewTemplate = async (template: Board) => {
    try {
      await postNewTemplate(template);

      template.cards!.forEach(async (card) => {
        if (card.id !== "0") {
          await postTemplateCard(card, template.uuid);
        }
      });

      setUploadedTemplateNames((prev) => [...prev, template.name]);
    } catch (error) {
      console.error("Error uploadinig template cards:", error);
    }
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
        templateIsOwned,
        setTemplateIsOwned,
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
