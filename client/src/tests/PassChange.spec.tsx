// PassChange.spec.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import PassChange from "../components/PassChange";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    user: { email: "test@example.com" },
  }),
}));

jest.mock("axios");

describe("PassChange Component", () => {
  it("handles password reset successfully", async () => {
    // Mock axios post success
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    render(<PassChange />);

    const resetButton = screen.getByText("Reset password");
    fireEvent.click(resetButton);

    expect(axios.post).toHaveBeenCalledWith(
      `https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/change_password`,
      {
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        email: "test@example.com",
        connection: "Username-Password-Authentication",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check for password change email sent message
    await waitFor(() => {
      const successMessage = screen.getByText("Password reset email sent!");
      expect(successMessage).toBeInTheDocument();
    });
  });

  it("handles password reset failure", async () => {
    // Mock axios post failure
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<PassChange />);

    const resetButton = screen.getByText("Reset password");
    fireEvent.click(resetButton);

    // Check for message if unable to change password
    await waitFor(() => {
      const errorMessage = screen.getByText("Unable to reset password.");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
