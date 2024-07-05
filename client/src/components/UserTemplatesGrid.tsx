import { useEffect, useState } from "react";
import { Template } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import useGetAllTemplates from "../hooks/useGetAllTemplates";
import useGetTemplateCards from "../hooks/useGetTemplateCards";
import { newCard } from "../dummyData";
import TemplatePreview from "./TemplatePreview";

const UserTemplatesGrid = () => {
  const [userTemplates, setUserTemplates] = useState<Template[]>([]);
  const { user } = useAuth0();

  const { getAllTemplates } = useGetAllTemplates();
  const { getCardsFromTemplate } = useGetTemplateCards();

  const fetchUserTemplates = async () => {
    const templates = await getAllTemplates(user?.email);
    if (templates.length > 0) {
      const updatedTemplates = await Promise.all(
        templates.map(async (template) => {
          const cardsFromAPI = await getCardsFromTemplate(template.uuid);
          const updatedCards = [...cardsFromAPI, newCard];
          return { ...template, cards: updatedCards };
        })
      );
      setUserTemplates(updatedTemplates);
    }
  };

  useEffect(() => {
    fetchUserTemplates();
  }, []);

  return (
    <div className="text-center mt-12">
      <ul className="flex flex-row flex-wrap gap-4 justify-center">
        {userTemplates.map((template, i) => (
          <li key={i} className="cursor-pointer">
            <TemplatePreview template={template} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTemplatesGrid;
