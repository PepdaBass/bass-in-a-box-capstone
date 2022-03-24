import { React, useEffect } from 'react';
import axios from "axios";


const MonthlyBill = ({ totalPayments, setTotalPayments, userCustomerInfo, customerBoxPlan, setCustomerBoxPlan, customerSelfTeach, setCustomerSelfTeach, customerBeginnerPackage, setCustomerBeginnerPackage }) => {


    setTotalPayments(((customerBoxPlan[0].annual_price + customerSelfTeach[0].annual_price) / 12) + customerBeginnerPackage[0].price);

    useEffect(() => {
        const fetchBoxPlans = async () => {
          try {
            let response = await axios.get(`http://127.0.0.1:8000/api/box_plan/${userCustomerInfo[0].box_plan}/`);
            setCustomerBoxPlan(response.data);
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
        let response = await axios.get(`http://127.0.0.1:8000/api/total_beginner_package/${userCustomerInfo[0].total_beginner_package}/`);
        setCustomerBeginnerPackage(response.data);
        console.log("beginner", response.data);
        } catch (error) {
        console.error(error.message);
        }
    };
    fetchBeginnerPackages();
    }, []);

    useEffect(() => {
    const fetchSelfTeachPlans = async () => {
        try {
        let response = await axios.get(`http://127.0.0.1:8000/api/self_teach_plan/${userCustomerInfo[0].self_teach_plan}/`);
        setCustomerSelfTeach(response.data);
        console.log("response", response.data);
        } catch (error) {
        console.log(error.message);
        }
    };
    fetchSelfTeachPlans();
    }, []);

    return ( 
        <div>
            <p>
                Monthly charge: ${totalPayments}
            </p>
        </div>
     );
}


 
export default MonthlyBill;