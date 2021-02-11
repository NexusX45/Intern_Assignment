import React from "react";
import Routes from "./routes";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <Routes user={user} setUser={setUser} />
    </div>
  );
}

export default App;
