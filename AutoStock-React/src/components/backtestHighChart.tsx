import * as React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
//import indicatorsAll from "highcharts/indicators/indicators-all";
//import annotationsAdvanced from "highcharts/modules/annotations-advanced"
//import priceIndicator from "highcharts/modules/price-indicator"
//import fullScreen from "highcharts/modules/full-screen"
//import stockTools from "highcharts/modules/stock-tools"
import "../components/highChartsCSS.css"

//indicatorsAll(Highcharts);
//annotationsAdvanced(Highcharts)
//priceIndicator(Highcharts)
//fullScreen(Highcharts)
//stockTools(Highcharts)

const BacktestHighChart = ({ stock, stockData }: any) => {
  const ChartOptions = {
    title: {
      text: stock,
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
        id: 1,
        type: "line",
        
        data: stockData,
        yAxis: 0,
        tooltip: {
          valuePrefix: "$",
        },
      },
      {
        type: "column",
        id: `${stock}-volume`,
        name: `${stock} Volume`,
        data: stockData,
        yAxis: 1,
      },
      {
        onSeries: 1,
        type: "flags",
        data: [[1649409026,1]],

      //   data : [{
      //     x : 100,      // Point where the flag appears
      //     title : 'Buy', // Title of flag displayed on the chart 
      //     text : 'Bought'   // Text displayed when the flag are highlighted.
      // }],     
      //   shape: "circlepin",
      //   width: 16,
      //   style: {
      //     fill: "#ff0000",
      //     stroke: "#ff0000",
      //     "stroke-width": 1,
      //     r: 5,
      //   }

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
export default BacktestHighChart
