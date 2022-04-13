import React from 'react'
import { useEffect } from 'react'


export default function Stockfinancials({stock}: any) {

  const [stockFinancials, setStockFinancials] = React.useState(null)

  useEffect(() => {
    if(stock !== '') {
      fetch(`http://localhost:5000/getQuartFinancials/${stock}`)
        .then(res => res.json())
        .then(result => {
          setStockFinancials(result)
        })
      }
  },[stock])


  return (
    <div>
      <h5>Quaterly Stock Financials</h5>
    </div>
  )
}
