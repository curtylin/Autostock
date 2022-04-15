import React from 'react'
import { useEffect } from 'react'
import { ResponsiveCalendarCanvas  } from '@nivo/calendar'
import { CircularProgress } from '@mui/material'

// We get stock options as well as earnings date

export default function Calendar({stock}: any) {
  const [dates, setDates] = React.useState([])

  useEffect(() => {
    setDates([])
    if(stock !== '') {
      fetch(`/api/getOptions/${stock}`)
        .then(res => res.json())
        .then(result => {
          setDates(result)
        })
      }
  },[stock])

  return (
    <div style={{height: 500}}>
      <h5>Options Calendar</h5>
      {/* <InternalCalendar data={dates} from={dates[0]} to={dates[dates.length-1]}/> */}
      {
        dates.length > 0 ? 
        <ResponsiveCalendarCanvas
        data={dates}
        from={dates[0]["day"]}
        to={dates[dates.length-1]["day"]}
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
    /> : <CircularProgress sx={{ mt: 1 }} color="inherit" />
      }



    </div>
  )
}
