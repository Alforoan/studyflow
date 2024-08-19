import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { newCard } from "../dummyData";
import TemplatePreview from "./TemplatePreview";
import { useTemplates } from "../context/TemplateContext";
import { useGetCards, useGetTemplates } from "../hooks/useAPI";
import { useBoard } from "../context/BoardContext";

import { Grid, GridItem, Skeleton } from "@chakra-ui/react";

const UserTemplatesGrid = () => {
  const {
    userTemplates,
    setUserTemplates,
    setTemplateIsOwned,
    setUploadedTemplateNames,
  } = useTemplates();
  const { setIsSearching } = useBoard();
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  const { getTemplates } = useGetTemplates();
  const { getCards } = useGetCards();

  const fetchUserTemplates = async () => {
    const templates = await getTemplates(user?.email);
    setIsLoading(false);
    if (templates.length > 0) {
      const updatedTemplates = await Promise.all(
        templates.map(async (template) => {
          const cardsFromAPI = await getCards(template.uuid, true);
          const updatedCards = [...cardsFromAPI, newCard];
          return { ...template, cards: updatedCards };
        })
      );
      setUserTemplates(updatedTemplates);
      setTemplateIsOwned(true);
      setUploadedTemplateNames(
        updatedTemplates.map((template) => template.name)
      );
    }
  };

  useEffect(() => {
    fetchUserTemplates();
    setIsSearching(false);
  }, []);

  return (
    <Grid
      pb={8}
      templateColumns={{
        base: "repeat(2, 2fr)",
        sm: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
      gap={4}
      aria-label="User Templates"
    >
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <GridItem key={i}>
              <Skeleton height="200px" borderRadius="md" />
            </GridItem>
          ))
        : userTemplates.map((template, i) => (
            <GridItem key={i} cursor="pointer">
              <TemplatePreview template={template} />
            </GridItem>
          ))}
    </Grid>
  );
};

export default UserTemplatesGrid;
