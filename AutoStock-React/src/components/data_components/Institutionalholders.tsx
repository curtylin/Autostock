import React from 'react'
import { useEffect } from 'react'

export default function Institutionalholders({stock}: any) {
  const [instHolders, setinstHolders] = React.useState(null)

  useEffect(() => {
    if(stock !== '') {
      fetch(`/api/getInstHolders/${stock}`)
        .then(res => res.json())
        .then(result => {
          setinstHolders(result)
        })
      }
  },[stock])

  return (
    <div>
      <h5>Institutionalholders</h5>
    </div>
  )
}
