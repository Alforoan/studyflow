import React, { useState, useEffect } from "react";
import { useTemplates } from "../context/TemplateContext";
import { Flex, Input } from "@chakra-ui/react";

const TemplateSearchBar = () => {
  const { handleUpdateSearchQuery } = useTemplates();
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      handleUpdateSearchQuery(searchString);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchString, handleUpdateSearchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <Flex justify="center" align="center" w="100%" pt={12} pb={4}>
      <Input
        type="text"
        value={searchString}
        onChange={handleChange}
        placeholder="Search templates..."
        aria-label="Search templates"
        size="md"
        style={{ border: "2px solid #a0aec0" }}
      />
    </Flex>
  );
};

export default TemplateSearchBar;
