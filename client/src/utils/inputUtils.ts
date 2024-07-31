// inputUtils.ts
import DOMPurify from "dompurify";
import Filter from "bad-words";

// initialize the bad-words filter
const filter = new Filter() ;

// function to sanitize input
const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

// function to check for offensive words
const cleanInput = (input: string): string => {
  return filter.clean(input); // Return true if no profanity is found
}

// function to validate naming inputs and notes input
export const validateTextInput = (input: string): string | null => {
  const sanitizedInput = sanitizeInput(input).trim();
  if (sanitizedInput.length > 0) {
    const cleanAndSanitizedInput = cleanInput(sanitizedInput);
    return cleanAndSanitizedInput;
  } else {
    return null;
  }
}