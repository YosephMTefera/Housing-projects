import {useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import handleJwtExpiration from "./utils/session-expiration";

function App() {
  const token = sessionStorage?.getItem("tID");
  useEffect(() => {
    if (token) {
      handleJwtExpiration(token);
    }
  }, [token]);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route element={<ProtectedRoutes token={token} />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
