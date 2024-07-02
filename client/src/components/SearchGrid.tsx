import { useEffect, useState } from "react";
import { useTemplates } from "../context/TemplateContext";
import {
  cssTemplate,
  htmlTemplate,
  internetTemplate,
  jsTemplate,
  newCard,
} from "../dummyData";
import TemplatePreview from "./TemplatePreview";
import { Template } from "../types";
import useGetAllTemplates from "../hooks/useGetAllTemplates";
import useGetTemplateCards from "../hooks/useGetTemplateCards";

const dummyTemplates = [
  internetTemplate,
  htmlTemplate,
  cssTemplate,
  jsTemplate,
];

const SearchGrid = () => {
  const { templateQuery } = useTemplates();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [allTemplates, setAllTemplates] = useState<Template[]>(dummyTemplates);

  const { getAllTemplates } = useGetAllTemplates();
  const { getCardsFromTemplate } = useGetTemplateCards();

  useEffect(() => {
    const fetchTemplates = async () => {
      const templatesFromAPI = await getAllTemplates();

      const updatedTemplates = await Promise.all(
        templatesFromAPI.map(async (template) => {
          const cardsFromAPI = await getCardsFromTemplate(template.uuid);
          const updatedCards = [...cardsFromAPI, newCard];
          return { ...template, cards: updatedCards };
        })
      );
      setAllTemplates(updatedTemplates);
    };

    if (templates.length === 0) {
      // UNCOMMENT WHEN ROUTE IS UP FOR GET ALL TEMPLATES AND GET CARDS FROM TEMPLATE
      //   fetchTemplates();
    }
  }, []);

  useEffect(() => {
    console.log(templates);
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
  }, [templateQuery]);

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
