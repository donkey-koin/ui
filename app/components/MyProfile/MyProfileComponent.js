import React, { Component } from 'react';
import Navbar from "../Navbar/NavbarComponent";
import * as myProfileStyles from '../../styles/my-profile.scss';
import { login, getAllTransactions, getMyTransactions, logout } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view'

export class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.loggedUser,
            token: this.props.user.token,
            allTransactions: [],
            myTransactions: [],
            myTriggers: []
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loggedUser !== this.props.user.loggedUser) {
            this.state = {
                ...this.state,
                username: nextProps.user.loggedUser,
                token: nextProps.user.token
            };
        }
    }


    showMyTransactions = () => {
        // let transactions = this.props.actions.getMyTransactions(this.state.username, this.state.token);
        fetch("http://localhost:5000/blockchain?username=" + this.state.username, {
            method: 'GET',
            headers: { 'Authorization': this.state.token }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    myTransactions: res
                });
            })
            .catch(error => {
                console.log(error);
            });


    }

    showMyTriggers = () => {
        fetch("http://localhost:5000/my-triggers?username=" + this.state.username, {
            method: 'GET',
            headers: { 'Authorization': this.state.token }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    myTriggers: res
                });
            })
            .catch(error => {
                // console.log(error);
            });
    }

    showAllTransactions = () => {
        // let transactions = this.props.actions.getAllTransactions(this.state.token);
        fetch("http://localhost:5000/blockchain", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    ...this.state,
                    allTransactions: res
                });
            })
            .catch(error => {
                console.log(error);
            });

    }

    logout = () => {
        this.props.actions.logout()
    }

    render() {
        return (
            <div className={myProfileStyles.nav + " " + myProfileStyles.page}>
                <Navbar logoutHandler={this.logout} />
                <div className={"container " + myProfileStyles.background} >
                    <div className={"row"}>
                        <div className={myProfileStyles.center}>
                            <button type="submit" className="btn btn-success" onClick={() => this.showMyTransactions()}>Get My Transactions</button>
                            {
                                this.state.myTransactions.length > 0 ?
                                    <div className="row">
                                        <div className={"container " + myProfileStyles.json}>
                                            {this.state.myTransactions.map((item, index) => <ReactJson name="Transaction" collapsed="true" key={index} src={item} />)}
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={myProfileStyles.center}>
                            <button type="submit" className="btn btn-success" onClick={() => this.showAllTransactions()}>Get All Transactions</button>
                            {
                                this.state.allTransactions.length > 0 ?
                                    <div className="row">
                                        <div className={"container " + myProfileStyles.json}>
                                            {this.state.allTransactions.map((item, index) => <ReactJson name="Transaction" collapsed="true" key={index} src={item} />)}
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={myProfileStyles.center}>
                            <button type="submit" className="btn btn-success" onClick={() => this.showMyTriggers()}>Show My Triggers</button>
                            {
                                this.state.myTriggers.length > 0 ?
                                    <div className="row">
                                        <div className={"container " + myProfileStyles.json}>
                                            {this.state.myTriggers.map((item, index) => <ReactJson name="Trigger" collapsed="true" key={index} src={item} />)}
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


const mapStateToProps = state => ({
    user: state.userReducer,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ login, logout, getAllTransactions, getMyTransactions }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfile);