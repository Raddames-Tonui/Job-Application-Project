import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";

function NoPage() {
  const { register } = useContext(UserContext);
  console.log(register());

  return (
    <div>
      <h2>No Page Found</h2>
    </div>
  );
}

export default NoPage;
