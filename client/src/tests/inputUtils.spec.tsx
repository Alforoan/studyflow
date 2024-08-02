import { validateTextInput } from "../utils/inputUtils";

// Sample offensive words
const offensiveWords = [
  'fuck', 'shit', 'cunt'
];

describe("validateTextInput", () => {
  it("should pass clean text input", () => {
    expect(validateTextInput("Hello world")).toEqual("Hello world");
    expect(validateTextInput("Study Algorithms")).toEqual("Study Algorithms");
  });

  it("should censor text input with offensive words", () => {
    offensiveWords.forEach(word => {
      expect(validateTextInput(word)).toEqual("****");
    });
  });

  it("should remove text input with HTML tags", () => {
    expect(validateTextInput("<script>alert('XSS');</script>")).toEqual(null);
    expect(validateTextInput("invalid <input>")).toEqual("invalid");
    expect(validateTextInput("<b>Hello!</b>")).toEqual("Hello!");
  });
});