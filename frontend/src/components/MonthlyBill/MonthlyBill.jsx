import { React, useEffect } from 'react';
import axios from "axios";


const MonthlyBill = ({ customers, totalPayments, setTotalPayments, userCustomerInfo, customerBoxPlan, setCustomerBoxPlan, customerSelfTeach, setCustomerSelfTeach, customerBeginnerPackage, setCustomerBeginnerPackage }) => {
    
    

    let firstPriceTier = 0;
    let secondPriceTier = 0;
    let thirdPriceTier = 0;

    useEffect(() => {
        const fetchBoxPlans = async () => {
          try {
            let response = await axios.get(`http://127.0.0.1:8000/api/box_plan/${userCustomerInfo[0]?.box_plan}/`);
            setCustomerBoxPlan(response.data);
            console.log("customer box plan", response.data);
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchBoxPlans();
      }, [customers]);
    
    useEffect(() => {
    const fetchBeginnerPackages = async () => {
        try {
        let response = await axios.get(`http://127.0.0.1:8000/api/total_beginner_package/${userCustomerInfo[0]?.total_beginner_package}/`);
        setCustomerBeginnerPackage(response.data);
        console.log("customer beginner", response.data);
        } catch (error) {
        console.log(error.message);
        }
    };
    fetchBeginnerPackages();
    }, [customers]);
    
    useEffect(() => {
    const fetchSelfTeachPlans = async () => {
        try {
        let response = await axios.get(`http://127.0.0.1:8000/api/self_teach_plan/${userCustomerInfo[0]?.self_teach_plan}/`);
        setCustomerSelfTeach(response.data);
        console.log("customer self teach", response.data);
        } catch (error) {
        console.log(error.message);
        }
    };
    fetchSelfTeachPlans();
    }, [customers]);

    (customerBoxPlan.length > 0) ? (firstPriceTier = customerBoxPlan[0]?.annual_price) : (firstPriceTier) = 0;
    (customerSelfTeach.length > 0) ? (secondPriceTier = customerSelfTeach[0]?.annual_price): (secondPriceTier) = 0;
    (customerBeginnerPackage.length) > 0 ? (thirdPriceTier = customerBeginnerPackage[0]?.price) : (thirdPriceTier = 0);

    useEffect(() => {
      setTotalPayments(((firstPriceTier + secondPriceTier) / 12) + thirdPriceTier);
    }, [userCustomerInfo])

    

    console.log("first tier", firstPriceTier)
    console.log("second tier", secondPriceTier)
    console.log("third tier", thirdPriceTier)
    console.log("total payments", totalPayments)
    console.log("box plan", customerBoxPlan)
    console.log("self teach plan", customerSelfTeach)
    console.log("beginner plan", customerBeginnerPackage)
    console.log("user Customer info", userCustomerInfo)


    return ( 
        <div>
            {!(totalPayments >= 0) ?
             null :
             <p>Monthly charge: ${totalPayments}</p>}
        </div>
     );
}


 
export default MonthlyBill;