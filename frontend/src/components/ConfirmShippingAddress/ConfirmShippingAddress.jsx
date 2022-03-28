import React from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "./ConfirmShippingAddress.css";





const ConfirmShippingAddress = ({ userCustomerInfo, customers, userId }) => {


    let initialValues = {
        first_name: userCustomerInfo[0].first_name,
        last_name: userCustomerInfo[0].last_name,
        street_address: userCustomerInfo[0].street_address,
        city: userCustomerInfo[0].city,
        state: userCustomerInfo[0].state,
        zip_code: userCustomerInfo[0].zip_code,
        country: userCustomerInfo[0].country,
        telephone: userCustomerInfo[0].telephone,
        box_is_purchased: false,
        teach_yourself_is_purchased: false,
        total_beginner_is_purchased: false,
        user: userCustomerInfo[0].user.id,
        box_plan: userCustomerInfo[0].box_plan,
        self_teach_plan: userCustomerInfo[0].self_teach_plan,
        total_beginner_package: userCustomerInfo[0].total_beginner_package
    }

    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, confirmCustomerAddress);
    const [user, token] = useAuth();

    const customerId = customers.filter(customer => customer.user.id === userId);

    async function confirmCustomerAddress() {
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/customer/edit/${customerId[0]?.id}/`, formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log(response);
            console.log("put", formData)
        }
        catch (error) {
            console.log(error.message);
        }
    }

    console.log("customer info", userCustomerInfo[0].first_name);
    console.log("customer id", customerId);
    console.log("user id", userId);

    return ( 
        <div className="confirm-ship">
            <div className="address-btn">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="labels">
                        <label>
                        First Name:{" "}
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        Last Name:{" "}
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        Street Address:{" "}
                        <input
                            type="text"
                            name="street_address"
                            value={formData.street_address}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        City:{" "}
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        State:{" "}
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                        />
                        </label>
                        <label>
                        Zip Code:{" "}
                        <input
                            type="text"
                            name="zip_code"
                            value={formData.zip_code}
                            onChange={handleInputChange}
                        />
                        </label>
                    </div>
                        <div className="confirm-address-btn">
                            <button type="submit">Edit Address</button>
                        </div>
                </form>
             </div>
        </div>
     );
}
 
export default ConfirmShippingAddress;