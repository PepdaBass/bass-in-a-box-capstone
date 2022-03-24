import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import MonthlyBill from "../../components/MonthlyBill/MonthlyBill";

const HomePage = ({ setCustomers, customers }) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const userId = user.user_id || user.id;
  const [totalPayments, setTotalPayments] = useState([]);
  const {customerBoxPlan, setCustomerBoxPlan} = useState([]);
  const {customerSelfTeach, setCustomerSelfTeach} = useState([]);
  const {customerBeginnerPackage, setCustomerBeginnerPackage} = useState([]);
  
  const updateCustomerInfo = (customerData) => {
    setCustomers(customerData)
  }

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/employee/all_customers/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        updateCustomerInfo(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCustomer();
  }, []);
  
  const userCustomerInfo = customers.filter(customer => customer.user.id === userId)

  return (
    <div className="container">
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
        setCustomerBeginnerPackage={setCustomerBeginnerPackage} />
      <Link to="/create_customer">
        <button>Finish Registration</button>
      </Link>
      <Link to="/take_survey">
        <button>Take Survey</button>
      </Link>
    </div>
  );
};

export default HomePage;
