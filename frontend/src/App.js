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
import PlanSelectionPage from "./pages/PlanSelectionPage/PlanSelectionPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import useAuth from "./hooks/useAuth";


export default function App() {
  
  const [surveyData, setSurveyData] = useState([]);
  const [customers, setCustomers] = useState([]); 
  const [beginnerPackage, setBeginnerPackage] = useState([]);
  const [selfTeachPlan, setSelfTeachPlan] = useState([]);

  console.log("app survey data", surveyData)
  const [user, token] = useAuth();
  // const [customers, userId, userCustomerInfo] = HomePage();

  


  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage customers={customers} setCustomers={setCustomers} />
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
        <Route path="/select_plan" element={
        <PrivateRoute>
            <PlanSelectionPage customers={customers} surveyData={surveyData} beginnerPackage={beginnerPackage} setBeginnerPackage={setBeginnerPackage} selfTeachPlan={selfTeachPlan} setSelfTeachPlan={setSelfTeachPlan} />
        </PrivateRoute>} />
      </Routes>
    
    </div>
  );
}
