import { useState } from "react";
import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import "./App.css"

export default function App() {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <>
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} 
      setUsername={setUsername}
      />
      {username && <p>Welcome!: {username}</p>}
    </>
  );
}
