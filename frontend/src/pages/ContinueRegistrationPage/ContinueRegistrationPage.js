import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"


let initialValues = {
    first_name: "",
    last_name: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    telephone: "",
    box_is_purchased: false,
    teach_yourself_is_purchased: false,
    total_beginner_is_purchased: false,
    user: "",
    box_plan: "",
    self_teach_plan: "",
    total_beginner_package: ""
}

const ContinueRegistrationPage = () => {
    const [user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewCustomer);

    const navigate = useNavigate();

  
    async function postNewCustomer(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/customer/create/", formData, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            console.log(response);
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
        <div className="container">
      <form className="form" onSubmit={handleSubmit}>
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
        <label>
          Country:{" "}
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Telephone:{" "}
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Complete Registration</button>
      </form>
    </div>
     );
}
 
export default ContinueRegistrationPage;