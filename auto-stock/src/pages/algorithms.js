// Step 1: Import React
import * as React from 'react'


// Step 2: Define your component
const myAlgorithmsPage = () => {
  return (
    <main>
      <title>My Algorithms</title>
      <h1>My Algorithms</h1>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
      <div class="mdc-data-table">
        <div class="mdc-data-table__table-container">
          <table class="mdc-data-table__table" aria-label="my-algorithms">
            <thead>
              <tr class="mdc-data-table__header-row">
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Algorithm Name</th>
                <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Day Gain (%)</th>
                <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col"> </th>
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col"> </th>
              </tr>
            </thead>
            <tbody class="mdc-data-table__content">
              <tr class="mdc-data-table__row">
                <th class="mdc-data-table__cell" scope="row">Algo 1</th>
                <td class="mdc-data-table__cell mdc-data-table__cell--numeric">20%</td>
                <td class="mdc-data-table__cell">
                  <button class="mdc-button mdc-button--raised">
                    <span class="mdc-button__label">Edit</span>
                  </button>
                  <button class="mdc-button mdc-button--raised">
                    <span class="mdc-button__label">Share</span>
                  </button>
                  <button class="mdc-button mdc-button--raised">
                    <span class="mdc-button__label">Delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

// Step 3: Export your component
export default myAlgorithmsPage

