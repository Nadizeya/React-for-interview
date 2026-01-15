import React from "react";

const User = ({ isValid }) => {
  return <div>{isValid ? "User is valid" : "User is invalid"}</div>;
};

export default User;
