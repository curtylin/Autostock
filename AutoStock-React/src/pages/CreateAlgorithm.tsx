import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Tooltip from "@mui/material/Tooltip"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import Indicators from "highcharts/indicators/indicators-all.js"
import DragPanes from "highcharts/modules/drag-panes.js"
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js"
import PriceIndicator from "highcharts/modules/price-indicator.js"
import FullScreen from "highcharts/modules/full-screen.js"
import StockTools from "highcharts/modules/stock-tools.js"

// init the module
Indicators(Highcharts)
DragPanes(Highcharts)
AnnotationsAdvanced(Highcharts)
PriceIndicator(Highcharts)
FullScreen(Highcharts)
StockTools(Highcharts)

const theme = {
    spacing: 8,
}
const handleDelete = () => {
    console.info("You clicked the delete icon.")
}

// split the data set into ohlc and volume
var fakeData = [],
    volume = [],
    dataLength = 100,
    i = 0;

for (i; i < dataLength; i += 1) {
    fakeData.push([
        "Dec " + i, // the date
        3 + Math.random(), // open
        4 + Math.random(), // high
        1 + Math.random(), // low
        2 + Math.random() // close
    ]);

    volume.push([
        "Dec " + i, // the date
        i * Math.random() // the volume
    ]);
}
const options = {
    title: {
        text: 'BACKTESTING STOCK (Fake Data)'
    },
    yAxis: [{
        labels: {
            align: 'left'
        },
        height: '80%',
        resize: {
            enabled: true
        }
    }, {
        labels: {
            align: 'left'
        },
        top: '80%',
        height: '20%',
        offset: 0
    }],
    tooltip: {
        shape: 'square',
        headerShape: 'callout',
        borderWidth: 0,
        shadow: false,
    },
    series: [
        {
            name: 'Stock Price',
            type: "line",
            data: fakeData,
            yAxis: 0
        },
        {
            type: 'column',
            id: 'stock-volume',
            name: 'Stock Volume',
            data: volume,
            yAxis: 1
        }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 800
            },
            chartOptions: {
                rangeSelector: {
                    inputEnabled: false
                }
            }
        }]
    }
};

