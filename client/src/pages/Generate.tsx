import React, { useEffect, useState } from "react";
import {
  Flex,
  Input,
  Button,
  useBreakpointValue,
  Container,
  Text,
  RadioGroup,
  Radio,
  Stack,
  Spinner,
  Box,
  Heading,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  CloseIcon,
  ExternalLinkIcon,
  DownloadIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import ErrorMessage from "../components/ErrorMessage";
import { FaWandMagicSparkles } from "react-icons/fa6";

import { Board, Card, CardDetails, ChecklistEntry, Columns } from "../types";
import { v4 as uuidv4 } from "uuid";
import { newCard } from "../dummyData";
import { useBoard } from "../context/BoardContext";

import { useNavigate } from "react-router-dom";
import LinkPreview from "../components/LinkPreview";

type Detail = {
  name: string;
  summary: string;
  format: "video" | "article";
  link?: string;
};

type Subtopic = {
  title: string;
  summary: string;
  detail_list?: Detail[];
};

const Generate: React.FC = () => {
  const [boardTopic, setBoardTopic] = useState<string>("");
  const [refineTopic, setrefineTopic] = useState<string>("");
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [understandingLevel, setUnderstandingLevel] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [gptJSONOutput, setGptJSONOutput] = useState(null);
  const [loadingSubtopic, setLoadingSubtopic] = useState<string | null>(null);

  const [boardName, setBoardName] = useState<string>("");

  const { handleAddAIBoard } = useBoard();

  const navigate = useNavigate();


  

  const handleChangeTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTopic(e.target.value);
  };
  const handleChangeRefineTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setrefineTopic(e.target.value);
  };

  const handleUnderstandingLevelChange = (value: string) => {
    setUnderstandingLevel(value);
  };

  const handleSubmitTopic = async () => {
    if (!understandingLevel) {
      setError("Please select a level of understanding.");
      return;
    }

    const numSubtopics =
      understandingLevel === "brief"
        ? 4
        : understandingLevel === "good"
        ? 8
        : 12;

    console.log("Number of subtopics requested:", numSubtopics);

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/subtopics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: boardTopic, num_subtopics: numSubtopics }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subtopics");
      }

      const data = await response.json();

      if (typeof data === "object" && data !== null) {
        setGptJSONOutput(data);
      } else {
        throw new Error("Invalid JSON response from the API");
      }

      console.log("API Response Data:", data);
      const fetchedSubtopics: Subtopic[] = data.subtopics.map((sub: any) => ({
        title: sub.name,
        summary: sub.summary,
      }));

      const responseBoardName: string = data.boardName;
      setBoardName(responseBoardName);
      setSubtopics(fetchedSubtopics);
      setError(null);
      setLoading(false);

      console.log("Subtopics:", subtopics);
      const fetchSubtopicDetails = async () => {
        for (const topic of fetchedSubtopics) {
          setLoadingSubtopic(topic.title);
          await handleFetchSubtopicDetails(topic.title);
          setLoadingSubtopic(null);
        }
      };
      fetchSubtopicDetails();

    } catch (error: any) {
      setError(error.message);
    }
  };

 

  const handleFetchSubtopicDetails = async (subtopicTitle: string) => {
    console.log("Fetching details for subtopic:", subtopicTitle);
    setError(null);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subtopic: subtopicTitle }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch subtopics");
      }
  
      const data = await response.json();
      console.log("API Response Data for Subtopic Details:", data);
  
      if (typeof data === "object" && data !== null) {
        const detailsToFetch: { topic: string; format: string }[] =
          data.sub_subtopics.map((detail: any) => ({
            topic: `${subtopicTitle} ${detail.name}`,
            format: detail.format,
          }));
  
        console.log("Details to Fetch:", detailsToFetch);
  
        const linksResponse = await fetch("http://127.0.0.1:5000/api/links", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topics: detailsToFetch }),
        });
  
        if (!linksResponse.ok) {
          throw new Error("Failed to fetch resources");
        }
  
        const resourcesData = await linksResponse.json();
        console.log("Resources Data:", resourcesData);
  
        // Update the specific subtopic with both details and links using the functional form of setState
        setSubtopics((prevSubtopics) =>
          prevSubtopics.map((subtopic) => {
            if (subtopic.title === subtopicTitle) {
              return {
                ...subtopic,
                detail_list: data.sub_subtopics.map((detail: any) => {
                  const resourceData = resourcesData.find(
                    (resource: any) =>
                      resource.topic === `${subtopicTitle} ${detail.name}`
                  );
  
                  return {
                    name: detail.name,
                    summary: detail.summary,
                    format: detail.format,
                    link: resourceData
                      ? resourceData.video_url || resourceData.article_url
                      : "No resource found",
                  };
                }),
              };
            }
            return subtopic;
          })
        );
      } else {
        throw new Error("Invalid JSON response from the API");
      }
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };
  


  const handleFetchMoreSubtopicDetails = (subtopicTitle: string) => {};

  // const handleSubmitRefineTopic = async () => {
  //   if (!gptJSONOutput) {
  //     setError("No existing JSON data to refine.");
  //     return;
  //   }

  //   const numSubtopics =
  //     understandingLevel === "brief"
  //       ? 4
  //       : understandingLevel === "good"
  //       ? 8
  //       : 12;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/api/refine", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         num_subtopics: numSubtopics,
  //         original_topic: boardTopic,
  //         instructions: refineTopic,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to refine subtopics");
  //     }

  //     const data = await response.json();
  //     setGptJSONOutput(data);
  //     console.log("API Refine Response Data:", data);

  //     const refinedSubtopics: Subtopic[] = data.subtopics.map((sub: any) => ({
  //       title: sub.name,
  //       summary: sub.summary,
  //       detail_list: sub.sub_subtopics.map((detail: any) => ({
  //         name: detail.name,
  //         summary: detail.summary,
  //         format: detail.format,
  //       })),
  //     }));

  //     const responseBoardName: string = data.boardName;
  //     setBoardName(responseBoardName);
  //     setSubtopics(refinedSubtopics);
  //     setError(null);
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const transformSubtopicsToCards = (): Card[] => {
    const transformedCards: Card[] = [newCard];
    /*
    id: string;
    cardName: string;
    creationDate: Date;
    order: number;
    column: Columns;
    details: CardDetails;
      checklist?: ChecklistEntry[] | undefined;
      notes?: string | undefined;
      timeEstimate?: number | undefined;
    color?: string | undefined;
    */

    subtopics.forEach((subtopic, i) => {
      let details: CardDetails = {
        timeEstimate: 40,
        notes: subtopic.summary,
        checklist: [],
      };
      subtopic.detail_list!.forEach((detail) => {
        let newChecklistEntry: ChecklistEntry = {
          checked: false,
          value: `${detail.name} ${detail.link}`,
        };
        details.checklist!.push(newChecklistEntry);
      });
      let transformedCard: Card = {
        id: uuidv4(),
        cardName: subtopic.title,
        creationDate: new Date(),
        order: i + 1,
        column: Columns.backlog,
        details: details,
      };

      transformedCards.push(transformedCard);
    });

    return transformedCards;
  };

  const downloadBoard = () => {
    const transformedCards = transformSubtopicsToCards();
    handleAddAIBoard(boardName, transformedCards);
    navigate("/home");
  };

  const createBoardIcon = useBreakpointValue({
    base: undefined,
    md: <FaWandMagicSparkles />,
  });
  const cancelIcon = useBreakpointValue({ base: undefined, md: <CloseIcon /> });

  return (
    <Container maxW="5xl" py={16} px={{ md: "8", sm: "4" }}>
      <Flex direction="column" mb={4}>
        <Heading size="md" my="4">
          Step 1: Pick a topic
        </Heading>
        <Flex direction="row" mb={4}>
          <Input
            p={2}
            borderRadius="md"
            mr={2}
            w="70%"
            borderColor={"gray.400"}
            borderWidth={2}
            placeholder="What do you want to learn about?"
            value={boardTopic}
            onChange={handleChangeTopic}
            maxLength={30}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitTopic();
              }
            }}
            aria-label="Board Name Input"
          />
          <Button
            w="18%"
            mr={2}
            bg="teal"
            color="white"
            px={2}
            py={2}
            leftIcon={createBoardIcon}
            onClick={handleSubmitTopic}
            aria-label="Create New Board Button"
            isLoading={loading} // Disable the button while loading
          >
            {createBoardIcon ? "Generate Board" : <FaWandMagicSparkles />}
          </Button>
          <Button
            w="12%"
            bg="red.400"
            color="white"
            leftIcon={cancelIcon}
            onClick={() => setBoardTopic("")}
            aria-label="Cancel Button"
          >
            {cancelIcon ? "Cancel" : <CloseIcon />}
          </Button>
        </Flex>

        <Heading size={"sm"} as={"h4"} mb={4}>
          How in-depth do you want to go?
        </Heading>
        <RadioGroup
          onChange={handleUnderstandingLevelChange}
          value={understandingLevel}
        >
          <Stack direction="row" spacing={4}>
            <Radio value="brief">Brief Overview</Radio>
            <Radio value="good">Good Understanding</Radio>
            <Radio value="in-depth">In-Depth Analysis</Radio>
          </Stack>
        </RadioGroup>

        <Button
          w="100%"
          bg="green.500"
          color="white"
          isDisabled={subtopics.length === 0}
          leftIcon={<DownloadIcon />}
          onClick={() => downloadBoard()}
          aria-label="Download Board"
          mt={2}
          _hover={{ bg: "green.400" }}
        >
          Download Board
        </Button>

        <ErrorMessage message={error} />
      </Flex>

      {loading && (
        <Flex justifyContent="center" alignItems="center" mt={8}>
          <Spinner size="xl" />
        </Flex>
      )}

      {!loading && subtopics.length > 0 && (
        <Box mt={4}>
          <Accordion allowMultiple>
            {subtopics.map((subtopic, index) => (
              <AccordionItem
                key={index}
                borderWidth={1}
                borderRadius="md"
                p={4}
              >
                <Heading as="h4" size="md" mb={2}>
                  {subtopic.title}
                </Heading>
                <Text mb={4}>{subtopic.summary}</Text>
                {!subtopic.detail_list && (
                  <>
                    <Button
                      onClick={() => handleFetchSubtopicDetails(subtopic.title)}
                      isLoading={loadingSubtopic === subtopic.title}
                      mr={4}
                    >
                      Get Details
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      color="white"
                      bg={"red.400"}
                    >
                      Delete
                    </Button>
                  </>
                )}

                {subtopic.detail_list && (
                  <>
                    <Flex direction={"row"}>
                      <AccordionButton bg="gray.100" borderRadius={"md"} mr={4}>
                        <Box flex="1" textAlign="left">
                          View Details
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <Button
                        leftIcon={<DeleteIcon />}
                        color="white"
                        bg={"red.400"}
                      >
                        Delete
                      </Button>
                    </Flex>
                    <AccordionPanel px={0}>
                      <Flex direction="column" gap={3}>
                        {subtopic.detail_list.map(
                          (detail: Detail, subIndex: any) => (
                            <Box
                              key={subIndex}
                              p={3}
                              borderWidth={1}
                              borderRadius="md"
                            >
                              <Heading as="h6" size="sm">
                                {detail.name}
                              </Heading>
                              <Text mt={1}>{detail.summary}</Text>
                              {detail.link ? (
                                <LinkPreview url={detail.link} />
                              ) : (
                                `This will be a ${detail.format} resource`
                              )}
                            </Box>
                          )
                        )}
                        <Button
                          onClick={() =>
                            handleFetchMoreSubtopicDetails(subtopic.title)
                          }
                          isLoading={loadingSubtopic === subtopic.title}
                        >
                          Find More Information
                        </Button>
                      </Flex>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      )}
    </Container>
  );
};

export default Generate;
