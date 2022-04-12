import React from 'react'

export default function Sustainability({stock}: any) {

  const retrieveData = (stock: any) => {
    if(stock !== ''){
      const headers = new Headers()
      headers.append("content-type", "application/json")
      let init = {
        method: "GET",
        headers,
      }
      fetch(`http://localhost:5000/getSustainability/${stock} `, init)
      .then(res => {
        return res.json()
      })
    }
  }

  console.log(retrieveData(stock))

  return (
    <div>{stock}</div>
  )
}
