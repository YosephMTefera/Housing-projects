import React from "react";
import Login from "./Login";
import Navbar from "./../Navbar";
import BottomNav from "./BottomNav";

function LoginContainer() {
  return (
    <div>
      <Navbar />
      <BottomNav />
      <Login />
    </div>
  );
}

export default LoginContainer;
