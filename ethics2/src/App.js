import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import handleJwtExpiration from "./utils/session-expiration";
import {ToastContainer} from 'react-toastify'

function App() {
  const token = sessionStorage.getItem("tID");
  useEffect(() => {
    if (token) {
      handleJwtExpiration(token);
    }
  }, [token]);
  return (
    <div className="App">
   <ToastContainer theme="light" limit={1}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;