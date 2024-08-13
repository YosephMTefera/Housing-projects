import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import LoginContainer from "./components/Auth/LoginContainer";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/Auth/SignIn";
import Signup from "./components/Auth/Signup";
import OTP from "./components/Auth/OTP";
import CheckStatus from "./components/NonAccount/CheckStatus";
import MakeAccusation from "./components/NonAccount/MakeAccusation";
import { useSelector } from "react-redux";
import ReadyToPrint from "./components/NonAccount/ReadyToPrint";
import { useEffect } from "react";
import handleJwtExpiration from "./utils/session-expiration";
import DivisionDetail from "./components/DivisionDetail";
import PageNotAuthFound from "./components/PageNotAuthFound";
// import DirectorateDetail from "./components/DirectorateDetail";


function App() {
  const token = sessionStorage?.getItem("tID");
  const applicationState = useSelector((state) => state?.application);
  useEffect(() => {
    if (token) {
      handleJwtExpiration(token);
    }
  }, [token]);

  return (
    <div className="w-[100%] h-[100vh]">
      
      <Routes>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Signup />} />
        {applicationState?.otpScreen && (
          <Route path="/email/verification" element={<OTP />} />
        )}
        <Route path="/checkstatus" element={<CheckStatus />} />
        <Route path="/makeaccusation" element={<MakeAccusation />} />
        <Route path="/print/:id" element={<ReadyToPrint />} />
        <Route path="/division/:id" element={<DivisionDetail />} />
        {/* <Route path="/directorate/:id" element={<DirectorateDetail />} /> */}
        <Route path="/" index element={<LoginContainer />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          
        </Route>
        <Route path="*" element={<PageNotAuthFound />}/>
      </Routes>
    </div>
  );
}

export default App;
