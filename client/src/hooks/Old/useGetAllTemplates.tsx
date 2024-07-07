import { useState } from "react";
import axios from "axios";
import { Template } from "../../types"; // Ensure Card is also imported if it's a separate type

const useGetAllTemplates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getAllTemplates = async (user = "all"): Promise<Template[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/templates`,
        {
          params: {
            user: user,
          },
        }
      );
      setIsLoading(false);
      const templates: Template[] = response.data.map(
        (datapt: { [x: string]: any }) => {
          let template: Template = {
            uuid: datapt["uuid"],
            name: datapt["name"],
            downloads: datapt["downloads"],
            author: datapt["author"],
            cards: [],
          };

          return template;
        }
      );
      return templates;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        setIsLoading(false);
      }
      return [];
    }
  };

  return { getAllTemplates, isLoading, error };
};

export default useGetAllTemplates;
