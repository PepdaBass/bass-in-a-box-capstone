import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate } from "react-router-dom";


const PlanSelectionPage = ({ surveyData, customers, boxPlans, beginnerPackage, selfTeachPlan }) => {

    const [user, token] = useAuth();
    const userId = user.user_id || user.id;
    const userCustomerInfo = customers.find(customer => customer.user.id === userId)
    const [formData, handleInputChange, handleSubmit] = useCustomForm(userCustomerInfo, addPlanToCustomer);

    let customerId = customers.filter(customer => customer.user.id === userId);
    console.log("customer ID", customerId[0]?.user.id);

    const navigate = useNavigate();


    async function addPlanToCustomer() {
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/customer/edit/${customerId[0]?.id}/`, formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log(response);
            console.log("put", formData)
            navigate("/");
        }
        catch (error) {
            console.log(error.message);
        }
    }


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