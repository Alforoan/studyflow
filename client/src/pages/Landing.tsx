import React from "react";
import StackedCards from "../components/StackedCards";
import { useAuth0 } from "@auth0/auth0-react";
import { Helmet } from "react-helmet-async";
import ButtonComponent, { ButtonStyle } from "../components/ButtonComponent";

const Landing: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container mx-auto p-8">
      <Helmet>
        <title>Welcome to StudyFlow - Organize and Track Your Learning</title>
      </Helmet>

      {/* Skip to content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      <main id="main-content" role="main" aria-label="Main content">
        {/* Call to action */}
        <div className="text-center my-8">
          <h1 className="text-2xl lg:text-4xl font-bold font-primary text-primaryText dark:text-dark-primaryText">
            Unlock focused learning. Start your personal{" "}
            <span className="italic">StudyFlow</span> today.
          </h1>
          <div className="text-center my-8">
            {" "}
            {/* Call to action section */}
            <ButtonComponent
              click={() => loginWithRedirect()}
              buttonType={ButtonStyle.OuterPrimary}
              text="Sign Up Here"
              additionalStyles="mx-auto"
            />
          </div>
        </div>

        {/* Features and Stacked Cards on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:justify-items-center lg:mt-40">
          {/* Feature descriptions */}
          <div className="mx-auto max-w-md lg:max-w-none">
            <div className="mt-4 space-y-8">
              <div className="p-4 bg-secondaryElements rounded-lg shadow">
                <h2 className="font-semibold font-primary text-primaryText text-xl">
                  Organize notes and links for anything you want to study
                </h2>
              </div>
              <div className="p-4 bg-secondaryElements rounded-lg shadow">
                <h2 className="font-semibold font-primary text-primaryText text-xl">
                  Track your progress and stay on track
                </h2>
              </div>
            </div>
          </div>

          {/* Stacked Cards Component*/}
          <div className="lg:w-full">
            <StackedCards />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
