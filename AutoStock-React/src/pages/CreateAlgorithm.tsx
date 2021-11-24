import * as React from "react"


import Layout from "../components/layout"
import Seo from "../components/seo"

const CreateAlgorithm = () => (
  <Layout>
    <Seo title="AutoStock" />
    <h2>Create Algorithm</h2>

    <form>
      <div className="form-group">
        <label>Algorithm Name </label>
        <input className="form-control" id="algoName" placeholder="Name your Algorithm"></input>
      </div>
      <div className="form-group">
        <label>Stock Ticker Symbol </label>
        <input className="form-control" id="tickerSymbol" placeholder="Eg. AAPL, TSLA"></input>
      </div>
      <div className="form-check">
        <label>Time Inteveral </label>
        <select className="form-control">
          <option>1 Hour</option>
        </select>
      </div>
      <div className="form-check">
        <label>Indicator </label>
        <select className="form-control">
          <option>Simple Moving Average (SMA)</option>
        </select>
      </div>
      <div className="form-check">
        <label>Period 1 </label>
        <select className="form-control">
          <option>(close) 20</option>
        </select>
      </div>
      <div className="form-check">
        <label>Comparator </label>
        <select className="form-control">
          <option>Goes Above</option>
          <option>Goes Below</option>
        </select>
      </div>
      <div className="form-check">
        <label>Period 2 </label>
        <select className="form-control">
          <option>(close) 50</option>
        </select>
      </div>
      <div className="form-check">
        <label>Action </label>
        <select className="form-control">
          <option>Buy</option>
          <option>Sell</option>
        </select>
      </div>
      <div className="form-check">
        <label>Algorithm Running Time </label>
        <select className="form-control">
          <option>14 Days (a fortnite)</option>
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary">Save and Backtest Algorithm</button>
      <button type="submit" className="btn btn-primary">Share</button>

    </form>




  </Layout>
)

export default CreateAlgorithm