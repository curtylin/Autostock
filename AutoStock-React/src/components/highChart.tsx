import * as React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import  '../components/highChartsCSS.css'

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

const HighChart = ({setChart}: // data
any) => {
  var fakeData = [],
  volume = [],
  dataLength = 100,
  i = 0

for (i; i < dataLength; i += 1) {
  fakeData.push([
    "Dec " + i, // the date
    3 + Math.random(), // open
    4 + Math.random(), // high
    1 + Math.random(), // low
    2 + Math.random(), // close
  ])

  volume.push([
    "Dec " + i, // the date
    i * Math.random(), // the volume
  ])
}
  const ChartOptions = {
    title: {
      text: setChart,
    },
    yAxis: [
      {
        height: "80%",
      },
      {
        top: "100%",
        height: "20%",
        offset: 0,
      },
    ],
    xAxis: [
      {
        outerWidth: "100%",
      },
    ],
  
    series: [
      {
        type: "line",
        data: fakeData,
        yAxis: 0,
      },
      {
        type: "column",
        id: `${setChart}-volume`,
        name: `${setChart} Volume`,
        data: volume,
        yAxis: 1,
      },
    ],
  }
  return (  
    
    <div>
      
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={ChartOptions}
      />    
    </div>
  )
}
export default HighChart
