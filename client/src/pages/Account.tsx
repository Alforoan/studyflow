import React, { useEffect } from "react";
import Profile from "../components/Profile";
import PassChange from "../components/PassChange";
import UserTemplatesGrid from "../components/UserTemplatesGrid";
import { useBoard } from "../context/BoardContext";
import BoardComponent from "../components/BoardComponent";
import { useTemplates } from "../context/TemplateContext";
import Analytics from "../components/AnalyticsComponent";
import TitleComponent from "../components/TitleComponent";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import DarkModeToggle from "../components/DarkModeToggle";

const Account: React.FC = () => {
  const {
    selectedBoard,
    setCurrentPage,
    selectedCard,
    updateTitleText,
    isLoading,
  } = useBoard();

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
      <Helmet>
        <title>StudyFlow - My Account</title>
      </Helmet>

      <div className="flex items-center mt-12">
        <TitleComponent />
      </div>
      {selectedBoard ? (
        <BoardComponent />
      ) : (
        <>
          {isLoading ? (
            <Loading isLoading={isLoading}/>
          ) : (
            <main>
              <Profile />
              <h2 className="text-xl font-bold text-primaryText mt-8 text-center  dark:text-dark-primaryText">
                Your Templates
              </h2>
              <UserTemplatesGrid />
              <div className="w-full flex justify-center mt-8">
                <div className="w-full max-w-screen-lg bg-secondaryElements rounded-lg p-6 mt-8">
                  <h2 className="text-xl font-bold text-primaryText mb-4 text-center">
                    Account Actions
                  </h2>
                  <div className="flex flex-col md:flex-row items-centerflex items-center justify-evenly space-y-4 md:space-y-0 md:space-x-4">
                    {/* Add more account actions here */}
                    <PassChange />
                    <DarkModeToggle />
                  </div>
                </div>
              </div>
              <Analytics />
            </main>
          )}
        </>
      )}
    </div>
  );
};

export default Account;
