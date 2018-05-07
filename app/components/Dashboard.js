import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import { Chart } from './Chart/ChartComponent'


export class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Turboinba
                <Chart />

                <footer className={footer}>
                    <Link to="/">Dashboard</Link>
                    <Link to="/about">About</Link>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ login }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
