import { React, useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";


const PlanSelectionPage = ({ surveyData, customers, beginnerPackage, setBeginnerPackage, selfTeachPlan, setSelfTeachPlan }) => {

    const [user, token] = useAuth();
    const [boxPlans, setBoxPlans] = useState([]);
    
    const userId = user.user_id || user.id;
    const userCustomerInfo = customers.find(customer => customer.user.id === userId)
    console.log("customer info", userCustomerInfo)
    console.log(customers)

    const [formData, handleInputChange, handleSubmit] = useCustomForm(userCustomerInfo, addPlanToCustomer);

    
  
    const updateBoxPlanInfo = (boxPlanData) => {
        setBoxPlans(boxPlanData);
    }

    const updateBeginnerPackageInfo = (beginnerPackageData) => {
      setBeginnerPackage(beginnerPackageData);
    }

    const updateSelfTeachPlanInfo = (selfTeachData) => {
      setSelfTeachPlan(selfTeachData);
    }

    let customerId = customers.filter(customer => customer.user.id === userId);

    async function addPlanToCustomer() {
        try {
            // let response = await axios.put(`http://127.0.0.1:8000/api/customer/edit/${customerId.user.id}`, formData, {
            //     headers: {
            //         Authorization: "Bearer " + token,
            //     },
            // });
            // console.log(response);
            console.log("put", formData)
        }
        catch (error) {
            console.log(error.message);
        }
    }

    // const handleClick = (event) => {
    //     event.preventDefault();
    //     addPlanToCustomer();
    // }

    console.log("survey data", surveyData);

    useEffect(() => {
        const fetchBoxPlans = async () => {
          try {
            let response = await axios.get("http://127.0.0.1:8000/api/box_plans/");
            updateBoxPlanInfo(response.data);
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
            updateBeginnerPackageInfo(response.data);
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
            updateSelfTeachPlanInfo(response.data);
            console.log("response", response.data);
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchSelfTeachPlans();
      }, []);

      let firstFilter = boxPlans.filter(datumOne => (datumOne.sub_category === (surveyData.instrumentType + " - " + surveyData.musicStyle)));
      let secondFilter = beginnerPackage.filter(datumTwo => (datumTwo.sub_category === (surveyData.instrumentType + " - " + surveyData.musicStyle)));
      let thirdFilter = selfTeachPlan.filter(datumThree => (datumThree.sub_category === (surveyData.instrumentType + " - " + surveyData.musicStyle)));

      console.log("first filter", firstFilter);
      console.log("second filter", secondFilter);
      console.log("third filter", thirdFilter)

    return ( 
        <form onSubmit={handleSubmit}>
            {firstFilter.map((selection) => (
                <div key={selection.id}>
                <p>
                    {selection.category} <br />
                    {selection.sub_category} <br />
                    ${selection.annual_price} <br />
                    {selection.contents} <br />
                </p>
                <br />
                    <input type="hidden" name="box_plan" value={selection.id} />
                <button type="button" onClick={() => {handleInputChange({persist:() => {}, target:{name:"box_plan", value:selection.id}})}}>Select</button>
                </div>
            ))}
            {surveyData.skillLevel === "Beginner" ? secondFilter.map((selection) => (
              <div key={selection.id}>
                <p>
                {selection.category} <br />
                {selection.sub_category} <br />
                ${selection.price} <br />
                {selection.contents} <br />
            </p>
            <br />
            <input type="hidden" name="total_beginner_package" value={selection.id} />
                <button type="button" onClick={() => {handleInputChange({persist:() => {}, target:{name:"total_beginner_package", value:selection.id}})}}>Select</button>
              </div>
            ))
             : 
             <div>
             <p></p>
             </div>}
             {thirdFilter.map((selection) => (
                <div key={selection.id}>
                <p>
                    {selection.category} <br />
                    {selection.sub_category} <br />
                    ${selection.annual_price} <br />
                </p>
                <br />
                    <input type="hidden" name="self_teach_plan" value={selection.id} />
                <button type="button" onClick={() => {handleInputChange({persist:() => {}, target:{name:"self_teach_plan", value:selection.id}})}}>Select</button>
                </div>
            ))}
            <button type="submit">Checkout</button>
        </form>
     );
}
 
export default PlanSelectionPage;