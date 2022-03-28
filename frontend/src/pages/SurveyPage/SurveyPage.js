import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomForm from "../../hooks/useCustomForm"
import "./SurveyPage.css";


let initialValues = {
    instrumentType: "Electric Bass",
    skillLevel: "Beginner",
    readOrNo: "Yes",
    learnToRead: "N/A",
    musicStyle: "Classical"
}

const SurveyPage = ({ setSurveyData }) => {

    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, updateSurveyData);
    
    function updateSurveyData() {
        setSurveyData(formData);
        navigate("/select_plan");
    }


    return ( 
        <div className="survey-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Double Bass or Electric Bass:{" "}
          
            <select
            name="instrumentType"
            value={formData.instrumentType}
            onChange={handleInputChange}>
                <option value="Electric Bass">Electric Bass</option>
                <option value="Double Bass">Double Bass</option>
            </select>
            </label>
        <label>
          Skill Level:{" "}
        
        <select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleInputChange}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
        </select>
        </label>
        <label>
          Ability to read notation:{" "}
        
        <select
            name="readOrNo"
            value={formData.readOrNo}
            onChange={handleInputChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
        </select>
        </label>
        <label>
          Desire to learn to read:{" "}
        
        <select
            name="learnToRead"
            value={formData.learnToRead}
            onChange={handleInputChange}>
                <option value="N/A">N/A</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
        </select>
        </label>
        <label>
          Music Style desired:{" "}
        
          <select
            name="musicStyle"
            value={formData.musicStyle}
            onChange={handleInputChange}>
                <option value="Classical">Classical</option>
                <option value="Folk">Folk</option>
                <option value="Rock">Rock</option>
                <option value="Jazz">Jazz</option>
                <option value="Metal">Metal</option>
            </select>
            </label><br />
        <button className="survey-button">Submit</button>
        </form>
        </div>
     );
}
 
export default SurveyPage;