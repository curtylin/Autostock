import React,  {useState} from "react"
import { navigate } from "@reach/router"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Divider from "@mui/material/Divider"
import Tooltip from "@mui/material/Tooltip"
import Select, { SelectChangeEvent } from "@mui/material/Select"




const Entries = ({
    updateEntries
  }: any) => {
    const [data, setData] = useState({indicator1: "NONE", indicator2: "NONE", comparator1: "above", action: "buy"})
    

    const handleBlur = (e:any) => {
      updateEntries(data)
    }

    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setData(prevState => ({
          ...prevState,
          [name]: value
      }))
    };

    
    return (
    <div>
        <div>
        {/* Indicator */}
        <FormControl sx={{ my: 2, mr: 5, minWidth: 200, maxWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Indicator 1 (Today's Value)
          </InputLabel>
          {/* <Tooltip title="Which Indicator?" placement="left" arrow> */}
          <Select
            onBlur={handleBlur}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Indicator 1 (Today's Value)"
            value={data.indicator1}
            name="indicator1"
            // onChange={e => {
            //   setIndicator1(e.target.value)
            // }}
            onChange={handleChange}
          >
            <MenuItem value={"NONE"}>None</MenuItem>
            <MenuItem value={"SMA"}>SMA - Simple Moving Average</MenuItem>
            <MenuItem value={"ACCUM"}>ACCUM - Cumulative Sum</MenuItem>
            <MenuItem value={"AMA"}>AMA - Adaptive Moving Average</MenuItem>
            <MenuItem value={"ALLN"}>ALLN - AllN</MenuItem>
            <MenuItem value={"ANYN"}>ANYN - AnyN</MenuItem>
            <MenuItem value={"AVERAGE"}>AVERAGE - Average</MenuItem>
            <MenuItem value={"BBANDS"}>BBANDS - Bollinger Bands</MenuItem>
            <MenuItem value={"BBANDSPCT"}>BBANDSPCT - Bollinger Band PCT</MenuItem>
            <MenuItem value={"DPO"}>DPO - Detrended Price Oscilliator</MenuItem>
            <MenuItem value={"DMA"}>DMA - Dickson Moving Average</MenuItem>
            <MenuItem value={"DEMA"}>DEMA - Double Exponential Moving Average</MenuItem>
            <MenuItem value={"DOWND"}>DOWND - Down Day</MenuItem>
            <MenuItem value={"DOWNDB"}>DOWNDB - Down Day Bool </MenuItem>
             <MenuItem value={"DOWNM"}>DOWNM - Down Move</MenuItem>
             <MenuItem value={"EVE"}>EVE - Envelope </MenuItem>
             <MenuItem value={"EMA"}>  EMA - Exponential Moving Average</MenuItem>
             <MenuItem value={"EXPSMOOTH"}> EXPSMOOTH - Exponetial Smoothing </MenuItem>
            <MenuItem value={"FFIH"}> FFIH - Find First Index Highest</MenuItem>
            <MenuItem value={"FFIL"}> FLIL - Find First Index Lowest</MenuItem>
            <MenuItem value={"FLIH"}> FFIH - Find Last Index Highest</MenuItem>
            <MenuItem value={"FLIL"}> FFIH - Find Last Index Lowest </MenuItem>
            <MenuItem value={"MAXN"}> MAXN - Highest</MenuItem>
            <MenuItem value={"HMA"}> HMA - Hull Moving Average</MenuItem>
            <MenuItem value={"HURST"}> HURST - HURST EXPONENT</MenuItem>
            <MenuItem value={"KST"}> KST -  Know Sure Thing</MenuItem>
            <MenuItem value={"LAGF"}> LAGF - Laguerre Filter</MenuItem>
            <MenuItem value={"LRSI"}> LRSI - Laguerre RSI</MenuItem>
            <MenuItem value={"MINN"}> MINN - Lowest</MenuItem>
            <MenuItem value={"MACD"}>MACD- Moving Average Convergence Divergence</MenuItem>
            <MenuItem value={"MACDHISTO"}>MACDHISTO- Moving Average Convergence Divergence Histogram </MenuItem>
            <MenuItem value={"MEANDEV"}>MEANDEV- Mean Deviation</MenuItem>
            <MenuItem value={"MOMENTUMOSC"}>MOMENTUMOSC- Momentum Oscillator</MenuItem>
            <MenuItem value={"PCTCHANGE"}>PCTCHANGE- Percent Change</MenuItem>
            <MenuItem value={"PCTRANK"}>PCTRANK- Percent Rank</MenuItem>
            <MenuItem value={"PPO"}> PPO - Percentage Price Oscilator</MenuItem>
            <MenuItem value={"PPOSHORT"}> PPOSHORT - Percentage Price Oscilator Short</MenuItem>
            <MenuItem value={"PRICEOSC"}> PRICEOSC - Price Oscilator</MenuItem>
            <MenuItem value={"RSIEMA"}>RSIEMA - Relative Strength Index Exponential Moving Average</MenuItem>
            <MenuItem value={"RSISMA"}>RSISMA - Relative Strength Index Simple Moving Average</MenuItem>
            <MenuItem value={"RSISAFE"}>RSISAFE - Relative Strength Index Safe</MenuItem>
            <MenuItem value={"ROC"}>ROC - Rate of Change</MenuItem>
            <MenuItem value={"ROC100"}>ROC100 - Rate of Change 100</MenuItem>
            <MenuItem value={"RMI"}>RMI - Relative Momentum Index</MenuItem>
            <MenuItem value={"RSI"}>RSI - Relative Strength Index</MenuItem>
            <MenuItem value={"SMMA"}>SMMA - Smoothed Moving Average</MenuItem>
            <MenuItem value={"STDDEV"}>STDDEV - StAndardDeviation</MenuItem>
            <MenuItem value={"SUMN"}>SUMN - SumN</MenuItem>
            <MenuItem value={"TEMA"}> TEMA - Triple Exponential Moving Average</MenuItem>
            <MenuItem value={"TRIX"}>TRIX - Trix</MenuItem>
            <MenuItem value={"TRIXSIGNAL"}>TRIXSIGNAL - Trix Signal</MenuItem>
            <MenuItem value={"TSI"}>TSI - True Strength Indicator</MenuItem>
            <MenuItem value={"UPDAY"}>UPDAY - UpDay</MenuItem>
            <MenuItem value={"UPDAYBOOL"}>UPDAYBOOL - UpDay Bool</MenuItem>           
            <MenuItem value={"WA"}>WA - Weighted Average</MenuItem>
            <MenuItem value={"WMA"}>WMA - Weighted Moving Average</MenuItem>
            <MenuItem value={"ZLEMA"}>ZLEMA - Zero Lag Exponential Moving Average</MenuItem>
            <MenuItem value={"ZLIND"}>ZLIND - Zero Lag Indicator</MenuItem>
          </Select>
        </FormControl>
        {/* Comparator 1 */}
        <FormControl
          sx={{ ml: { sm: 0, md: 0 }, my: 2, mr: 5, minWidth: 200 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Comparator
          </InputLabel>
          <Tooltip title="Comparator" placement="left" arrow>
            <Select
              onBlur={handleBlur}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Comparator"
              value={data.comparator1}
              name="comparator1"
              // onChange={e => {
              //   setComparator1(e.target.value)
              // }}
              onChange={handleChange}
            >
              <MenuItem value={"above"}>Goes Above</MenuItem>
              <MenuItem value={"below"}>Goes Below</MenuItem>
            </Select>
          </Tooltip>
        </FormControl>
        {/* Indicator 2*/}
        <FormControl sx={{ my: 2, mr: 5, minWidth: 200, maxWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Indicator 2 (Yeterday's Value)
          </InputLabel>
          {/* <Tooltip title="Which Indicator?" placement="left" arrow> */}
          <Select
            required
            onBlur={handleBlur}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Indicator 2 (Yesterday's Value)"
            value={data.indicator2}
            name="indicator2"
            // onChange={e => {
            //   setIndicator2(e.target.value)
            // }}
            onChange={handleChange}

          >
            <MenuItem value={"NONE"}>None</MenuItem>
            <MenuItem value={"SMA"}>SMA - Simple Moving Average</MenuItem>
            <MenuItem value={"ACCUM"}>ACCUM - Cumulative Sum</MenuItem>
            <MenuItem value={"AMA"}>AMA - Adaptive Moving Average</MenuItem>
            <MenuItem value={"ALLN"}>ALLN - AllN</MenuItem>
            <MenuItem value={"ANYN"}>ANYN - AnyN</MenuItem>
            <MenuItem value={"AVERAGE"}>AVERAGE - Average</MenuItem>
            <MenuItem value={"BBANDS"}>BBANDS - Bollinger Bands</MenuItem>
            <MenuItem value={"BBANDSPCT"}>BBANDSPCT - Bollinger Band PCT</MenuItem>
            <MenuItem value={"DPO"}>DPO - Detrended Price Oscilliator</MenuItem>
            <MenuItem value={"DMA"}>DMA - Dickson Moving Average</MenuItem>
            <MenuItem value={"DEMA"}>DEMA - Double Exponential Moving Average</MenuItem>
            <MenuItem value={"DOWND"}>DOWND - Down Day</MenuItem>
            <MenuItem value={"DOWNDB"}>DOWNDB - Down Day Bool </MenuItem>
             <MenuItem value={"DOWNM"}>DOWNM - Down Move</MenuItem>
             <MenuItem value={"EVE"}>EVE - Envelope </MenuItem>
             <MenuItem value={"EMA"}>  EMA - Exponential Moving Average</MenuItem>
             <MenuItem value={"EXPSMOOTH"}> EXPSMOOTH - Exponetial Smoothing </MenuItem>
            <MenuItem value={"FFIH"}> FFIH - Find First Index Highest</MenuItem>
            <MenuItem value={"FFIL"}> FLIL - Find First Index Lowest</MenuItem>
            <MenuItem value={"FLIH"}> FFIH - Find Last Index Highest</MenuItem>
            <MenuItem value={"FLIL"}> FFIH - Find Last Index Lowest </MenuItem>
            <MenuItem value={"MAXN"}> MAXN - Highest</MenuItem>
            <MenuItem value={"HMA"}> HMA - Hull Moving Average</MenuItem>
            <MenuItem value={"HURST"}> HURST - HURST EXPONENT</MenuItem>
            <MenuItem value={"KST"}> KST -  Know Sure Thing</MenuItem>
            <MenuItem value={"LAGF"}> LAGF - Laguerre Filter</MenuItem>
            <MenuItem value={"LRSI"}> LRSI - Laguerre RSI</MenuItem>
            <MenuItem value={"MINN"}> MINN - Lowest</MenuItem>
            <MenuItem value={"MACD"}>MACD- Moving Average Convergence Divergence</MenuItem>
            <MenuItem value={"MACDHISTO"}>MACDHISTO- Moving Average Convergence Divergence Histogram </MenuItem>
            <MenuItem value={"MEANDEV"}>MEANDEV- Mean Deviation</MenuItem>
            <MenuItem value={"MOMENTUMOSC"}>MOMENTUMOSC- Momentum Oscillator</MenuItem>
            <MenuItem value={"PCTCHANGE"}>PCTCHANGE- Percent Change</MenuItem>
            <MenuItem value={"PCTRANK"}>PCTRANK- Percent Rank</MenuItem>
            <MenuItem value={"PPO"}> PPO - Percentage Price Oscilator</MenuItem>
            <MenuItem value={"PPOSHORT"}> PPOSHORT - Percentage Price Oscilator Short</MenuItem>
            <MenuItem value={"PRICEOSC"}> PRICEOSC - Price Oscilator</MenuItem>
            <MenuItem value={"RSIEMA"}>RSIEMA - Relative Strength Index Exponential Moving Average</MenuItem>
            <MenuItem value={"RSISMA"}>RSISMA - Relative Strength Index Simple Moving Average</MenuItem>
            <MenuItem value={"RSISAFE"}>RSISAFE - Relative Strength Index Safe</MenuItem>
            <MenuItem value={"ROC"}>ROC - Rate of Change</MenuItem>
            <MenuItem value={"ROC100"}>ROC100 - Rate of Change 100</MenuItem>
            <MenuItem value={"RMI"}>RMI - Relative Momentum Index</MenuItem>
            <MenuItem value={"RSI"}>RSI - Relative Strength Index</MenuItem>
            <MenuItem value={"SMMA"}>SMMA - Smoothed Moving Average</MenuItem>
            <MenuItem value={"STDDEV"}>STDDEV - StAndardDeviation</MenuItem>
            <MenuItem value={"SUMN"}>SUMN - SumN</MenuItem>
            <MenuItem value={"TEMA"}> TEMA - Triple Exponential Moving Average</MenuItem>
            <MenuItem value={"TRIX"}>TRIX - Trix</MenuItem>
            <MenuItem value={"TRIXSIGNAL"}>TRIXSIGNAL - Trix Signal</MenuItem>
            <MenuItem value={"TSI"}>TSI - True Strength Indicator</MenuItem>
            <MenuItem value={"UPDAY"}>UPDAY - UpDay</MenuItem>
            <MenuItem value={"UPDAYBOOL"}>UPDAYBOOL - UpDay Bool</MenuItem>           
            <MenuItem value={"WA"}>WA - Weighted Average</MenuItem>
            <MenuItem value={"WMA"}>WMA - Weighted Moving Average</MenuItem>
            <MenuItem value={"ZLEMA"}>ZLEMA - Zero Lag Exponential Moving Average</MenuItem>
            <MenuItem value={"ZLIND"}>ZLIND - Zero Lag Indicator</MenuItem>
          </Select>
          {/* </Tooltip> */}
        </FormControl>
      </div>

      <div>
        <div>
          {/* Action */}
          <FormControl sx={{ my: 2, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Action
            </InputLabel>
            <Tooltip title="Buy or Sell" placement="right" arrow>
              <Select
                onBlur={handleBlur}
                name="action"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Action"
                value={data.action}
                // onChange={e => {
                //   setAction(e.target.value)
                // }}
                onChange={handleChange}
              >
                <MenuItem value={"buy"}>Buy</MenuItem>
                <MenuItem value={"sell"}>Sell</MenuItem>
              </Select>
            </Tooltip>
          </FormControl>
        </div>
        </div>
        </div>
    )
  }
  
  export default Entries