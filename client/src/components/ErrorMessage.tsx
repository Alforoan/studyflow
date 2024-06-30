import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? <p className="text-red-500 mt-2 text-center">{message}</p> : null;
};

export default ErrorMessage;