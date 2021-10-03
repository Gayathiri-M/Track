import React,{ useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    plugins:{
        legend: {
            display: false,
        },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxis: [
        {
          grid: {
            display: false
          },
          type: "time",
          time: {
            format: "DD/MM/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxis: [
        {
          grid: {
            color:"rgba(0,0,0,0)",
            display: false
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  
const buildChartData = (data, caseType) => {
    const chartData= [];
    let lastDataPoint;

    for(let date in data.cases) 
    {
      if(caseType==="recovered")
      {
        if(data[caseType][date])
        {  
          const newDataPoint ={
            x:date,
            y:data[caseType][date]-lastDataPoint,
          };
            chartData.push(newDataPoint);
          }
          lastDataPoint=data[caseType][date];
      }
      else
      {  
        if(lastDataPoint)
        {  
          const newDataPoint ={
                  x:date,
                  y:Math.abs(data[caseType][date]-lastDataPoint),
          };
          chartData.push(newDataPoint);
        }
        lastDataPoint=data[caseType][date];
      }
    }
    return chartData;
};


const LineGraph = ({caseType}) => {
    const [data, setData] = useState({});
  
    useEffect(() => {
        const fetchData = async() => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => {
                return response.json();
            })
            .then((data) => {
                const chartData = buildChartData(data,caseType);
                setData(chartData);
            });
        };

        fetchData();
    },[caseType]);


    return ( 
        <div className="graph">
            <h3>World wide new cases</h3>
            
            {data?.length > 0 && (

                <Line
                    data ={{
                        datasets: [
                            {
                                borderColor:"#CC1034",
                                fill:"rgba(204,16,52,0.5)",
                                backgroundColor:"rgba(204,16,52,0.5)",
                                data:data,
                            },
                        ],
                    }}
                    options={options}
                    />
            )}
        </div>
     );
}
 
export default LineGraph;