import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import MonthlyBill from "../../components/MonthlyBill/MonthlyBill";
import EmployeeHomePage from "../EmployeeHomePage/EmployeeHomePage";

const HomePage = ({ customers, setCustomers, boxPlans, selfTeachPlan, beginnerPackage }) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [totalPayments, setTotalPayments] = useState([]);
  const [customerBoxPlan, setCustomerBoxPlan] = useState([]);
  const [customerSelfTeach, setCustomerSelfTeach] = useState([]);
  const [customerBeginnerPackage, setCustomerBeginnerPackage] = useState([]);
  // const [userCustomerInfo, setUserCustomerInfo] = useState([]);

  const userId = user.user_id || user.id;



  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/employee/all_customers/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCustomer();
  }, []);


  const userCustomerInfo = customers.filter(customer => customer.user.id === userId);


  return (
    <div className="container">
      {(user.is_staff === true) ? <EmployeeHomePage customers={customers} boxPlans={boxPlans} beginnerPackage={beginnerPackage} selfTeachPlan={selfTeachPlan} /> :
      <div>
      <h1>Home Page for {user.username}!</h1>
      {userCustomerInfo.map((field) => (
          <p key={field.id}>
            Customer Information <br />
            Name: {field.first_name} {field.last_name} <br />
            Address: {field.street_address} <br />
            {field.city}, {field.state} {field.zip_code} <br />
            Telephone: {field.telephone} <br />
          </p>
      ))}
          <MonthlyBill 
          totalPayments={totalPayments} 
          setTotalPayments={setTotalPayments} 
          userCustomerInfo={userCustomerInfo}
          customerBoxPlan={customerBoxPlan}
          setCustomerBoxPlan={setCustomerBoxPlan}
          customerSelfTeach={customerSelfTeach}
          setCustomerSelfTeach={setCustomerSelfTeach}
          customerBeginnerPackage={customerBeginnerPackage}
          setCustomerBeginnerPackage={setCustomerBeginnerPackage}
          customers={customers} />
      <Link to="/create_customer">
        <button>Finish Registration</button>
      </Link>
      <Link to="/take_survey">
        <button>Take Survey</button>
      </Link>
      </div>}
    </div>
  );
};

export default HomePage;
