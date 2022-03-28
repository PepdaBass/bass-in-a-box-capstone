import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate } from "react-router-dom";
import "./PlanSelectionPage.css";


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
            navigate("/shipping");
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
        <div className="box-plan-container">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row align-items-start">
                        {firstFilter.map((selection) => (
                            <div className="col border" key={selection.id}>
                            <p>
                                <span className="bold">{selection.category}</span> <br />
                                {selection.sub_category} <br />
                                ${selection.annual_price} <br />
                                {selection.contents} <br />
                            </p>
                            <br />
                                <input type="hidden" name="box_plan" value={selection.id} />
                            <button className="box-button" type="button" onClick={() => {handleInputChange({persist:() => {}, target:{name:"box_plan", value:selection.id}})}}>Select</button>
                            </div>
                        ))}
                        </div>
                        <div className="row align-items-center">
                        {surveyData.skillLevel === "Beginner" ? secondFilter.map((selection) => (
                        <div className="col border" key={selection.id}>
                            <p>
                            <span className="bold">{selection.category}</span> <br />
                            {selection.sub_category} <br />
                            ${selection.price} <br />
                            {selection.contents} <br />
                        </p>
                        <br />
                        <input type="hidden" name="total_beginner_package" value={selection.id} />
                            <button className="plan-button" type="button" onClick={() => {handleInputChange({persist:() => {}, target:{name:"total_beginner_package", value:selection.id}})}}>Select</button>
                        </div>
                        ))
                        : 
                        <div>
                        <p></p>
                    </div>}
                        {thirdFilter.map((selection) => (
                            <div className="col border" key={selection.id}>
                            <p>
                            <span className="bold">{selection.category}</span> <br />
                                {selection.sub_category} <br />
                                ${selection.annual_price} <br />
                            </p>
                            <br />
                                <input type="hidden" name="self_teach_plan" value={selection.id} />
                            <button className="plan-button" type="button" onClick={() => {handleInputChange({persist:() => {}, target:{name:"self_teach_plan", value:selection.id}})}}>Select</button>
                            </div>
                        ))}
                        <div className="col border">
                            <p>
                                You can choose one box plan and, if you wish, add the beginner box
                                as well as the online instruction package!
                            </p>
                             <p>
                                Click checkout to proceed!
                            </p>
                            <button className="plan-button" type="submit">Checkout</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default PlanSelectionPage;