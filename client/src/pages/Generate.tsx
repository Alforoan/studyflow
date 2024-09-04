import React, { useState } from "react";
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
  DownloadIcon,
  DeleteIcon,
  PlusSquareIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import ErrorMessage from "../components/ErrorMessage";
import { FaWandMagicSparkles } from "react-icons/fa6";

import { Card, CardDetails, ChecklistEntry, Columns } from "../types";
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
  // const [refineTopic, setrefineTopic] = useState<string>("");
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [understandingLevel, setUnderstandingLevel] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [gptJSONOutput, setGptJSONOutput] = useState(null); // can use for debugging don't actually need
  const [loadingSubtopic, setLoadingSubtopic] = useState<string | null>(null);

  const [loadingMoreSubtopics, setLoadingMoreSubtopics] =
    useState<boolean>(false);
  const [loadingMoreSubtopicDetails, setLoadingMoreSubtopicDetails] = useState<
    string | null
  >(null);

  const [boardName, setBoardName] = useState<string>("");

  const { handleAddAIBoard } = useBoard();

  const navigate = useNavigate();

  const handleChangeTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTopic(e.target.value);
  };
  // const handleChangeRefineTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  //   setrefineTopic(e.target.value);
  // };

  const handleUnderstandingLevelChange = (value: string) => {
    setUnderstandingLevel(value);
  };

  const resetState = () => {
    setSubtopics([]);
    setUnderstandingLevel("");
    setBoardName("");
    setBoardTopic("");
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
        console.log(gptJSONOutput);
        
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

  const handleFetchMoreSubtopics = async () => {
    setLoadingMoreSubtopics(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/subtopics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: boardTopic,
          num_subtopics: 3,
          existing_subtopics: subtopics.map((sub) => sub.title),
        }),
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
      setSubtopics((prev) => [...prev, ...fetchedSubtopics]);
      setError(null);
      setLoadingMoreSubtopics(false);

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

  const handleFetchMoreSubtopicDetails = async (subtopicTitle: string) => {
    console.log("Fetching details for subtopic:", subtopicTitle);
    setError(null);
    setLoadingMoreSubtopicDetails(subtopicTitle);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subtopic: subtopicTitle,
          existing_sub_subtopics: subtopics
            .find((sub) => sub.title === subtopicTitle)
            ?.detail_list?.map((detail) => detail.name),
        }),
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

        setSubtopics((prevSubtopics) =>
          prevSubtopics.map((subtopic) => {
            if (subtopic.title === subtopicTitle) {
              let updatedDetailList = [...subtopic.detail_list!];

              data.sub_subtopics.forEach((detail: any) => {
                const resourceData = resourcesData.find(
                  (resource: any) =>
                    resource.topic === `${subtopicTitle} ${detail.name}`
                );

                let updatedDetail = {
                  name: detail.name,
                  summary: detail.summary,
                  format: detail.format,
                  link: resourceData
                    ? resourceData.video_url || resourceData.article_url
                    : "No resource found",
                };

                const isDetailAlreadyAdded = updatedDetailList.some(
                  (existingDetail) => existingDetail.name === detail.name
                );

                if (!isDetailAlreadyAdded) {
                  updatedDetailList.push(updatedDetail);
                }
              });

              return {
                ...subtopic,
                detail_list: updatedDetailList,
              };
            }
            return subtopic;
          })
        );
      } else {
        throw new Error("Invalid JSON response from the API");
      }
      setError(null);
      setLoadingMoreSubtopicDetails(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteSubtopic = (subtopicTitle: string) => {
    console.log("!!", subtopicTitle);
    setSubtopics((prevSubtopics) =>
      prevSubtopics.filter((subtopic) => subtopic.title !== subtopicTitle)
    );
  };

  const handleDeleteSubtopicDetail = (
    subtopicTitle: string,
    detailName: string
  ) => {
    setSubtopics((prevSubtopics) =>
      prevSubtopics.map((subtopic) => {
        if (subtopic.title === subtopicTitle) {
          return {
            ...subtopic,
            detail_list: subtopic.detail_list!.filter(
              (detail) => detail.name !== detailName
            ),
          };
        }
        return subtopic;
      })
    );
  };

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
    <Container maxW="5xl" pt={4} pb={8} px={{ md: "8", sm: "4" }}>
      <Flex direction="column">
        {subtopics.length === 0 && (
          <>
            <Heading size="md" my="4">
              Step 1: Pick a topic
            </Heading>
            <Flex direction="row">
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
            <Text as="i" fontSize="sm" mt={1} mb={4}>
              Hint: The more specific you are the better the results{" "}
            </Text>
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
          </>
        )}

        {subtopics.length > 0 && !loading && (
          <>
            <Heading size="md" my="4">
              Step 2: Browse subtopics
            </Heading>
            <Text size="sm" mb={4}>
              Delete the topics you aren't interested in and explore more of
              what you want to learn. Dont worry if it's not perfect you can
              fully customize the board at any time.
            </Text>
            <Text size="sm" mb={4}>
              When you like what you see, download the board.
            </Text>
            <Flex direction="row" mb={4}>
              <Button
                w="70%"
                bg="green.500"
                color="white"
                leftIcon={<DownloadIcon />}
                onClick={() => downloadBoard()}
                aria-label="Download Board"
                mt={2}
                _hover={{ bg: "green.400" }}
                mr={2}
                isDisabled={
                  loadingMoreSubtopicDetails !== null ||
                  loadingSubtopic !== null
                }
              >
                {loadingMoreSubtopicDetails !== null || loadingSubtopic !== null
                  ? "Wait For Resources To Download"
                  : "Download Board"}
              </Button>
              <Button
                w="30%"
                bg="orange.500"
                color="white"
                leftIcon={<RepeatClockIcon />}
                onClick={() => resetState()}
                aria-label="Start Over"
                mt={2}
                _hover={{ bg: "orange.400" }}
              >
                Start Over
              </Button>
            </Flex>
          </>
        )}

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
                  <Flex direction={"row"}>
                    <Button
                      onClick={() => handleFetchSubtopicDetails(subtopic.title)}
                      isDisabled={loadingSubtopic === subtopic.title}
                      mr={4}
                      leftIcon={
                        loadingSubtopic === subtopic.title ? (
                          <Spinner size="sm" />
                        ) : undefined
                      }
                    >
                      {loadingSubtopic === subtopic.title
                        ? "Loading Resources"
                        : "Get Details"}
                    </Button>

                    <Button
                      leftIcon={<DeleteIcon />}
                      color="white"
                      bg={"red.400"}
                      onClick={() => handleDeleteSubtopic(subtopic.title)}
                    >
                      Delete
                    </Button>
                  </Flex>
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
                        onClick={() => handleDeleteSubtopic(subtopic.title)}
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
                              position="relative"
                            >
                              <Heading as="h6" size="sm">
                                {detail.name}
                              </Heading>
                              <Text pr={8} mt={1}>
                                {detail.summary}
                              </Text>
                              {detail.link ? (
                                <Link
                                  href={detail.link}
                                  isExternal
                                  color="blue.500"
                                  mt={1}
                                >
                                  <LinkPreview url={detail.link} />
                                </Link>
                              ) : (
                                `This will be a ${detail.format} resource`
                              )}
                              <Button
                                position="absolute"
                                top={2}
                                right={2}
                                color="gray.800"
                                bg={"white"}
                                size="sm"
                                onClick={() =>
                                  handleDeleteSubtopicDetail(
                                    subtopic.title,
                                    detail.name
                                  )
                                }
                              >
                                <CloseIcon />
                              </Button>
                            </Box>
                          )
                        )}
                        <Button
                          onClick={() =>
                            handleFetchMoreSubtopicDetails(subtopic.title)
                          }
                          isLoading={
                            loadingMoreSubtopicDetails === subtopic.title
                          }
                        >
                          Find More Resources On This Topic
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
      {subtopics.length > 0 && !loading && (
        <Button
          w="100%"
          bg="blue.500"
          color="white"
          leftIcon={<PlusSquareIcon />}
          isDisabled={loadingMoreSubtopics}
          onClick={() => handleFetchMoreSubtopics()}
          aria-label="Explore More Subtopics"
          mt={2}
          _hover={{ bg: "blue.400" }}
          isLoading={loadingMoreSubtopics}
        >
          Explore More Subtopics
        </Button>
      )}
      {/* This will display pre-search */}
      {/* {subtopics.length === 0 && !loading && (
        <Text mt={40} size="xl" textAlign="center">
          Try Searching For A Topic.
        </Text>
      )} */}
    </Container>
  );
};

export default Generate;
