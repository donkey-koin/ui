import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as chartStyles from '../../styles/chart.scss';

// const dataset =
//     {
//         label: 'Value',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: []

//     };

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
            if (this.refs.statistics) {

                fetch("http://localhost:5000/last", {
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
                        this.tableBody();
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
        for (let i = 0; i < response.length; i++) {
            ret.push({
                index: i,
                value: response[i].cents,
                date: response[i].date
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

    tableBody = () => {
        // console.log(this.state.data);
        const element = (
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map(item => <tr key={item.index}>
                            <td>{item.index}</td>
                            <td>{item.date}</td>
                            <td>{item.value}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        );
        // console.log(element);
        if (this.refs.statistics) {
            ReactDom.render(element, document.getElementById('tbodyStatistics'));
        }
    }

    render() {
        return (
            <div className={chartStyles.chartDiv}>
                {
                    this.state.isLoading ? <div className={chartStyles.loader}></div> : null
                }
                {
                    this.state.isError ? <p>Error</p> : null
                }
                <div id="tbodyStatistics" ref="statistics" />
            </div>
        )
    }
}