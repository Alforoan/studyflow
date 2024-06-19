import React from "react";
import Profile from "../components/Profile";
import PassChange from "../components/PassChange";

const Account: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primaryText mb-4 text-center">
        Account
      </h1>
      <Profile />
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
    </div>
  );
};

export default Account;
