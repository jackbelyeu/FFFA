import { useState, FormEvent } from "react";

// Assuming the onSubmit prop expects a FormEvent as argument
interface SecurityKeyFormProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const SecurityKeyForm = ({ onSubmit }: SecurityKeyFormProps) => {
  const [securityKey, setSecurityKey] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSecurityKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecurityKey(event.target.value);
  };

  // The handleSubmit now just calls the passed onSubmit prop with the event
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can perform your validation here before calling the passed onSubmit function
    if (securityKey === "1234") {
      onSubmit && onSubmit(event); // Call the onSubmit prop function with the event
    } else {
      setError("Incorrect security key");
    }
  };

  return (
    <div>
      <h1>Only for Organizer</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="securityKey">Security Key:</label>
        <input
          type="text"
          id="securityKey"
          name="securityKey"
          value={securityKey}
          onChange={handleSecurityKeyChange}
          placeholder="Enter your security key"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SecurityKeyForm;
