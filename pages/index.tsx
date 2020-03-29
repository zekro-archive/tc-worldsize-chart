import React, { Component, ReactNode } from "react";
import { GetServerSideProps } from "next";
import { IAPIProvider } from "../api/provider";
import { CSVAPIProvider } from "../api/csv-provider";
import { WorldSizeDataPoint } from "../models/worldsize";
import { Line, ChartData } from 'react-chartjs-2';
import { ChartOptions, ChartDataSets } from 'chart.js';
import moment from 'moment';

const apiProvider: IAPIProvider = new CSVAPIProvider();

export default class Index extends Component<{ data: WorldSizeDataPoint[] }> {

  constructor({ data }) {
    super({ data });
  }

  public render(): ReactNode {
    const options: ChartOptions = {
      responsive: true,
      elements: {
        line: {
          tension: 0,
        },
      },
      legend: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
        ],
      },
    };

    const data: ChartDataSets = {
      labels: this.props.data.map(d => moment(d.date, 'DD.MM.YYYY HH:mm:ss').toDate()),
      datasets: [
        {
          label: 'World size in MB',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.props.data.map(d => d.sizeb / 1024),
        }
      ]
    };

    return <Line data={data} options={options}></Line>
  }

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await apiProvider.getWorldSizes(null, null);

  return {
    props: { data }
  };
}
