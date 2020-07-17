import React, { Component } from "react";
import axios from "axios";
import CovidGraphTracker from "./CovidGraphTracker";
import PercentageProgressBar from "./PercentageProgressBar";
import Loading from "../Loading"

let recoveryRateOfRecovered = [];
let recoveryRateOfDeathas = [];
class CovideIndiaCase extends Component {

  state = {
    covideCasesStateWise: [],
    totalCovideCasesInIndia: [],
    covideCases_time_series: [],
    loader: false,
    error: "",
    dataShorting: false
  }

  getcovideCasesStateWise = async () => {
    try {
      this.setState({
        loader: true
      })
      const resData = await axios.get("https://api.covid19india.org/data.json");
      this.setState({
        covideCasesStateWise: resData.data.statewise,
        covideCases_time_series: resData.data.cases_time_series,
        loader: false
      })
    } catch (error) {
      this.setState({
        error: `We found Some ${error}`,
        loader: false
      });
    }
  }
  shortByRecovered = (typeOfCases) => {
    console.log(this.state.covideCasesStateWise)
    let rowdata = this.state.covideCasesStateWise;

    var shortDataAcive = rowdata.slice(0);
    if (this.state.dataShorting === true) {
      if (typeOfCases === "confirmed") {
        shortDataAcive.sort(function (a, b) {
          return a.confirmed - b.confirmed;
        });
      }

      if (typeOfCases === "active") {
        shortDataAcive.sort(function (a, b) {
          return a.active - b.active;
        });
      }

      if (typeOfCases === "recovered") {
        shortDataAcive.sort(function (a, b) {
          return a.recovered - b.recovered;
        });
      }

      if (typeOfCases === "deaths") {
        shortDataAcive.sort(function (a, b) {
          return a.deaths - b.deaths;
        });
      }
    } else {
      if (typeOfCases === "confirmed") {
        shortDataAcive.sort(function (a, b) {
          return b.confirmed - a.confirmed;
        });
      }

      if (typeOfCases === "active") {
        shortDataAcive.sort(function (a, b) {
          return b.active - a.active;
        });
      }

      if (typeOfCases === "recovered") {
        shortDataAcive.sort(function (a, b) {
          return b.recovered - a.recovered;
        });
      }

      if (typeOfCases === "deaths") {
        shortDataAcive.sort(function (a, b) {
          return b.deaths - a.deaths;
        });
      }
    }

    this.setState({
      covideCasesStateWise: shortDataAcive,
      dataShorting: !this.state.dataShorting
    })
  }

  recoveryRateOfCovidIndia = () => {
    this.state.covideCasesStateWise.map(data => {
      const totalRecoveryRate = data.recovered * (100 / data.confirmed);
      const totalDeathsRate = data.deaths * (100 / data.confirmed);
      if (isNaN(totalRecoveryRate) || isNaN(totalDeathsRate)) {
        recoveryRateOfRecovered.push(0);
        recoveryRateOfDeathas.push(0)
      } else {
        recoveryRateOfRecovered.push(totalRecoveryRate.toFixed(1));
        recoveryRateOfDeathas.push(totalDeathsRate.toFixed(1))
      }
    })
  }

  componentDidMount() {
    this.getcovideCasesStateWise();
  }

  render() {
    this.recoveryRateOfCovidIndia();
    const { covideCasesStateWise, totalCovideCasesInIndia, loader, error } = this.state;

    totalCovideCasesInIndia.pop();

    let covideCasesStateWiseList = covideCasesStateWise.filter(cases => {
      if (cases.state === "Total") {
        return totalCovideCasesInIndia.push(cases), false;
      } else {
        return cases
      }
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <table className="table">
              <thead>
                {totalCovideCasesInIndia.map((covidCases, index) => {
                  return (
                    <tr key={index}>
                      <td>India</td>
                      <td>Confirmed <br /> <span className="error-msg">[+{covidCases.deltaconfirmed}] Today <br />{covidCases.confirmed}</span></td>
                      <td className="activeCase">Active <br /><span>{covidCases.active}</span></td>
                      <td colSpan="2" className="recoveredCase">Recovered<span><br />
                        [+{covidCases.deltarecovered}] Today<br />{covidCases.recovered}[{recoveryRateOfRecovered[index]}%]</span>
                      </td>
                      <td className="deathesCase">Total Deaths: <span><br />
                        [+{covidCases.deltadeaths}] Today<br />{covidCases.deaths}[{recoveryRateOfDeathas[index]}%]</span>
                      </td>
                      <td>Last updated {covidCases.lastupdatedtime}</td>
                    </tr>
                  )
                })}
                <tr>
                  <th>NO.</th>
                  <th>State</th>
                  <th onClick={() => this.shortByRecovered("confirmed")}>Confirmed Case</th>
                  <th onClick={() => this.shortByRecovered("active")}>Active Case</th>
                  <th onClick={() => this.shortByRecovered("recovered")}>Recovered/ Recovered %</th>
                  <th onClick={() => this.shortByRecovered("deaths")}>Deaths/Deaths %</th>
                  <th>Last updated time</th>
                </tr>
              </thead>
              <tbody>
                {loader ? <tr><td colSpan='7'><Loading /></td></tr> :
                  covideCasesStateWiseList.map((covidcase, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{covidcase.state} {""}
                          {covidcase.statenotes != "" ?
                            <span className="fa fa-info-circle" data-toggle="tooltip" data-placement="left" title={covidcase.statenotes}></span>
                            : null}
                        </td>
                        <td>
                          {covidcase.deltaconfirmed != 0 ?
                            <div className="error-msg"><span>{covidcase.deltaconfirmed} &#8593;</span><br /></div>
                            : null}
                          {covidcase.confirmed}
                        </td>
                        <td className="activeCase">{covidcase.active}</td>
                        <td className="recoveredCase">
                          {covidcase.deltarecovered != 0 ?
                            <div><span>{covidcase.deltarecovered} &#8593;</span><br /></div>
                            : null}
                          {covidcase.recovered}/{recoveryRateOfRecovered[index + 1]}%
                        </td>
                        <td className="deathesCase">
                          {covidcase.deltadeaths != 0 ?
                            <div><span>{covidcase.deltadeaths} &#8593;</span><br /></div>
                            : null}
                          {covidcase.deaths}/{recoveryRateOfDeathas[index + 1]}%
                        </td>
                        <td>{covidcase.lastupdatedtime}</td>
                      </tr>
                    )
                  })
                }
                {error != "" ? <tr><td className="error-msg" colSpan='7'>{error}</td></tr> : null}
              </tbody>
            </table>
          </div>
          <div className="col-sm-4">
            <PercentageProgressBar covideCases_time_series={this.state.totalCovideCasesInIndia} />
            <CovidGraphTracker covideCases_time_series={this.state.covideCases_time_series} />
          </div>
        </div>
      </div >
    )
  }
}

export default CovideIndiaCase;