import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import HomePage from '../HomePage/HomePage';
import CustomerAccountsTable from '../../components/CustomerAccountsTable/CustomerAccountsTable';
import ProductLineChart from '../../components/ProductLineChart/ProductLineChart';
import "./EmployeeHomePage.css";


const EmployeeHomePage = ({ customers, boxPlans, selfTeachPlan, beginnerPackage }) => {
    const [user, token] = useAuth();
    const [employees, setEmployees] = useState([]);
    const [matchCustomerBoujee, setMatchCustomerBoujee] = useState([]);
    const [matchCustomerBasic, setMatchCustomerBasic] = useState([]);
    const [matchCustomerBudget, setMatchCustomerBudget] = useState([]);
    const [matchCustomerOnline, setMatchCustomerOnline] = useState([]);
    const [matchCustomerBeginner, setMatchCustomerBeginner] = useState([]);
  

    const userId = user.user_id || user.id;

    useEffect(() => {
        const fetchEmployees = async () => {
          try {
            let response = await axios.get("http://127.0.0.1:8000/api/employees/", {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            setEmployees(response.data);
          } catch (error) {
            console.error(error.message);
          }
        };
        fetchEmployees();
      }, []);
    
      const userEmployeeInfo = employees.filter(employee => employee.user.id === userId);


    return ( 
        <div className="container">
            {(user.is_staff === false) ? <HomePage /> :
            <div className="employee-div">
                <div className="container-fluid">
                  <div className="employee-info">
                    <h1>Home Page for {user.username}!</h1>
                    {userEmployeeInfo.map((field) => (
                    <div key={field.id} className="text-center">
                        <h3>Employee Information</h3>
                        <p>Name: <span className="fw-bold">{field.first_name} {field.last_name}</span> <br />
                        Department: <span className="fw-bold">{field.department}</span> <br />
                        Position: <span className="fw-bold">{field.position}</span> <br />
                        Telephone: <span className="fw-bold">{field.telephone}</span> <br /> </p>
                    </div>))}
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col align-self-start" id="tablechart">
                          <div className="table">
                            <CustomerAccountsTable customers={customers} 
                            boxPlans={boxPlans} 
                            beginnerPackage={beginnerPackage} 
                            selfTeachPlan={selfTeachPlan} 
                            setMatchCustomerBasic={setMatchCustomerBasic} 
                            setMatchCustomerBeginner={setMatchCustomerBeginner} 
                            setMatchCustomerBoujee={setMatchCustomerBoujee} 
                            setMatchCustomerBudget={setMatchCustomerBudget} 
                            setMatchCustomerOnline={setMatchCustomerOnline} 
                            matchCustomerBasic={matchCustomerBasic} 
                            matchCustomerBeginner={matchCustomerBeginner} 
                            matchCustomerBoujee={matchCustomerBoujee} 
                            matchCustomerBudget={matchCustomerBudget} 
                            matchCustomerOnline={matchCustomerOnline} />
                            </div>
                        </div>
                        <div className="col">
                            <ProductLineChart matchCustomerBasic={matchCustomerBasic} 
                            matchCustomerBeginner={matchCustomerBeginner} 
                            matchCustomerBoujee={matchCustomerBoujee} 
                            matchCustomerBudget={matchCustomerBudget} 
                            matchCustomerOnline={matchCustomerOnline} />
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}
export default EmployeeHomePage;