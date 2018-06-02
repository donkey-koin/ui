import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as statisticsStyles from '../../styles/statistics.scss';


export class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last: this.props.last,
            data: [],
            isLoading: true,
            isError: false
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            if (this.refs.statistics) {
                // console.log(this.state.last);
                fetch("http://localhost:5000/last?amount=" + this.state.last, {
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
                index: i + 1,
                value: response[i].cents,
                date: new Date(response[i].date).toLocaleString()
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
        }

        return ret;
    }

    tableBody = () => {
        // console.log(this.state.data);
        const element = (
            <table className={statisticsStyles.statisticsDiv +" table table-dark"}>
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
                            <td>{item.value / 100}</td>
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
            <div>
                {
                    this.state.isError ? <p>Error</p> : null
                }
                <div id="tbodyStatistics" ref="statistics" className={statisticsStyles.statisticsDiv}>
                    {
                        this.state.isLoading ? <div className={statisticsStyles.loader}></div> : null
                    }
                </div>
            </div>
        )
    }
}