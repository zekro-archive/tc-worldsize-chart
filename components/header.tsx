import { Component, ReactNode } from "react";
import moment from 'moment';

export default class Header extends Component {

  public render(): ReactNode {
    return <p>
      © zekro 2020&nbsp;|&nbsp;
      <a href="https://github.com/zekroTJA/tc-worldsize-chart" target="_blank">Repository</a>&nbsp;|&nbsp;
      <a onClick={ () => window.location.reload() }>Reload</a>&nbsp;|&nbsp;
      State: { moment().format('DD.MM.YYYY HH:mm:ss') }
    </p>;
  }
}
