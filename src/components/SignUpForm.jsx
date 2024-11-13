import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validations, setValidations] = useState({
    username: "",
    password: "",
  });

  const validateForms = () => {
    let isValid = true;
    let errors = {
      username: "",
      password: "",
    };

    if (username.length < 8) {
      isValid = false;
      errors.username = "Requirement not met: must be at least 8 characters!";
    }
    if (password.length < 6) {
      isValid = false;
      errors.password = "Requirement not met: must be at least 6 characters!";
    }
    setValidations(errors);
    return isValid;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForms()) {
      setError("");
      return;
    }
    setError(null);

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const result = await response.json();
      setToken(result.token);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          {validations.username && (
            <p className="error.text">{validations.username}</p>
          )}
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {validations.password && (
            <p className="error-text">{validations.password}</p>
          )}
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}
