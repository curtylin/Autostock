import * as React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import indicatorsAll from "highcharts/indicators/indicators-all"
import annotationsAdvanced from "highcharts/modules/annotations-advanced"
import priceIndicator from "highcharts/modules/price-indicator"
import fullScreen from "highcharts/modules/full-screen"
import stockTools from "highcharts/modules/stock-tools"
import "../components/highChartsCSS.css"
import { isBrowser } from "../services/auth"

const HighChart = ({ stock, stockData }: any) => {
  if (isBrowser()) {
    indicatorsAll(Highcharts)
    annotationsAdvanced(Highcharts)
    priceIndicator(Highcharts)
    fullScreen(Highcharts)
    stockTools(Highcharts)
  }

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
        type: "candlestick",
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
