import { useEffect, useState } from "react";
import { useTemplates } from "../context/TemplateContext";
import {
  cssTemplate,
  htmlTemplate,
  internetTemplate,
  jsTemplate,
} from "../dummyData";
import TemplatePreview from "./TemplatePreview";
import { Template } from "../types";

const allTemplates = [internetTemplate, htmlTemplate, cssTemplate, jsTemplate];

const SearchGrid = () => {
  const { templateQuery } = useTemplates();
  const [templates, setTemplates] = useState<Template[]>(allTemplates);

  useEffect(() => {
    console.log(`SEARCHING for ${templateQuery}`);
  });

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
