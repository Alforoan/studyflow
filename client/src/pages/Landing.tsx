import React from "react";
import StackedCards from "../components/StackedCards";
import { useAuth0 } from "@auth0/auth0-react";


const Landing: React.FC = () => {

  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container mx-auto p-8">
      {/* Call to action */}
      <div className="text-center my-8">
        <h1 className="text-2xl lg:text-4xl font-bold font-primary text-primaryText">
          Unlock focused learning. Start your personal{" "}
          <span className="italic">StudyFlow</span> today.
        </h1>
        <div className="text-center my-8"> {/* Call to action section */}
          <button
            onClick={() => loginWithRedirect()}
            className="bg-secondaryElements px-4 py-2 border rounded-md hover:text-primaryTextLighter text-primaryText"
          >
            Sign up here
          </button>
        </div>
      </div>

      {/* Features and Stacked Cards on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:justify-items-center lg:mt-40">
        {/* Feature descriptions */}
        <div className="mx-auto max-w-md lg:max-w-none">
          <div className="mt-4 space-y-8">
            <div className="p-4 bg-secondaryElements rounded-lg shadow">
              <p className="font-semibold font-primary text-primaryText text-xl">
                Organize notes and links for anything you want to study
              </p>
            </div>
            <div className="p-4 bg-secondaryElements rounded-lg shadow">
              <p className="font-semibold font-primary text-primaryText text-xl">
                Track your progress and stay on track
              </p>
            </div>
          </div>
        </div>

        {/* Stacked Cards Component*/}
        <div className="lg:w-full">
          <StackedCards />
        </div>
      </div>
    </div>
  );
};

export default Landing;