const CreateAlgorithm = () => {
    const [algoName, setAlgoName] = useState("")
    const [stock, setStocks] = useState("")
    const [timeInterval, setTimeInterval] = useState("")
    const [indicator1, setIndicator1] = useState("")
    const [period1, setPeriod1] = useState("")
    const [indicator2, setIndicator2] = useState("")
    const [period2, setPeriod2] = useState("")
    const [action, setAction] = useState("")
    const [runningTime, setRunningTime] = useState("")

    useEffect(() => {
        console.log(timeInterval)
    })

    const loadStocks = () => {
        fetch("https://api.iextrading.com/1.0/ref-data/symbols")
            .then(res => res.json())
            .then(data => {
                setStocks(data)
            })
    }

    const handleSubmit = () => {
        console.log("I've been clicked")

        let currDate = new Date()
        //create json object
        let obj = {
            symbol: stock,
            cash: 1000,
            startDate: `${currDate.getFullYear() - 1}-${currDate.getMonth()}-${currDate.getDate()}`,
            endDate: `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}`,

        }

        //fetch post to localhost
        // fetch("http://localhost:5000/backtest", {
        //   headers: {
        //     Accept: "application/json",
        //     contentType : "application/json",
        //   },
        //   method: "POST",
        //   mode: 'no-cors',
        //   body: JSON.stringify(obj)
        // }).then(res => {
        //   console.log(res)
        //   alert(res)
        // })
        const headers = new Headers();
        headers.append('content-type', 'application/json');

        const body = `{
        "symbol": "${stock}",
        "cash": 1000,
        "startDate": "${currDate.getFullYear() - 1}-${currDate.getMonth()}-${currDate.getDate()}",
        "endDate": "${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}"
        }
        `;

        const init = {
            method: 'POST',
            headers,
            body
        };

        fetch('http://127.0.0.1:5000/backtest', init)
            .then((response) => {
                return response.json(); // or .text() or .blob() ...
            })
            .then((text) => {
                // text is the response body
                console.log(text);
                alert(JSON.stringify(text))
            })
            .catch((e) => {
                // error in e.message
            });
    }

    return (
        <Layout>
            <Seo title="AutoStock" />
            <h2>Create Algorithm</h2>

            <form>
                <div>
                    {/* Algorithm Name */}
                    <Tooltip title="Give it a name!" placement="left" arrow>
                        <TextField
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setAlgoName(e.target.value)
                            }}
                            sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300 }}
                            id="outlined-search"
                            label="Algorithm Name"
                            type="search"
                        />
                    </Tooltip>
                </div>
                <div>
                    {/* Stock Symbol */}
                    <FormControl sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300 }}>
                        <Tooltip title="E.g. AAPL or TSLA" placement="left" arrow>
                            <TextField
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setStocks(e.target.value)
                                }}
                                type="search"
                                id="outlined-search"
                                label="Stock"
                            />
                        </Tooltip>
                        {/* <Stack sx={{ my: 1, mr: 5 }}direction="row" spacing={1}>
            <Chip id="chp1" label="Deletable" onDelete={handleDelete} />
            <Chip label="Deletable" onDelete={handleDelete}/>
          </Stack> */}
                    </FormControl>
                    {/* Time Interval */}
                    <FormControl sx={{ my: 2, mr: 5, minWidth: 300 }}>
                        <InputLabel required id="demo-simple-select-standard-label">
                            Time Interval
                        </InputLabel>
                        <Tooltip title="How often?" placement="right" arrow>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Time Interval"
                                value={timeInterval}
                                onChange={e => {
                                    setTimeInterval(e.target.value)
                                }}
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value={10}>1 Hour</MenuItem>
                                <MenuItem value={20}>1 Day</MenuItem>
                                <MenuItem value={30}>1 Week</MenuItem>
                            </Select>
                        </Tooltip>
                    </FormControl>
                </div>
                {/* Indicator */}
                <FormControl sx={{ my: 2, mr: 5, minWidth: 200, maxWidth: 200 }}>
                    <InputLabel required id="demo-simple-select-standard-label">
                        Indicator 1
                    </InputLabel>
                    <Tooltip title="Which Indicator?" placement="left" arrow>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Indicator 1"
                            value={indicator1}
                            onChange={e => {
                                setIndicator1(e.target.value)
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Simple Moving Average (SMA)</MenuItem>
                        </Select>
                    </Tooltip>
                </FormControl>
                {/* Period 1 */}
                <FormControl required sx={{ my: 2, mr: 5, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                        Period 1
                    </InputLabel>
                    <Tooltip title="Period 1" placement="left" arrow>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Period 1"
                            value={period1}
                            onChange={e => {
                                setPeriod1(e.target.value)
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>(close) 20</MenuItem>
                        </Select>
                    </Tooltip>
                </FormControl>
                {/* Indicator 2 */}
                <FormControl required sx={{ my: 2, mr: 5, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                        Indicator 2
                    </InputLabel>
                    <Tooltip title="Indicator 2" placement="left" arrow>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Indicator2"
                            value={indicator2}
                            onChange={e => {
                                setIndicator2(e.target.value)
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Goes Above</MenuItem>
                            <MenuItem value={10}>Goes Below</MenuItem>
                        </Select>
                    </Tooltip>
                </FormControl>
                {/* Period 2 */}
                <FormControl required sx={{ my: 2, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                        Period 2
                    </InputLabel>
                    <Tooltip title="Period 2" placement="left" arrow>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Period 2"
                            value={period2}
                            onChange={e => {
                                setPeriod2(e.target.value)
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>(close) 20</MenuItem>
                        </Select>
                    </Tooltip>
                </FormControl>
                <div>
                    {/* Action */}
                    <FormControl required sx={{ my: 2, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                            Action
                        </InputLabel>
                        <Tooltip title="Buy or Sell" placement="right" arrow>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Action"
                                value={action}
                                onChange={e => {
                                    setAction(e.target.value)
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Buy</MenuItem>
                                <MenuItem value={10}>Sell</MenuItem>
                            </Select>
                        </Tooltip>
                    </FormControl>
                </div>
                {/* Running Time */}
                <FormControl required sx={{ my: 2, minWidth: 500 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                        Algorithm Running Time
                    </InputLabel>
                    <Tooltip title="How long will this run?" placement="right" arrow>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Algorithm Running Time"
                            value={runningTime}
                            onChange={e => {
                                setRunningTime(e.target.value)
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>1 Day</MenuItem>
                            <MenuItem value={10}>3 Days</MenuItem>
                            <MenuItem value={10}>1 Week</MenuItem>
                            <MenuItem value={10}>1 Month</MenuItem>
                        </Select>
                    </Tooltip>
                </FormControl>
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ my: 2, mr: 5, minWidth: 300 }}
                        onClick={handleSubmit}
                    >
                        Save Algorithm
                    </Button>

                    <Button type="submit" variant="contained" color="secondary">
                        Share
                    </Button>
                </div>
            </form>
            <div id="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"stockChart"}
                    options={options}
                />
            </div>
        </Layout>
    )
}

export default CreateAlgorithm
