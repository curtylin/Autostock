// Step 1: Import React
import * as React from 'react'

// Step 2: Define your component
const createAlgorithmsPage = () => {
  return (
    <main>
        <title>Create Algorithm</title>
        <h1>Create Algorithm</h1>
        <form>
            <label class="mdc-text-field mdc-text-field--filled">
                <span class="mdc-text-field__ripple"></span>
                <span class="mdc-floating-label" id="algorithmName">Algorithm Name</span> 
                <br></br>
                <input class="mdc-text-field__input" type="text" aria-labelledby="algorithmName" aria-controls="my-helper-id" aria-describedby="my-helper-id" placeholder="Eg. your algorithm name here"></input>
                <span class="mdc-line-ripple"></span>
            </label>
            <br></br>
            <label class="mdc-text-field mdc-text-field--filled">
                <span class="mdc-text-field__ripple"></span>
                <span class="mdc-floating-label" id="tickerSymbol">Stock Ticker Symbol</span> 
                <br></br>
                <input class="mdc-text-field__input" type="text" aria-labelledby="tickerSymbol" aria-controls="my-helper-id" aria-describedby="my-helper-id" placeholder="Eg. AAPL, TSLA"></input>
                <span class="mdc-line-ripple"></span>
            </label>
        </form>
    </main>
  )
}

export default createAlgorithmsPage