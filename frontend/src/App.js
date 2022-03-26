// General Imports
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ContinueRegistrationPage from "./pages/ContinueRegistrationPage/ContinueRegistrationPage";
import SurveyPage from "./pages/SurveyPage/SurveyPage";
import PlanSelectionPage from "./pages/PlanSelectionPage/PlanSelectionPage";
import EmployeeHomePage from "./pages/EmployeeHomePage/EmployeeHomePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import useAuth from "./hooks/useAuth";


export default function App() {
  
  const [user, token] = useAuth();
  const [surveyData, setSurveyData] = useState([]);
  const [customers, setCustomers] = useState([]); 
  const [boxPlans, setBoxPlans] = useState([]);
  const [beginnerPackage, setBeginnerPackage] = useState([]);
  const [selfTeachPlan, setSelfTeachPlan] = useState([]);



  useEffect(() => {
    const fetchBoxPlans = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/box_plans/");
        setBoxPlans(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBoxPlans();
  }, []);

  useEffect(() => {
    const fetchBeginnerPackages = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/total_beginner_packages/");
        setBeginnerPackage(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBeginnerPackages();
  }, []);

  useEffect(() => {
    const fetchSelfTeachPlans = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/self_teach_plans/");
        setSelfTeachPlan(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSelfTeachPlans();
  }, []);

 

  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
                <HomePage customers={customers} setCustomers={setCustomers} boxPlans={boxPlans} beginnerPackage={beginnerPackage} selfTeachPlan={selfTeachPlan} />
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
            <PlanSelectionPage customers={customers} surveyData={surveyData} boxPlans={boxPlans} beginnerPackage={beginnerPackage} selfTeachPlan={selfTeachPlan} />
        </PrivateRoute>} />
      </Routes>
    
    </div>
  );
}
