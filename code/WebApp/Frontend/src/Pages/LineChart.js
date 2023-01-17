// ./components/LineChart.js

import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


function LineChart(props){

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

let dates =[];
let values = [];

for (let i=0 ; i<props.data.length ; i++) {
      dates.push(props.data[i].date);

}

for (let i=0 ; i<props.data.length ; i++) {
  values.push(props.data[i].value);


}
  console.log(dates);
  console.log(values);

  const dataforgraph = {
    labels: dates,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: values,
      },
    ],
  };

// const LineChart = () => {
//   return (
//     <div>
//       <Line data={data} />
//     </div>
//   );
// };

return (
      <div>
        <Line data={dataforgraph} />
      </div>
    );
}
export default LineChart;