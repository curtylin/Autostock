import React from 'react'
import { useEffect } from 'react'
import { InternalCalendar } from './nivo/InternalCalendar'

// We get stock options as well as earnings date

export default function Calendar({stock}: any) {
  const [dates, setDates] = React.useState([])

  useEffect(() => {
    if(stock !== '') {
      fetch(`http://localhost:5000/getOptions/${stock}`)
        .then(res => res.json())
        .then(result => {
          setDates(result)
        })
      }
  },[stock])

  return (
    <div>
      <InternalCalendar data={dates} from={dates[0]} to={dates[dates.length-1]}/>
    </div>
  )
}
