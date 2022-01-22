import * as React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"


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
    text: "AAPL",
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
      id: "aapl-volume",
      name: "AAPL Volume",
      data: volume,
      yAxis: 1,
    },
  ],
}
const HighChart = ({setChart}: // data
any) => {
  return (
    <div>
      <h3>{setChart}</h3>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={ChartOptions}
      />    
    </div>
    
  )
}
export default HighChart
