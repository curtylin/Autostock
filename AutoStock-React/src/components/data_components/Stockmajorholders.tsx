import React from 'react'
import { useEffect } from 'react'
import { InternalPieCanvas } from './nivo/InternalPieCanvas'

export default function Stockmajorholders({stock}: any) {

  const [majorHolders, setMajorHolders] = React.useState([])
  useEffect(() => {
    if(stock !== '') {
      fetch(`http://localhost:5000/getMajorHolders/${stock}`)
        .then(res => res.json())
        .then(result => {
          setMajorHolders(result)
          console.log(result)
        })
      }
  },[stock])


  return (
    <div style={{position: 'relative'}}>
      <div style={{position: 'absolute', width: '100%', height: '100%' }}>
        <InternalPieCanvas data={majorHolders} />
      </div>
    </div>
    // <div>{}</div>
  )
}

