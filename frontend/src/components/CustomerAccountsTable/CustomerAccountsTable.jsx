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
            <table>
                <thead>
                    <tr>
                        <th>Total Number of Customers</th>
                        <th>Boujee Box Subscribers</th>
                        <th>Basic Box Subscribers</th>
                        <th>Budget Box Subscribers</th>
                        <th>Online Lessons Portal Subscribers</th>
                        <th>Total Amount Paid Monthly</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customers.length}</td>
                        <td>{boujeeBoxSuscriberPercent}%</td>
                        <td>{basicBoxSuscriberPercent}%</td>
                        <td>{budgetBoxSuscriberPercent}%</td>
                        <td>{onlinePortalSubscriberPercent}%</td>
                        <td>${Math.round(plansTotalCost / 12)}</td>
                    </tr>

                </tbody>
            </table>)
}
        </div>
     );
}
 
export default CustomerAccountsTable;