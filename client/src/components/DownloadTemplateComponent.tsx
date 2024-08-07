import { useBoard } from "../context/BoardContext";
import { v4 as uuidv4 } from "uuid";
import { useTemplates } from "../context/TemplateContext";
import ButtonComponent, { ButtonStyle } from "./ButtonComponent";

const DownloadTemplateComponent = () => {
  const {
    selectedBoard,
    handleDownloadTemplate,
    setIsToastSuccess,
    userBoards,
  } = useBoard();
  const { setIsTemplate } = useTemplates();

  const handlePressDownload = () => {
    console.log(selectedBoard!.name);
    let isUniqueBoard = true;
    userBoards.forEach((board) => {
      if (board.name === selectedBoard!.name) {
        isUniqueBoard = false;
        setIsToastSuccess("Error. You have a board with the same name.");
        setTimeout(() => {
          setIsToastSuccess("");
        }, 1000);
      }
    });
    if (!isUniqueBoard) {
      return;
    } else {
      setIsToastSuccess("You have successfully downloaded the template.");
      setTimeout(() => {
        setIsToastSuccess("");
      }, 1000);
    }

    handleDownloadTemplate({
      ...selectedBoard!,
      uuid: uuidv4(),
    });
    setIsTemplate(false);
  };
  return (
    <div className="flex">
      <ButtonComponent
        click={handlePressDownload}
        buttonType={ButtonStyle.OuterSecondary}
        text={"Download Template"}
      />
    </div>
  );
};

export default DownloadTemplateComponent;
