import React, { useState, useEffect } from 'react';

const CustomerAccountsTable = ({ customers, boxPlans, selfTeachPlan, beginnerPackage, setMatchCustomerBoujee, setMatchCustomerBasic, setMatchCustomerBudget, setMatchCustomerBeginner, setMatchCustomerOnline, matchCustomerBasic, matchCustomerBeginner, matchCustomerBoujee, matchCustomerBudget, matchCustomerOnline }) => {

    // const [totalCustomerAmount, setTotalCustomerAmount] = useState(0);
    const [boujeeBoxSuscriberPercent, setBoujeeBoxSubscriberPercent] = useState(0);
    const [basicBoxSuscriberPercent, setBasicBoxSubscriberPercent] = useState(0);
    const [budgetBoxSuscriberPercent, setBudgetBoxSubscriberPercent] = useState(0);
    const [onlinePortalSubscriberPercent, setOnlinePortalSubscriberPercent] = useState(0);
    const [plansTotalCost, setPlansTotalCost] = useState([]);

    const boujeeBoxes = boxPlans.filter(boxPlan => boxPlan.category === "Boujee Box")
    const basicBoxes = boxPlans.filter(boxPlan => boxPlan.category === "Basic Box")
    const budgetBoxes = boxPlans.filter(boxPlan => boxPlan.category === "Budget Box")
    const onlineInstruction = selfTeachPlan.filter(selfPlan => selfPlan.category === "Online Learning Portal")
    const beginnerBoxes = beginnerPackage.filter(beginnerPlan => beginnerPlan.category === "Beginner Package")

    useEffect(() => {
        const getCustomerProductSelections = async => {
            setMatchCustomerBoujee(customers.filter(customer => customer.box_plan === boujeeBoxes[0]?.id || customer.box_plan === boujeeBoxes[1]?.id).map((customer) => {
                return customer.box_plan;
            }))
            setMatchCustomerBasic(customers.filter(customer => customer.box_plan === basicBoxes[0]?.id || customer.box_plan === basicBoxes[1]?.id).map((customer) => {
                return customer.box_plan;
            }))
            setMatchCustomerBudget(customers.filter(customer => customer.box_plan === budgetBoxes[0]?.id || customer.box_plan === budgetBoxes[1]?.id).map((customer) => {
                return customer.box_plan;
            }))
            setMatchCustomerOnline(customers.filter(customer => customer.self_teach_plan === onlineInstruction[0]?.id || customer.self_teach_plan === onlineInstruction[1]?.id).map((customer) => {
                return customer.self_teach_plan;
            }))
            setMatchCustomerBeginner(customers.filter(customer => customer.total_beginner_package === beginnerBoxes[0]?.id || customer.total_beginner_package === beginnerBoxes[1]?.id).map((customer) => {
                return customer.total_beginner_package;
            }))
        }
        getCustomerProductSelections();
    }, [customers])
    
    
    
    useEffect(() => {
        const getAllTableData = async => {
            setBoujeeBoxSubscriberPercent(Math.round((matchCustomerBoujee.length / customers.length) * 100));
            setBasicBoxSubscriberPercent(Math.round((matchCustomerBasic.length / customers.length) * 100));
            setBudgetBoxSubscriberPercent(Math.round((matchCustomerBudget.length / customers.length) * 100));
            setOnlinePortalSubscriberPercent(Math.round((matchCustomerOnline.length / customers.length) * 100));
            setPlansTotalCost((matchCustomerBoujee.length * boujeeBoxes[0]?.annual_price) + 
            (matchCustomerBasic.length * basicBoxes[0]?.annual_price) + 
            (matchCustomerBudget.length * budgetBoxes[0]?.annual_price) + 
            (matchCustomerOnline.length * selfTeachPlan[0]?.annual_price) + 
            (matchCustomerBeginner.length * beginnerPackage[0]?.price));
        }
        getAllTableData();
    }, [matchCustomerBeginner])
    
    
    return ( 
        <div>
            {!(customers.length > 1) ? null : (
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Total Number of Customers</th>
                        <td>{customers.length}</td>
                    </tr>
                    <tr>
                        <th>Boujee Box Subscribers</th>
                        <td>{boujeeBoxSuscriberPercent}%</td>
                    </tr>
                    <tr>
                        <th>Basic Box Subscribers</th>
                        <td>{basicBoxSuscriberPercent}%</td>
                    </tr>
                    <tr>
                        <th>Budget Box Subscribers</th>
                        <td>{budgetBoxSuscriberPercent}%</td>
                    </tr>
                    <tr>
                        <th>Online Lessons Portal Subscribers</th>
                        <td>{onlinePortalSubscriberPercent}%</td>
                    </tr>
                    <tr>
                        <th>Total Amount Paid Monthly</th>
                        <td>${Math.round(plansTotalCost / 12)}</td>
                    </tr>
                </tbody>
            </table>)
}
        </div>
     );
}
 
export default CustomerAccountsTable;