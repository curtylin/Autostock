import * as React from "react"

const Algorithms = () => (
  <>
    <title>My Algorithms</title>
    <h1>My Algorithms</h1>
    <div className="mdc-data-table">
        <div className="mdc-data-table__table-container">
          <table className="mdc-data-table__table" aria-label="my-algorithms">
            <thead>
              <tr className="mdc-data-table__header-row">
                <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Algorithm Name</th>
                <th className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Day Gain (%)</th>
                <th className="mdc-data-table__header-cell" role="columnheader" scope="col"> Creator </th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
              <tr className="mdc-data-table__row">
                <th className="mdc-data-table__cell" scope="row">Algo 1</th>
                <td className="mdc-data-table__cell mdc-data-table__cell--numeric">20%</td>
                <td className="mdc-data-table__cell">
                    Travis Martin
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


  </>
)

export default Algorithms