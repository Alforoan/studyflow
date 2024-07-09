import { createContext, useState, useContext, ReactNode } from "react";
import { Board, Card, Template } from "../types";
import { useBoard } from "./BoardContext";
import { usePostCard, usePostTemplate } from "../hooks/useAPI";

// Define the context shape
interface TemplateContextType {
  templateQuery: string;
  setTemplateQuery: (query: string) => void;
  handleUpdateSearchQuery: (query: string) => void;
  handlePostTemplateCard: (card: Card) => void;
  isTemplate: boolean;
  setIsTemplate: (isTemplate: boolean) => void;
  handleUploadNewTemplate: (template: Board) => void;
  uploadedTemplateNames: string[];
  setUploadedTemplateNames: (names: string[]) => void;
  templateIsOwned: boolean;
  setTemplateIsOwned: (templateIsOwned: boolean) => void;
  userTemplates: Template[];
  setUserTemplates: (
    userTemplates: Template[] | ((prev: Template[]) => Template[])
  ) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined
);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [templateQuery, setTemplateQuery] = useState<string>("");
  const [userTemplates, setUserTemplates] = useState<Template[]>([]);
  const [isTemplate, setIsTemplate] = useState<boolean>(false);
  const [uploadedTemplateNames, setUploadedTemplateNames] = useState<string[]>(
    []
  );
  const [templateIsOwned, setTemplateIsOwned] = useState<boolean>(false);
  const { postTemplate } = usePostTemplate();
  const { postCard } = usePostCard();
  const { selectedBoard, setSelectedBoard } = useBoard();

  const handleUpdateSearchQuery = (query: string) => {
    setTemplateQuery(query);
  };

  const handlePostTemplateCard = async (card: Card) => {
    await postCard(card, selectedBoard!.uuid!, true);
    let updatedBoard = selectedBoard;
    if (updatedBoard && updatedBoard.cards) {
      updatedBoard.cards.push(card);
    }

    setSelectedBoard(updatedBoard);
  };

  // Above component set up with async/await
  const handleUploadNewTemplate = async (template: Board) => {
    try {
      await postTemplate(template);

      template.cards!.forEach(async (card) => {
        if (card.id !== "0") {
          await postCard(card, template.uuid, true);
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
        handlePostTemplateCard,
        setIsTemplate,
        isTemplate,
        handleUploadNewTemplate,
        uploadedTemplateNames,
        setUploadedTemplateNames,
        templateIsOwned,
        setTemplateIsOwned,
        userTemplates,
        setUserTemplates,
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
