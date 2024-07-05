import React, { useEffect } from "react";
import Profile from "../components/Profile";
import PassChange from "../components/PassChange";
import UserTemplatesGrid from "../components/UserTemplatesGrid";
import { useBoard } from "../context/BoardContext";
import BoardComponent from "../components/BoardComponent";
import { useTemplates } from "../context/TemplateContext";

const Account: React.FC = () => {
  const {
    selectedBoard,
    tileText,
    setTitleText,
    selectedCard,
    setSelectedCard,
    setSelectedBoard,
    updateTitleText,
  } = useBoard();

  const { setTemplateIsOwned } = useTemplates();

  useEffect(() => {
    setTitleText("Account");
  }, []);

  const handleGoBack = () => {
    if (selectedCard) {
      setSelectedCard(null);
    } else if (selectedBoard) {
      setSelectedBoard(null);
    }
  };

  useEffect(() => {
    updateTitleText();
    if (selectedBoard) {
      setTemplateIsOwned(true);
    } else {
      setTemplateIsOwned(false);
    }
  }, [selectedBoard, selectedCard]);

  return (
    <div className="container w-2/3 mt-12 mb-4 mx-auto flex flex-col items-center justify-center">
      <h1
        className="cursor-pointer text-3xl font-bold font-primary mr-4"
        onClick={() => handleGoBack()}
      >
        {tileText}
      </h1>
      {selectedBoard ? (
        <BoardComponent />
      ) : (
        <>
          <Profile />

          <h2 className="text-xl font-bold text-primaryText mt-8 text-center">
            Your Templates
          </h2>
          <UserTemplatesGrid />
          <div className="w-full flex justify-center mt-8">
            <div className="w-full max-w-screen-lg bg-secondaryElements rounded-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-primaryText mb-4 text-center">
                Account Actions
              </h2>
              <div className="flex flex-col items-center">
                <PassChange />
                {/* Add more account actions here */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
