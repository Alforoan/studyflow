import { useEffect, useState } from "react";
import { useTemplates } from "../context/TemplateContext";
import TemplatePreview from "./TemplatePreview";
import { Template } from "../types";
import { useGetCards, useGetTemplates } from "../hooks/useAPI";
import { templatesToUpload } from "../templatesToUpload";
import { Grid, GridItem, Skeleton } from "@chakra-ui/react";

const SearchGrid = () => {
  const { templateQuery, setTemplateIsOwned } = useTemplates();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setAllTemplates([...templatesToUpload, ...updatedTemplates]);
        setTemplateIsOwned(false);
      } else {
        setAllTemplates(templatesToUpload);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (templateQuery) {
      setTemplates(
        allTemplates
          .filter((template) =>
            template.name.toLowerCase().includes(templateQuery.toLowerCase())
          )
          .sort((a, b) => {
            if (b.downloads === a.downloads) {
              return a.name.localeCompare(b.name);
            }
            return b.downloads - a.downloads;
          })
      );
    } else {
      setTemplates(
        allTemplates.sort((a, b) => {
          if (b.downloads === a.downloads) {
            return a.name.localeCompare(b.name);
          }
          return b.downloads - a.downloads;
        })
      );
    }
  }, [templateQuery, allTemplates]);

  return (
    <Grid
      pb={8}
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
      gap={4}
    >
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => (
            <GridItem key={i}>
              <Skeleton height="200px" borderRadius="md" />
            </GridItem>
          ))
        : templates.map((template, i) => (
            <GridItem key={i} cursor="pointer">
              <TemplatePreview template={template} />
            </GridItem>
          ))}
    </Grid>
  );
};

export default SearchGrid;
