import React from 'react';
import { useNavigate } from "react-router-dom"
import ConfirmShippingAddress from '../../components/ConfirmShippingAddress/ConfirmShippingAddress';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth';
import "./ShippingPage.css";
import axios from "axios";




const ShippingPage = ({ customers, setShippingData }) => {

    const [user, token] = useAuth();
    const userId = user.user_id || user.id;
    const userCustomerInfo = customers.filter(customer => customer.user.id === userId);

    let initialValues = {
        shipping_type: "Ground",
        shipping_company: "UPS",
        shipping_cost: 7,
        box_plan: userCustomerInfo[0].box_plan,
        customer: userCustomerInfo[0].id,
        total_beginner_package: userCustomerInfo[0].total_beginner_package
    }
    

    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, updateShippingData);
    

    console.log(customers)

    

    console.log(userCustomerInfo)

    async function updateShippingData() {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/shipping/", formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setShippingData(response.data);
            console.log(response);
            console.log("post", formData)
            navigate("/cc_payment")
        }
        catch (error) {
            console.log(error.message);
        }
    }

    console.log("form data", formData)

    return ( 
        <div className="shipping-container">
            <h3>Shipping Information:</h3>
            <form className="shipping-data" onSubmit={handleSubmit}>
                <div className="label-btn">
                    <div className="labels">
                    <label>
                    Shipping Type:{" "}
                    <input
                        type="text"
                        name="shipping_type"
                        value={formData.shipping_type}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>
                    Shipping Company:{" "}
                    <input
                        type="text"
                        name="shipping_company"
                        value={formData.shipping_company}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>
                    Shipping Cost:{" "}
                    <input
                        type="text"
                        name="shipping_cost"
                        value={formData.shipping_cost}
                        onChange={handleInputChange}
                    />
                    </label>
                    <input
                        type="hidden"
                        name="customer"
                        value={formData.id}
                    />
                    <input
                        type="hidden"
                        name="box_plan"
                        value={formData.box_plan}
                    />
                    <input
                        type="hidden"
                        name="total_beginner_package"
                        value={formData.total_beginner_package}
                    />
                    </div>
                    <div className="ship-btn">
                        <button type="submit">Proceed to Payment</button>
                    </div>
                </div>
            </form>
            <div className="confirm-address">
                <p>If your address information is incorrect, please correct it and confirm.</p>
                <ConfirmShippingAddress userCustomerInfo={userCustomerInfo} customers={customers} userId={userId} />
            </div>
        </div>
     );
}
 
export default ShippingPage;