import { useState, useEffect } from "react";

const Home = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="page">
      <h1>Home</h1>
      <p>{message}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  );
};

export default Home;
