import { useBoard } from "../context/BoardContext";
import { v4 as uuidv4 } from "uuid";
import { useTemplates } from "../context/TemplateContext";

const DownloadTemplateComponent = () => {
  const { selectedBoard, handleDownloadTemplate, setIsToastSuccess, userBoards } = useBoard();
  const { setIsTemplate } = useTemplates();

  const handlePressDownload = () => {
    console.log(selectedBoard!.name);
    let isUniqueBoard = true;
    userBoards.forEach(board => {
      if(board.name === selectedBoard!.name){
        setIsToastSuccess('Error. You have a board with the same name.')
        setTimeout(() => {
          setIsToastSuccess("");
        }, 1000);
      }
      isUniqueBoard = false;
    })
    if(!isUniqueBoard){
      return;
    }

    handleDownloadTemplate({
      ...selectedBoard!,
      uuid: uuidv4(),
    });
    setIsTemplate(false);
  };
  return (
    <div className="flex">
      <button
        onClick={handlePressDownload}
        className="bg-secondaryElements text-primaryText px-4 py-2 rounded font-primary hover:text-primaryTextLighter"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadTemplateComponent;
