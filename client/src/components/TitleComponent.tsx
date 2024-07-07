import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import EditBoardName from "./EditBoardName";
import { MdArrowBack } from "react-icons/md";

const TitleComponent = () => {
  const {
    selectedBoard,
    selectedCard,
    setSelectedBoard,
    setSelectedCard,
    titleText,
    updateTitleText,
    isSearching,
    setIsSearching,
  } = useBoard();

  const { isTemplate, setIsTemplate, templateIsOwned } = useTemplates();

  const handleGoBack = () => {
    if (selectedCard) {
      setSelectedCard(null);
    } else if (selectedBoard) {
      setSelectedBoard(null);
      if (isTemplate) {
        setIsTemplate(false);
      }
    }

    if (!selectedCard && !selectedBoard && isSearching) setIsSearching(false);
  };
  return (
    <>
      <h1
        className="cursor-pointer text-3xl font-bold font-primary mr-4"
        onClick={() => handleGoBack()}
        tabIndex={0}
        aria-label="Go Back"
      >
        <div className="flex items-center">
          {titleText.includes("&") ? (
            <>
              <MdArrowBack className="mr-2 text-2xl" />{" "}
              <span>{titleText.split("&")[1]}</span>
            </>
          ) : (
            titleText
          )}
        </div>
      </h1>

      {selectedBoard && !selectedCard && (!isTemplate || templateIsOwned) && (
        <>
          <EditBoardName
            onSuccess={(updatedName: string) => {
              setSelectedBoard((prevBoard) => {
                if (prevBoard) {
                  return { ...prevBoard, name: updatedName };
                }
                updateTitleText();
                return prevBoard;
              });
            }}
          />
        </>
      )}
    </>
  );
};

export default TitleComponent;
