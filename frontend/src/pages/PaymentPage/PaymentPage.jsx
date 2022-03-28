import React from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentPage.css";

let initialValues = {
    cc_type: "",
    cc_number: "",
    cc_exp_date: "",
    cc_cvv: "",
    cc_full_name: "",
    is_valid: true,
    customer: ""
}

const PaymentPage = ({ customers, shippingData }) => {

    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, updateCCData);
    const [user, token] = useAuth();

    const userId = user.user_id || user.id;
    const userCustomerInfo = customers.filter(customer => customer.user.id === userId);

    async function updateCCData() {
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/credit_card_payments/", formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log(response);
            console.log("put", formData)
            navigate("/")
        }
        catch (error) {
            console.log(error.message);
        }
    }


    return ( 
        <div className="payment-container">
            <div className="payment-btn">
                <h3>Complete Order with Credit Card Payment</h3>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="labels">
                        <label>
                        Credit Card Type:{" "}
                        <input
                            type="text"
                            name="cc_type"
                            value={formData.cc_type}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        Credit Card Number:{" "}
                        <input
                            type="text"
                            name="cc_number"
                            value={formData.cc_number}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        Expiration Date:{" "}
                        <input
                            type="text"
                            name="cc_exp_date"
                            value={formData.cc_exp_date}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        CVC:{" "}
                        <input
                            type="text"
                            name="cc_cvv"
                            value={formData.cc_cvv}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        Full Name:{" "}
                        <input
                            type="text"
                            name="cc_full_name"
                            value={formData.cc_full_name}
                            onChange={handleInputChange}
                        />
                        </label>
                        <input
                            type="hidden"
                            name="customer"
                            value={userCustomerInfo[0].id}
                        />
                    </div>
                        <div className="confirm-payment-btn">
                            <button type="submit">Place Order</button>
                        </div>
                </form>
            </div>
        </div>
     );
}
 
export default PaymentPage;