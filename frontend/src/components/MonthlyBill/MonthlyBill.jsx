import React, { useEffect } from 'react';
import axios from "axios";


const MonthlyBill = ({ totalPayments, setTotalPayments, userCustomerInfo, customerBoxPlan, setCustomerBoxPlan, customerSelfTeach, setCustomerSelfTeach, customerBeginnerPackage, setCustomerBeginnerPackage }) => {

    const updateCustomerBoxPlan = (plan) => {
        setCustomerBoxPlan(plan);
    }
    const updateCustomerSelfTeach = (plan) => {
        setCustomerSelfTeach(plan);
    }
    const unpdateCustomerBeginnerPackage = (plan) => {
        setCustomerBeginnerPackage(plan);
    }

    setTotalPayments((customerBoxPlan + customerSelfTeach + customerBeginnerPackage) / 12);

    useEffect(() => {
        const fetchBoxPlans = async () => {
          try {
            let response = await axios.get(`http://127.0.0.1:8000/api/box_plan/${userCustomerInfo.box_plan}/`);
            updateCustomerBoxPlan(response.data);
            console.log("response", response.data);
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchBoxPlans();
      }, [userCustomerInfo]);
    
    useEffect(() => {
    const fetchBeginnerPackages = async () => {
        try {
        let response = await axios.get(`http://127.0.0.1:8000/api/total_beginner_package/${userCustomerInfo.total_beginner_package}/`);
        unpdateCustomerBeginnerPackage(response.data);
        console.log("response", response.data);
        } catch (error) {
        console.log(error.message);
        }
    };
    fetchBeginnerPackages();
    }, [userCustomerInfo]);

    useEffect(() => {
    const fetchSelfTeachPlans = async () => {
        try {
        let response = await axios.get(`http://127.0.0.1:8000/api/self_teach_plan/${userCustomerInfo.self_teach_plan}/`);
        updateCustomerSelfTeach(response.data);
        console.log("response", response.data);
        } catch (error) {
        console.log(error.message);
        }
    };
    fetchSelfTeachPlans();
    }, [userCustomerInfo]);

    return ( 
        <div>
            <p>
                ${totalPayments}
            </p>
        </div>
     );
}


 
export default MonthlyBill;