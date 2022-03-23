// General Imports
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ContinueRegistrationPage from "./pages/ContinueRegistrationPage/ContinueRegistrationPage";
import SurveyPage from "./pages/SurveyPage/SurveyPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";


export default function App() {
  
  const [surveyData, setSurveyData] = useState([]);
  console.log(surveyData)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create_customer" element={
          <PrivateRoute>
            <ContinueRegistrationPage />
          </PrivateRoute>} />
        <Route path="/take_survey" element={
          <PrivateRoute>
             <SurveyPage setSurveyData={setSurveyData} />
          </PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}
