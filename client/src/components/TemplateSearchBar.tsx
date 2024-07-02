import React, { useState, useEffect } from "react";
import { useTemplates } from "../context/TemplateContext";

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
    <input
      type="text"
      value={searchString}
      onChange={handleChange}
      placeholder="Search templates..."
      className="p-2 border rounded mr-2 w-1/2"
    />
  );
};

export default TemplateSearchBar;
