import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && user ? (
      <div className="text-center mt-32">
        <img
          src={user.picture}
          alt={user.name}
          className="rounded-full h-24 w-24 mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">{user.nickname}</h2>
        <p className="text-sm">{user.email}</p>
      </div>
    ) : (
      <div className="text-center mt-1/4">
        <p className="text-xl font-bold">User not authenticated</p>
      </div>
    )
  );
};

export default Profile;
