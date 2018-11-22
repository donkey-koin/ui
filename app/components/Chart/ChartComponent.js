import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as chartStyles from '../../styles/chart.scss';
import '../../../node_modules/react-vis/dist/style.css';


import {
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries,
    FlexibleXYPlot
} from 'react-vis';
import {ORCHESTRATION_HOST} from "../../actions/mapping";

const timestamp = new Date().getTime();
const ONE_DAY = 86400000;
const ONE_HOUR = 3600000;
const ONE_MINUTE = 60000;
const ONE_SECOND = 1000;

// TODO
// repair xdomain, half of the page, onNearestX and onMouseLeave event to implement

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

                fetch(ORCHESTRATION_HOST + "/last?amount=10", {
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
        for (let i = response.length - 1; i >= 0; i--) {
            ret.push({
                x: new Date(response[i].date).getTime(),
                y: response[i].cents
            });
        }
        return ret;
    }

    renderChart = () => {
        // console.log(this.state.data);
        const element = (
            <FlexibleXYPlot
                // height={300}
                // xDomain={[this.state.data[0].x, this.state.data[9].x]}
                margin={{left: 50}}

                xType="time">

                <LineSeries
                    // curve="curveBasis"

                    // style={{
                    //     stroke: 'white'
                    // }} 
                    opacity={1}
                    // strokeStyle="solid"
                    strokeStyle="dashed"
                    strokeWidth="5px"

                    data={this.state.data} />
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis
                    attr="x"
                    attrAxis="y"
                    orientation="bottom"
                    tickLabelAngle={0}
                    tickTotal={10}
                    tickFormat={function tickFormat(d) { return new Date(d).toLocaleString() }}

                />
                <YAxis
                    attrAxis="x"
                    orientation="left"
                    tickFormat={function tickFormat(d) { return Number(d)/100 }}
                />
            </FlexibleXYPlot>
        );
        // console.log(element);
        if (this.refs.chart) {
            ReactDom.render(element, document.getElementById('chart'));
        }
    }

    render() {
        return (
            <div id="chart" ref="chart" className={chartStyles.chartDiv}>
                {
                    this.state.isError ? <p>Error</p> : null
                }
                {
                    this.state.isLoading ? <div className={chartStyles.loader}></div> : null
                }
            </div>
        )
    }
}