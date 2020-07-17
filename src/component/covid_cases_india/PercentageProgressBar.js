import React, { Component } from "react";

class PercentageProgressBar extends Component {

  render() {
    const dataList = this.props.covideCases_time_series;
    let graphData = {};
    dataList.map(data => {
      const totalActiveRate = data.active * (100 / data.confirmed);
      const totalRecoveryRate = data.recovered * (100 / data.confirmed);
      const totalDeathsRate = data.deaths * (100 / data.confirmed);
      graphData = {
        "Total Active": Math.round(totalActiveRate),
        "Total Recovery": Math.round(totalRecoveryRate),
        "Total Deaths": Math.round(totalDeathsRate)
      }
    })

    return (
      <div className="progress-div">
        <p className="progress-heading"><b>Covid19 Progress Bar</b></p>
        {Object.entries(graphData).map(([key, value]) => {
          return (
            <div className="progress-inner" key={value}>
              <p><b>{key}</b></p>
              <div className="progress" >
                <div className="progress-bar progress-bar-striped" role="progressbar"
                  style={{ width: `${value}%` }}>
                  {value} %
                  </div>
              </div>
            </div>
          )
        })
        }
      </div >
    )
  }
}

export default PercentageProgressBar;