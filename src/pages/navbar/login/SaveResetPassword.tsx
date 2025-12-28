import axios from "axios";
import React, { useState } from "react";
import "./forgetPassword.css";

const PasswordForm: React.FC<{ formType: "change" | "forget" }> = ({ formType }) => {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formType === "forget") {
        const response = await axios.post("http://localhost:8081/reset-password", {
          password: newPassword,
          token: "pass_token_here", // Get the token from the URL or state
        });
        console.log(response.data);

        // You can add logic here to show a success message to the user
      }
    } catch (error) {
      console.error("Error saving reset password:", error);
      // Handle errors and provide feedback to the user
    }
  };

  return (
    <div className="password-form-container">
      <h1 className="password-form-heading">
        {formType === "change" ? "Change Password" : "Forgot Password"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* ... */}
        {formType === "forget" && (
          <div className="form-group">
            <label className="form-label">New Password:</label>
            <input
              className="form-input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
        )}
        {/* ... */}
      </form>
    </div>
  );
};

export default PasswordForm;
