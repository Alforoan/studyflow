import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { Board, Card, Template } from "../types";
import usePostNewTemplate from "../hooks/usePostNewTemplate";
import usePostTemplateCard from "../hooks/usePostTemplateCard";
import { useBoard } from "./BoardContext";

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

  const { postNewTemplate } = usePostNewTemplate();
  const { postTemplateCard } = usePostTemplateCard();
  const { selectedBoard, setSelectedBoard } = useBoard();

  const handleUpdateSearchQuery = (query: string) => {
    setTemplateQuery(query);
  };

  useEffect(() => {
    console.log("TEMPLATE IS OWNED", templateIsOwned);
  }, [templateIsOwned]);

  // previous code
  // const handleUploadNewTemplate = (template: Board) => {
  //   // UNCOMMENT WHEN ROUTE IS COMPLETED. MAY NEED ASYNC/AWAIT IF ISSUES UPLOADING ALL AT ONCE
  //   postNewTemplate(template);
  //   template.cards!.forEach((card) => {
  //     if (card.id !== "0") {
  //       postTemplateCard(card, template.uuid);
  //     }
  //   });

  //   setUploadedTemplateNames((prev) => [...prev, template.name]);
  // };

  const handlePostTemplateCard = async (card: Card) => {
    await postTemplateCard(card, selectedBoard!.uuid!);
    let updatedBoard = selectedBoard;
    if (updatedBoard && updatedBoard.cards) {
      updatedBoard.cards.push(card);
    }

    setSelectedBoard(updatedBoard);
  };

  // Above component set up with async/await
  const handleUploadNewTemplate = async (template: Board) => {
    console.log("alskdm", template);
    try {
      await postNewTemplate(template);

      template.cards!.forEach(async (card) => {
        if (card.id !== "0") {
          console.log("alskdm", card);
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
