import React, { useEffect } from "react";
import Profile from "../components/Profile";
import PassChange from "../components/PassChange";
import UserTemplatesGrid from "../components/UserTemplatesGrid";
import { useBoard } from "../context/BoardContext";
import BoardComponent from "../components/BoardComponent";
import { useTemplates } from "../context/TemplateContext";
import Analytics from "../components/AnalyticsComponent";
import TitleComponent from "../components/TitleComponent";

const Account: React.FC = () => {
  const { selectedBoard, setCurrentPage, selectedCard, updateTitleText } =
    useBoard();

  const { setTemplateIsOwned } = useTemplates();

  useEffect(() => {
    setCurrentPage("Account");
  }, []);

  useEffect(() => {
    updateTitleText();
    if (selectedBoard) {
      setTemplateIsOwned(true);
    } else {
      setTemplateIsOwned(false);
    }
  }, [selectedBoard, selectedCard]);

  return (
    <div className="container w-2/3 mx-auto flex flex-col items-center justify-center">
      <div className="flex items-center mt-12">
        <TitleComponent />
      </div>
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
          <Analytics />
        </>
      )}
    </div>
  );
};

export default Account;
