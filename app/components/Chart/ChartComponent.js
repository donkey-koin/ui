import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as chartStyles from '../../styles/chart.scss';
import '../../../node_modules/react-vis/dist/style.css';


import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries
} from 'react-vis';

const timestamp = new Date().getTime();
const ONE_DAY = 86400000;
const ONE_HOUR = 3600000;
const ONE_MINUTE = 60000;
const ONE_SECOND = 1000;

// TODO
// repair xdomain, grids, styles - half of the page, onNearestX and onMouseLeave event to implement

export class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            width: 400,
            height: 200,
            isLoading: true,
            isError: false
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            if (this.refs.chart) {

                fetch("http://localhost:5000/last?amount=10", {
                    headers: {
                        'content-type': 'application/json',
                    },
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({
                            ...this.state,
                            data: this.handleResponse(res),
                            isError: false,
                            isLoading: false

                        });
                        this.renderChart();
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ ...this.state, isError: true, isLoading: false });
                    });
            }
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    handleResponse = (response) => {
        let ret = [];
        console.log(response);
        for (let i = response.length - 1; i >= 0; i--) {
            ret.push({
                x: new Date(response[i].date).getTime(),
                y: response[i].cents
            });
            // console.log(response[i]);
        }

        // console.log(ret);
        return ret;
    }

    getValues = (response) => {
        let ret = [];
        for (let i = 0; i < response.length; i++) {
            ret.push(Number(Number(response[i].cents) / 100));
            console.log(response[i].cents);
        }

        console.log(ret);
        return ret;
    }

    getLabels = (response) => {
        console.log(response[0]);
        let ret = [];
        for (let i = 0; i < response.length; i++) {
            ret.push(response[i].date);
            console.log(response[i].date);
        }

        console.log(ret);
        return ret;
    }

    renderChart = () => {
        // console.log(this.state.data);
        console.log(this.state.data);
        const element = (
            <XYPlot
                width={800}
                height={300}
                // xDomain={[this.state.data[0].x, this.state.data[9].x]}
                xType="time">

                <LineSeries 
                    style={{
                        stroke: 'white'
                    }} 
                    data={this.state.data} />
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                {/* <LineMarkSeries
                    className="linemark-series-example-2"
                    curve={'curveMonotoneX'}
                    data={[
                        { x: 1, y: 11 },
                        { x: 1.5, y: 29 },
                        { x: 3, y: 7 }
                    ]} /> */}
            </XYPlot>
        );
        // console.log(element);
        if (this.refs.chart) {
            ReactDom.render(element, document.getElementById('chart'));
        }
    }

    render() {
        return (
            <div className={chartStyles.chartDiv}>
                {
                    this.state.isError ? <p>Error</p> : null
                }
                <div id="chart" ref="chart">
                    {
                        this.state.isLoading ? <div className={chartStyles.loader}></div> : null
                    }
                </div>
            </div>
        )
    }
}