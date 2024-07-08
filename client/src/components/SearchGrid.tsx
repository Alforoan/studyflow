import { useEffect, useState } from "react";
import { useTemplates } from "../context/TemplateContext";

import TemplatePreview from "./TemplatePreview";
import { Template } from "../types";

import { useGetCards, useGetTemplates } from "../hooks/useAPI";

const SearchGrid = () => {
  const { templateQuery, setTemplateIsOwned } = useTemplates();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);

  const { getTemplates } = useGetTemplates();
  const { getCards } = useGetCards();

  const fetchTemplates = async () => {
    try {
      const templatesFromAPI = await getTemplates();
      if (templatesFromAPI.length > 0) {
        const updatedTemplates = await Promise.all(
          templatesFromAPI.map(async (template) => {
            const cardsFromAPI = await getCards(template.uuid, true);
            const updatedCards = [...cardsFromAPI];
            return { ...template, cards: updatedCards };
          })
        );
        setAllTemplates(updatedTemplates);
        setTemplateIsOwned(false);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    console.log("TEMP", templates);
    if (templateQuery) {
      setTemplates(
        allTemplates
          .filter((template) =>
            template.name.toLowerCase().includes(templateQuery.toLowerCase())
          )
          .sort((a, b) => b.downloads - a.downloads)
      );
    } else {
      setTemplates(allTemplates.sort((a, b) => b.downloads - a.downloads));
    }
  }, [templateQuery, allTemplates]);

  return (
    <div className="text-center mt-12">
      <ul className="flex flex-row flex-wrap gap-4 justify-center">
        {templates.map((template, i) => (
          <li key={i} className="cursor-pointer">
            <TemplatePreview template={template} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchGrid;
