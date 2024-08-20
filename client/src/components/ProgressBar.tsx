import { Box, Text } from "@chakra-ui/react";

import React from "react";

interface ProgressBarProps {
  estimatedTimeTotal: number;
  completedTimeTotal: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  estimatedTimeTotal,
  completedTimeTotal,
}) => {
  const progress =
    estimatedTimeTotal > 0
      ? (completedTimeTotal / estimatedTimeTotal) * 100
      : 0;

  return (
    <Box w="75%" mx="auto" mt={4} textAlign="center">
      <Box
        position="relative"
        height="5"
        bg="gray.200"
        borderRadius="md"
        overflow="hidden"
        mb={2}
      >
        <Box
          width={`${progress}%`}
          height="100%"
          bg="blue.500"
          transition="width 0.75s ease"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress"
        />
      </Box>
      <Text color="gray.700" _dark={{ color: "gray.200" }}>
        {Math.round(progress)}% completed
      </Text>
    </Box>
  );
};

export default ProgressBar;
