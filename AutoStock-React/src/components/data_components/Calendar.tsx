import React from 'react'
import { useEffect } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'

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
      <h5>Calendar</h5>
      {/* <InternalCalendar data={dates} from={dates[0]} to={dates[dates.length-1]}/> */}
      <ResponsiveCalendar
        data={dates}
        from={dates[0]}
        to={dates[dates[dates.length-1]]}
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />


    </div>
  )
}
