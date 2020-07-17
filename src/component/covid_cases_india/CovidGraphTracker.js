import React, { Component } from "react";
import { Line } from 'react-chartjs-2';


class CovidGraphTracker extends Component {

  state = {
    test: [],
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      test: nextProps.covideCases_time_series,
    })
  }

  render() {
    let newLable = [];
    let newLableData = [];
    let lastSevenDayDataLable = [];
    let lastSevenDayDataName = [];

    const state = {
      labels: newLable,
      fill: true,
      datasets: [
        {
          label: 'Total Cases',
          backgroundColor: ['rgba(63, 149, 205,.7)'],
          hoverBackgroundColor: ['rgba(63, 149, 205,.7)'],
          borderColor: 'rgb(63, 149, 205)',
          borderWidth: 1,
          data: newLableData
        }
      ]
    };

    this.state.test.map(cassesDate => {
      newLable.push(cassesDate.date);
      newLableData.push(cassesDate.totalconfirmed);
    });

    let featchLastSaveDayData = () => {
      lastSevenDayDataLable = newLable.slice(Math.max(newLable.length - 7, 0));
      lastSevenDayDataName = newLableData.slice(Math.max(newLableData.length - 7, 0));

      newLable = [...lastSevenDayDataLable];
      newLableData = [...lastSevenDayDataName];
      console.log(newLable);
      console.log(newLableData);
    }

    return (
      <div className='form_layout border-grid'>
        <p>Covide Cases</p>
        <Line
          width={700}
          height={500}
          data={state}
          options={{
            legend: {
              display: true,
              position: 'bottom'
            }
          }}
        />
        <button onClick={featchLastSaveDayData}>7 Day</button>
      </div>
    );
  }
}

export default CovidGraphTracker;