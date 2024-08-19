import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Image, Heading, Text, Center } from "@chakra-ui/react";

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();

  return user ? (
    <Center my={4} data-testid="profile">
      <Box textAlign="center">
        <Image
          src={user.picture}
          alt={user.name}
          borderRadius="full"
          boxSize="96px"
          mx="auto"
          mb={4}
        />
        <Heading size="lg" fontWeight="bold">
          {user.nickname}
        </Heading>
        <Text fontSize="sm">{user.email}</Text>
      </Box>
    </Center>
  ) : (
    <Center mt="25%">
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
        User not authenticated
      </Text>
    </Center>
  );
};

export default Profile;
