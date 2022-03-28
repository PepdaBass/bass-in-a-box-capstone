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
        ["Boujee Boxes", matchCustomerBoujee.length, "#9AD666", null],
        ["Basic Boxes", matchCustomerBasic.length, "#00A7D1", null],
        ["Budget Boxes", matchCustomerBudget.length, "#00B286", null],
        ["Beginner Boxes", matchCustomerBeginner.length, "#00E0FF", null],
        ["Online Portal", matchCustomerOnline.length, "#42493A", null],
    ]; 

    const options = {
        title: "Total Amount of Products Sold",
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        backgroundColor: "#A6AE9D"
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