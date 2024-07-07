import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Board,
  Card,
  CardDetails,
  ChecklistEntry,
  Columns,
  Template,
} from "../types";

export const useAPI = (
  initialUrl: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  needsAuthorization: boolean
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const token = localStorage.getItem("jwt");

  const execute = async ({
    path = "",
    payload = {},
    needsAuth = needsAuthorization,
  }: { path?: string; payload?: any; needsAuth?: boolean } = {}) => {
    setIsLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      ...(needsAuth && { Authorization: `Bearer ${token}` }),
    };

    const url = `${import.meta.env.VITE_BACKEND_URL}${initialUrl}${path}`;

    try {
      const result = await axios({
        url: url,
        method,
        params: method === "GET" ? payload : undefined,
        data: method !== "GET" ? payload : undefined,
        headers: headers,
      });

      return result.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  // clears the error message after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return { execute, isLoading, error };
};

export const useGetBoards = () => {
  const { execute, isLoading, error } = useAPI("/api/boards", "GET", true);
  const { user } = useAuth0();

  const getBoards = async (isAdmin: boolean): Promise<Board[]> => {
    const endpoint = isAdmin ? "/admin" : "";
    const data = await execute({
      path: endpoint,
      payload: { email: user?.email ?? "something@wentwronghere.com" },
      needsAuth: true,
    });
    if (!data) return [];

    return data.map((board: any) => ({
      ...board,
      cards: [],
    }));
  };

  return { getBoards, isLoading, error };
};

export const useGetTemplates = () => {
  const { execute, isLoading, error } = useAPI(`/api/templates`, "GET", false);

  const getTemplates = async (user = "all"): Promise<Template[]> => {
    const data = await execute({ payload: { user } });
    if (!data) return [];

    const templates: Template[] = data.map((datapt: { [x: string]: any }) => {
      let template: Template = {
        uuid: datapt["uuid"],
        name: datapt["name"],
        downloads: datapt["downloads"],
        author: datapt["author"],
        cards: [],
      };

      return template;
    });
    return templates;
  };

  return { getTemplates, isLoading, error };
};

// this is for templates and boards
export const useGetCards = () => {
  const { execute, isLoading, error } = useAPI(`/api/`, "GET", true);

  const getCards = async (
    boardId: string,
    isTemplate: boolean
  ): Promise<Card[]> => {
    const boardType = isTemplate ? "templates" : "boards";
    const data = await execute({
      path: `${boardType}/${boardId}`,
      needsAuth: !isTemplate,
    });
    if (!data) return [];

    const cards = data.map((datapt: { [x: string]: any }) => {
      let details = JSON.parse(datapt["details"]);
      const cardDetails: CardDetails = {
        checklist: details["checklist"] as ChecklistEntry[],
        notes: details["notes"],
        timeEstimate: details["timeEstimate"],
      };

      let card: Card = {
        id: datapt["card_id"],
        cardName: datapt["card_name"],
        column: datapt["column_name"] as Columns,
        creationDate: datapt["creation_date"] as Date,
        order: datapt["order"],
        details: cardDetails,
      };

      return card;
    });

    return cards;
  };

  return { getCards, isLoading, error };
};

export const usePostBoard = () => {
  const { execute, isLoading, error } = useAPI(`/api/boards`, "POST", true);
  const { user } = useAuth0();

  const postBoard = async (board: Board) => {
    const payload = {
      name: board.name,
      email: user?.email ?? "something@wentwronghere.com",
      uuid: board.uuid,
    };
    await execute({ payload: payload });
  };

  return { postBoard, isLoading, error };
};

export const usePostTemplate = () => {
  const { execute, isLoading, error } = useAPI(`/api/templates`, "POST", false);
  const { user } = useAuth0();

  const postTemplate = async (board: Board) => {
    const payload = {
      name: board.name,
      author: user?.email ?? "something@wentwronghere.com",
      uuid: board.uuid,
      downloads: 0,
      uploaded_at: new Date(),
    };
    await execute({ payload: payload });
  };

  return { postTemplate, isLoading, error };
};

export const usePostCard = () => {
  const { execute, isLoading, error } = useAPI(`/api/`, "POST", true);

  const postCard = async (card: Card, boardId: string, isTemplate: boolean) => {
    const detailsStr = JSON.stringify(card.details);
    const dateStr =
      card.creationDate instanceof Date
        ? card.creationDate.toISOString()
        : card.creationDate;

    const payload = {
      cardId: card.id,
      cardName: card.cardName,
      creationDate: dateStr,
      order: card.order,
      column: card.column,
      details: detailsStr,
    };

    const boardType = isTemplate ? "templates" : "boards";

    await execute({ path: `${boardType}/${boardId}`, payload: payload });
  };
  return { postCard, isLoading, error };
};

export const usePutBoard = () => {
  const { execute, isLoading, error } = useAPI(`/api/`, "PUT", true);

  const putBoard = async (
    name: string,
    boardId: string,
    isTemplate: boolean
  ): Promise<void> => {
    const boardType = isTemplate ? "templates" : "boards";
    const payload = {
      name: name,
    };

    await execute({
      path: `${boardType}/${boardId}`,
      payload: payload,
    });
  };

  return { putBoard, isLoading, error };
};

export const useEditCard = () => {
  const { execute, isLoading, error } = useAPI(`/api/`, "PUT", true);

  const editCard = async (card: Card, isTemplate: boolean) => {
    const cardType = isTemplate ? "template_cards" : "cards";

    const dateStr =
      card.creationDate instanceof Date
        ? card.creationDate.toISOString()
        : card.creationDate;

    const detailsStr = JSON.stringify(card.details);

    const payload = {
      cardName: card.cardName,
      creationDate: dateStr,
      order: card.order,
      column: card.column,
      details: detailsStr,
    };

    await execute({
      path: `${cardType}/${card.id}`,
      payload: payload,
    });
  };

  return { editCard, isLoading, error };
};

export const useDeleteBoard = () => {
  const { execute, isLoading, error } = useAPI("/api/", "DELETE", true);

  const deleteBoard = async (boardId: string, isTemplate: boolean) => {
    const boardType = isTemplate ? "templates" : "boards";

    await execute({
      path: `${boardType}/${boardId}`,
    });
  };

  return { deleteBoard, isLoading, error };
};

export const useDeleteCard = () => {
  const { execute, isLoading, error } = useAPI("/api/", "DELETE", true);

  const deleteCard = async (cardId: string, isTemplate: boolean) => {
    const cardType = isTemplate ? "template_cards" : "cards";

    await execute({
      path: `${cardType}/${cardId}`,
    });
  };

  return { deleteCard, isLoading, error };
};

export const useIncrementDownloads = () => {
  const { execute, isLoading, error } = useAPI("/api/templates/", "PUT", true);

  const incrementDownloads = async (templateId: string) => {
    await execute({
      path: `${templateId}/increment_downloads`,
    });
  };

  return { incrementDownloads, isLoading, error };
};
