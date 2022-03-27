import React from 'react';
import { Chart } from 'react-google-charts';


const ProductLineChart = ({ matchCustomerBoujee, matchCustomerBasic, matchCustomerBudget, matchCustomerBeginner, matchCustomerOnline }) => {

    const data = [
    [
        "Element",
        "Density",
        { role: "style" },
        {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
        },
    ],
        ["Boujee Boxes", matchCustomerBoujee.length, "black", null],
        ["Basic Boxes", matchCustomerBasic.length, "black", null],
        ["Budget Boxes", matchCustomerBudget.length, "black", null],
        ["Beginner Boxes", matchCustomerBeginner.length, "black", null],
        ["Online Portal", matchCustomerOnline.length, "black", null],
    ]; 

    const options = {
        title: "Total Amount of Products Sold",
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
      };


    return ( 
        <Chart
  chartType="BarChart"
  data={data}
  options={options}
  width="100%"
  height="400px"
  legendToggle
/>
     );
}
 
export default ProductLineChart;