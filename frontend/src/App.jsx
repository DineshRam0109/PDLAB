import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Report from "./components/Admin/Report/Report";
import LoginPage from "./Components/Login/LoginPage";
import Admin from "./Components/Admin/Admin";
import Student from "./Components/Students/Student";
import Dashboard from "./Components/Dashboard/Dashboard";
import SuccessPage from "./Components/Students/Components/StudentProfile/Payment/SuccessPage";
import CancelPage from "./Components/Students/Components/StudentProfile/Payment/CancelPage";
import Master from "./Components/Admin/Master/Master";
import Ledger from "./Components/Admin/Ledger/Ledger";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Listen for changes in login state (useful for multiple tabs)
    const handleStorageChange = async () => {
     await setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      {/* Show Header as soon as the user logs in */}
      {isLoggedIn && <Header />}

      <Routes>
        {/* Public Route */}
        {!isLoggedIn && <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />}

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} setIsLoggedIn={setIsLoggedIn} />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/master" element={<Master />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/report" element={<Report />} />
        </Route>

        {/* Protected Route for Students */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<Student />} />
        </Route>

        {/* Payment Pages (Accessible to all logged-in users) */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />

        {/* Unauthorized Access - Redirect to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Admin />
    </BrowserRouter>
  );
}

export default App;
