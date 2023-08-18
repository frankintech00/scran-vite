import React, { useState, useEffect } from "react";

function TestComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  function createUser() {
    const newUser = {
      uid: "123",
      email: "test@example.com",
      cnoweihd7hei: [],
    };

    setUser(newUser);
    console.log("User created:", newUser);
  }

  return (
    <div>
      <button onClick={createUser}>Create User</button>
    </div>
  );
}

export default TestComponent;
